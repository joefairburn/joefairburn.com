import { PersonalCard } from "@/components/PersonalCard";
import { getTrackDetails } from "@/components/PersonalCard/utils";

import { getSpotifyData } from "../lib/spotify";

/**
 * Server component that fetches Spotify data
 */
export const CurrentlyPlaying = async () => {
  "use cache";

  const spotifyResult = await getSpotifyData();

  let trackDetails: Record<string, unknown> | null | { error: boolean } = null;

  if (spotifyResult && !("error" in spotifyResult)) {
    trackDetails = getTrackDetails(spotifyResult);
  } else if (spotifyResult && "error" in spotifyResult) {
    trackDetails = { error: true };
  }

  return <PersonalCard spotifyData={trackDetails} />;
};
