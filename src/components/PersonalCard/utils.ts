import type { PlaybackState, PlayHistory, Track } from '@spotify/web-api-ts-sdk'
import { formatDistanceToNow } from 'date-fns'

const isPlaybackState = (data: unknown): data is PlaybackState => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'is_playing' in data &&
    typeof (data as PlaybackState).is_playing === 'boolean'
  )
}

const isRecentlyPlayed = (data: unknown): data is PlayHistory => {
  return typeof data === 'object' && data !== null && 'track' in data
}

export const getTrackDetails = (context: PlaybackState | PlayHistory) => {
  // Check if context is PlaybackState
  if (isPlaybackState(context)) {
    if (context.item && 'name' in context.item) {
      const trackItem = context.item as Track
      return {
        name: trackItem.name,
        artists: trackItem.artists,
        album: trackItem.album,
        external_urls: trackItem.external_urls,
        played_at: null,
        activityText: 'Currently playing'
      }
    }
  }

  // Check if context is PlayHistory
  if (isRecentlyPlayed(context)) {
    const trackItem = context.track
    return {
      name: trackItem.name,
      artists: trackItem.artists,
      album: trackItem.album,
      external_urls: trackItem.external_urls,
      played_at: context.played_at,
      activityText: `played ${formatDistanceToNow(new Date(context.played_at), {
        addSuffix: true
      })}`
    }
  }

  return null
}
