import { PersonalCard } from '@/components/PersonalCard'
import { getSpotifyData } from '../lib/spotify'
import { getTotalCommitsAndPullRequests } from '@/lib/github'
import { getTrackDetails } from '@/components/PersonalCard/utils'

export const CurrentlyPlaying = async () => {
  'use cache'
  const spotifyData = await getSpotifyData()

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
}
