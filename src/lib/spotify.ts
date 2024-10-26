import {
  type PlaybackState,
  type RecentlyPlayedTracksPage
} from '@spotify/web-api-ts-sdk'
import axios from 'axios'
const clientId = import.meta.env.SPOTIFY_CLIENT_ID
const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET
const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN

const getAccessToken = async (): Promise<string> => {
  const tokenUrl = 'https://accounts.spotify.com/api/token'

  const requestData = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  }).toString()

  const tokenResponse = await axios.post(tokenUrl, requestData, {
    headers: {
      Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return tokenResponse.data?.access_token
}

const getCurrentlyPlaying = async (accessToken: string) => {
  const response = await axios.get<PlaybackState>(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return response.data
}

const getRecentlyPlayed = async (accessToken: string) => {
  const response = await axios.get<RecentlyPlayedTracksPage>(
    'https://api.spotify.com/v1/me/player/recently-played?limit=1',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  return response.data.items[0] // Return the most recent track
}

export const getSpotifyData = async () => {
  try {
    const accessToken = await getAccessToken()

    const currentlyPlaying = await getCurrentlyPlaying(accessToken)

    if (currentlyPlaying) {
      return currentlyPlaying
    }

    const recentlyPlayed = await getRecentlyPlayed(accessToken)

    return recentlyPlayed
  } catch (error) {
    console.error('Error fetching currently playing song:', error)
  }

  return null
}
