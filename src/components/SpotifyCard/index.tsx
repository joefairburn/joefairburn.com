import {
  type PlaybackState,
  type RecentlyPlayedTracksPage,
  type Track
} from '@spotify/web-api-ts-sdk'
import { Dot } from 'lucide-react'

const isPlaybackState = (data: any): data is PlaybackState => {
  return 'is_playing' in data
}

const isRecentlyPlayed = (data: any): data is RecentlyPlayedTracksPage => {
  return 'items' in data && Array.isArray(data.items)
}

export const SpotifyCard = ({
  spotifyData
}: {
  spotifyData: PlaybackState | null
}) => {
  if (!spotifyData) {
    return null
  }

  const item = spotifyData.item

  if ('show' in item) {
    return null
  }
  const name = item.name
  const artist = item.artists[0].name
  const image = item.album.images[0].url

  console.log(item)
  return (
    <div className='flex items-center gap-4'>
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
        <div className='flex items-center gap-2'>
          <div className='size-2 rounded-full bg-green-600' />
          <span className='text-xs text-gray-600'>Currently playing</span>
        </div>
      </div>
    </div>
  )
}
