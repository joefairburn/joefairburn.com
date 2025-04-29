import {
  type PlaybackState,
  type RecentlyPlayedTracksPage
} from '@spotify/web-api-ts-sdk'
import axios, { AxiosError } from 'axios'
import { validateEnvVars } from './security.config'

// Custom error type for Spotify API issues
export class SpotifyAPIError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'SpotifyAPIError';
    this.status = status;
  }
}

const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

/**
 * Gets a new Spotify access token using the refresh token
 * @returns A promise that resolves to the access token
 */
const getAccessToken = async (): Promise<string> => {
  try {
    // Use centralized env var validation
    validateEnvVars();
    
    const tokenUrl = 'https://accounts.spotify.com/api/token'

    const requestData = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken || ''
    }).toString()

    const tokenResponse = await axios.post(tokenUrl, requestData, {
      headers: {
        Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (!tokenResponse.data?.access_token) {
      throw new SpotifyAPIError('Failed to get access token from Spotify');
    }

    return tokenResponse.data.access_token
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new SpotifyAPIError(
        `Failed to get Spotify access token: ${error.message}`,
        error.response?.status
      );
    }
    throw error;
  }
}

/**
 * Gets the currently playing track
 * @param accessToken Spotify access token
 * @returns Currently playing track data or null if no track is playing
 */
const getCurrentlyPlaying = async (accessToken: string) => {
  try {
    const response = await axios.get<PlaybackState>(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      // 204 means no track is currently playing, not an error
      if (error.response?.status === 204) {
        return null;
      }
      
      throw new SpotifyAPIError(
        `Failed to get currently playing track: ${error.message}`,
        error.response?.status
      );
    }
    throw error;
  }
}

/**
 * Gets the most recently played track
 * @param accessToken Spotify access token
 * @returns Most recently played track or null
 */
const getRecentlyPlayed = async (accessToken: string) => {
  try {
    const response = await axios.get<RecentlyPlayedTracksPage>(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!response.data.items || response.data.items.length === 0) {
      return null;
    }

    return response.data.items[0] // Return the most recent track
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new SpotifyAPIError(
        `Failed to get recently played tracks: ${error.message}`,
        error.response?.status
      );
    }
    throw error;
  }
}

/**
 * Gets Spotify data - either currently playing or recently played track
 * @returns Spotify track data or null if unavailable
 */
export const getSpotifyData = async (): Promise<(PlaybackState | RecentlyPlayedTracksPage['items'][0] | { error: true }) | null> => {
  'use cache'
  try {
    const accessToken = await getAccessToken()

    const currentlyPlaying = await getCurrentlyPlaying(accessToken)

    if (currentlyPlaying) {
      return currentlyPlaying
    }

    const recentlyPlayed = await getRecentlyPlayed(accessToken)
    
    if (recentlyPlayed) {
      return recentlyPlayed
    }

    return null
  } catch (error) {
    console.error('Error fetching Spotify data:', error instanceof Error ? error.message : 'Unknown error')
    // Return error object instead of null
    return { error: true };
  }
}
