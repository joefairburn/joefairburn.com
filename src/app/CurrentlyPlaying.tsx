import { SpotifyCard } from '@/components/SpotifyCard'
import { getSpotifyData } from '../lib/spotify'
import { getTotalCommitsAndPullRequests } from '@/lib/github'

export const CurrentlyPlaying = async () => {
  const spotifyData = await getSpotifyData()

  const { commits, pullRequests } = await getTotalCommitsAndPullRequests()

  console.log(commits, pullRequests)

  return <SpotifyCard spotifyData={spotifyData} />
}
