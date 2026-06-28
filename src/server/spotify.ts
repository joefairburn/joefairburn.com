import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

import {
  getTrackDetails,
  type SerializedTrackData,
} from "@/components/PersonalCard/utils";
import { getSpotifyData } from "@/lib/spotify";

export type CurrentlyPlayingResult =
  | SerializedTrackData
  | { error: true }
  | null;

// Synthetic key for the Cloudflare Cache API. The hostname is arbitrary; the
// cache is scoped to this Worker.
// https://developers.cloudflare.com/workers/runtime-apis/cache/
const CACHE_KEY = "https://cache.internal/spotify/currently-playing";
const CACHE_TTL_SECONDS = 30;

// `caches.default` is the Cloudflare default cache, which isn't part of the DOM
// `CacheStorage` lib type (included for React), hence the assertion.
const getDefaultCache = () => (caches as unknown as { default: Cache }).default;

const loadCurrentlyPlaying = async (): Promise<CurrentlyPlayingResult> => {
  const spotifyResult = await getSpotifyData({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    refreshToken: env.SPOTIFY_REFRESH_TOKEN,
  });

  if (spotifyResult && !("error" in spotifyResult)) {
    return getTrackDetails(spotifyResult);
  }

  if (spotifyResult && "error" in spotifyResult) {
    return { error: true };
  }

  return null;
};

// Cache reads/writes are best-effort: a cache failure must never break the page,
// it just means we fall back to a live fetch.
const readCachedResult = async (
  cache: Cache
): Promise<CurrentlyPlayingResult | undefined> => {
  try {
    const cached = await cache.match(CACHE_KEY);
    if (cached) {
      return (await cached.json()) as CurrentlyPlayingResult;
    }
  } catch {
    // ignore cache read failures and fall back to a live fetch
  }

  return undefined;
};

const writeCachedResult = async (
  cache: Cache,
  result: CurrentlyPlayingResult
): Promise<void> => {
  // Only cache successful lookups (a track, or "nothing playing"). Never cache
  // errors, so a transient Spotify failure doesn't stick for the whole TTL.
  if (result && "error" in result) {
    return;
  }

  try {
    const response = Response.json(result, {
      headers: { "Cache-Control": `max-age=${CACHE_TTL_SECONDS}` },
    });
    await cache.put(CACHE_KEY, response);
  } catch {
    // ignore cache write failures
  }
};

/**
 * Server function that fetches the currently playing / recently played Spotify
 * track. Runs only on the Cloudflare Worker, where the Spotify secrets live on
 * the `env` binding. Results are cached for a short window via the Cloudflare
 * Cache API to replace the Next.js `"use cache"` behaviour and avoid hitting
 * Spotify on every request.
 */
export const getCurrentlyPlaying = createServerFn().handler(
  async (): Promise<CurrentlyPlayingResult> => {
    const cache = getDefaultCache();

    const cached = await readCachedResult(cache);
    if (cached !== undefined) {
      return cached;
    }

    const result = await loadCurrentlyPlaying();
    await writeCachedResult(cache, result);
    return result;
  }
);
