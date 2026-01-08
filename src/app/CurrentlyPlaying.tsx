import { PersonalCard } from '@/components/PersonalCard'
import { getSpotifyData } from '../lib/spotify'
import { getTrackDetails } from '@/components/PersonalCard/utils'

/**
 * Server component that fetches Spotify data
 */
export const CurrentlyPlaying = async () => {
  'use cache'

  const spotifyResult = await getSpotifyData()

  let trackDetails: Record<string, any> | null | { error: boolean } = null

  if (spotifyResult && !('error' in spotifyResult)) {
    trackDetails = getTrackDetails(spotifyResult)
  } else if (spotifyResult && 'error' in spotifyResult) {
    trackDetails = { error: true }
  }

  return <PersonalCard spotifyData={trackDetails} />
}
