import {
  type PlaybackState,
  type PlayHistory,
  type Track,
} from "@spotify/web-api-ts-sdk";
import { formatDistanceToNow } from "date-fns";

export interface SerializedTrackData {
  name: string;
  artistName: string;
  albumImageUrl: string | null;
  spotifyUrl: string;
  playedAt: string | null;
  activityText: string;
}

const isPlaybackState = (data: unknown): data is PlaybackState =>
  typeof data === "object" &&
  data !== null &&
  "is_playing" in data &&
  typeof (data as PlaybackState).is_playing === "boolean";

const isRecentlyPlayed = (data: unknown): data is PlayHistory =>
  typeof data === "object" && data !== null && "track" in data;

export const getTrackDetails = (
  context: PlaybackState | PlayHistory
): SerializedTrackData | null => {
  if (isPlaybackState(context) && context.item && "name" in context.item) {
    const trackItem = context.item as Track;
    return {
      activityText: "Currently playing",
      albumImageUrl: trackItem.album.images[0]?.url ?? null,
      artistName: trackItem.artists[0]?.name ?? "Unknown Artist",
      name: trackItem.name,
      playedAt: null,
      spotifyUrl: trackItem.external_urls.spotify,
    };
  }

  if (isRecentlyPlayed(context)) {
    const trackItem = context.track;
    return {
      activityText: formatDistanceToNow(new Date(context.played_at), {
        addSuffix: true,
      }),
      albumImageUrl: trackItem.album.images[0]?.url ?? null,
      artistName: trackItem.artists[0]?.name ?? "Unknown Artist",
      name: trackItem.name,
      playedAt: context.played_at,
      spotifyUrl: trackItem.external_urls.spotify,
    };
  }

  return null;
};
