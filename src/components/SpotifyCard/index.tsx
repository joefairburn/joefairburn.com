import {
  type PlaybackState,
  type PlayHistory,
  type RecentlyPlayedTracksPage,
  type Track
} from '@spotify/web-api-ts-sdk'
import { getTrackDetails } from './utils'
import { ActivityIndicator } from './ActivityIndicator'
import { formatDistanceToNow } from 'date-fns'

export const SpotifyCard = ({
  spotifyData
}: {
  spotifyData: PlaybackState | PlayHistory | null
}) => {
  if (!spotifyData || 'show' in spotifyData) {
    return null
  }

  const item = getTrackDetails(spotifyData)

  if (!item) {
    return null
  }

  const name = item.name
  const artist = item.artists[0].name
  const image = item.album.images[0].url

  const isCurrentlyPlaying = item.played_at === null

  const activityText = item.played_at
    ? `played ${formatDistanceToNow(new Date(item.played_at), {
        addSuffix: true
      })}`
    : 'Currently playing'

  return (
    <div className='flex items-center gap-4 bg-[#191919] border border-neutral-800 shadow-md p-4 rounded-md'>
      <img className='size-16 rounded-sm opacity-80' src={image} alt={name} />
      <div className='flex flex-col'>
        <a
          className='text-base font-bold'
          href={item.external_urls.spotify}
          target='_blank'
        >
          {name}
        </a>
        <div className='text-sm text-gray-500'>{artist}</div>
        <ActivityIndicator currentlyPlaying={isCurrentlyPlaying}>
          {activityText}
        </ActivityIndicator>
      </div>
    </div>
  )
}
