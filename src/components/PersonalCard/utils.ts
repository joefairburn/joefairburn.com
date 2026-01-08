import  {
  type PlaybackState,
  type PlayHistory,
  type Track,
} from "@spotify/web-api-ts-sdk";

import { formatDistanceToNow } from "date-fns";

const isPlaybackState = (data: unknown): data is PlaybackState =>
  typeof data === "object" &&
  data !== null &&
  "is_playing" in data &&
  typeof (data as PlaybackState).is_playing === "boolean";

const isRecentlyPlayed = (data: unknown): data is PlayHistory =>
  typeof data === "object" && data !== null && "track" in data;

export const getTrackDetails = (context: PlaybackState | PlayHistory) => {
  // Check if context is PlaybackState
  if (isPlaybackState(context)) {
    if (context.item && "name" in context.item) {
      const trackItem = context.item as Track;
      return {
        activityText: "Currently playing",
        album: trackItem.album,
        artists: trackItem.artists,
        external_urls: trackItem.external_urls,
        name: trackItem.name,
        played_at: null,
      };
    }
  }

  // Check if context is PlayHistory
  if (isRecentlyPlayed(context)) {
    const trackItem = context.track;
    return {
      activityText: `${formatDistanceToNow(new Date(context.played_at), {
        addSuffix: true,
      })}`,
      album: trackItem.album,
      artists: trackItem.artists,
      external_urls: trackItem.external_urls,
      name: trackItem.name,
      played_at: context.played_at,
    };
  }

  return null;
};
