import {
  type PlaybackState,
  type RecentlyPlayedTracksPage,
} from "@spotify/web-api-ts-sdk";

// Custom error type for Spotify API issues
export class SpotifyAPIError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "SpotifyAPIError";
    this.status = status;
  }
}

export interface SpotifyCredentials {
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
}

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const NO_CONTENT_STATUS = 204;

/**
 * Ensures the required Spotify credentials are present.
 */
const validateCredentials = (
  credentials: SpotifyCredentials
): Required<SpotifyCredentials> => {
  const requiredKeys = ["clientId", "clientSecret", "refreshToken"] as const;
  const missing = requiredKeys.filter((key) => !credentials[key]);

  if (missing.length > 0) {
    throw new SpotifyAPIError(
      `Missing required Spotify credentials: ${missing.join(", ")}`
    );
  }

  return credentials as Required<SpotifyCredentials>;
};

/**
 * Gets a new Spotify access token using the refresh token.
 */
const getAccessToken = async (
  credentials: Required<SpotifyCredentials>
): Promise<string> => {
  const { clientId, clientSecret, refreshToken } = credentials;

  const response = await fetch(TOKEN_URL, {
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new SpotifyAPIError(
      "Failed to get access token from Spotify",
      response.status
    );
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new SpotifyAPIError("Failed to get access token from Spotify");
  }

  return data.access_token;
};

/**
 * Gets the currently playing track, or null when nothing is playing.
 */
const getCurrentlyPlaying = async (
  accessToken: string
): Promise<PlaybackState | null> => {
  const response = await fetch(CURRENTLY_PLAYING_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // 204 means no track is currently playing, not an error
  if (response.status === NO_CONTENT_STATUS) {
    return null;
  }

  if (!response.ok) {
    throw new SpotifyAPIError(
      "Failed to get currently playing track",
      response.status
    );
  }

  return (await response.json()) as PlaybackState;
};

/**
 * Gets the most recently played track, or null when there is none.
 */
const getRecentlyPlayed = async (accessToken: string) => {
  const response = await fetch(RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new SpotifyAPIError(
      "Failed to get recently played tracks",
      response.status
    );
  }

  const data = (await response.json()) as RecentlyPlayedTracksPage;

  if (!data.items || data.items.length === 0) {
    return null;
  }

  // Return the most recent track
  return data.items[0];
};

type SpotifyDataResult =
  | PlaybackState
  | RecentlyPlayedTracksPage["items"][0]
  | { error: true }
  | null;

const fetchSpotifyTrack = async (
  accessToken: string
): Promise<SpotifyDataResult> => {
  const currentlyPlaying = await getCurrentlyPlaying(accessToken);
  if (currentlyPlaying) {
    return currentlyPlaying;
  }

  return await getRecentlyPlayed(accessToken);
};

/**
 * Gets Spotify data - either currently playing or recently played track.
 * @param {SpotifyCredentials} credentials - Spotify OAuth credentials (from the Cloudflare env)
 * @returns {Promise<SpotifyDataResult>} Spotify track data or null if unavailable
 */
export const getSpotifyData = async (
  credentials: SpotifyCredentials
): Promise<SpotifyDataResult> => {
  try {
    const validated = validateCredentials(credentials);
    const accessToken = await getAccessToken(validated);
    return await fetchSpotifyTrack(accessToken);
  } catch (error) {
    console.error(
      "Error fetching Spotify data:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return { error: true };
  }
};
