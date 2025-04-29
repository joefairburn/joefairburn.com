import { PersonalCard } from '@/components/PersonalCard'
import { getSpotifyData } from '../lib/spotify'
import { getTotalCommitsAndPullRequests } from '@/lib/github'
import { getTrackDetails } from '@/components/PersonalCard/utils'

/**
 * Server component that fetches Spotify and GitHub data
 * Returns nothing on error
 */
export const CurrentlyPlaying = async () => {
  'use cache'

  // Data fetching functions now handle their own errors and return specific shapes
  const [spotifyResult, githubResult] = await Promise.all([
    getSpotifyData(),
    getTotalCommitsAndPullRequests()
  ])

  let trackDetails: Record<string, any> | null | { error: boolean } = null

  // Process Spotify data only if it's not null and not an error
  if (spotifyResult && !('error' in spotifyResult)) {
    trackDetails = getTrackDetails(spotifyResult)
  } else if (spotifyResult && 'error' in spotifyResult) {
    trackDetails = { error: true }
  }

  // Pass the results (potentially including error flags) to PersonalCard
  return <PersonalCard spotifyData={trackDetails} githubData={githubResult} />
}
