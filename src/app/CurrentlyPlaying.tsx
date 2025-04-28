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

  try {
    // Fetch Spotify data
    const spotifyData = await getSpotifyData()

    // Fetch GitHub stats
    const { commits, pullRequests } = await getTotalCommitsAndPullRequests()

    let trackDetails: Record<string, any> | null = null

    if (spotifyData) {
      trackDetails = getTrackDetails(spotifyData)
    }

    return (
      <PersonalCard
        spotifyData={trackDetails}
        githubData={{ commits, pullRequests }}
      />
    )
  } catch (error) {
    console.error(
      'Error in CurrentlyPlaying component:',
      error instanceof Error ? error.message : 'Unknown error'
    )

    // Return null on error instead of a fallback UI
    return null
  }
}
