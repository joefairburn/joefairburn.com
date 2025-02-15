import { SpotifyCard } from '@/components/SpotifyCard'
import { getSpotifyData } from '../lib/spotify'

export const CurrentlyPlaying = async () => {
  const spotifyData = await getSpotifyData()

  return <SpotifyCard spotifyData={spotifyData} />
}
