import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { VStack, Wrap } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../../services/podcasts/podcasts-services";
import PodcastDetailsCard from "../../components/cards/PodcastDetailsCard";
import EpisodeCard from "../../components/cards/EpisodeCard";
import Loading from "../../components/Loading";
import { mapEpisode } from "./utils/parsers";
export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const {
    data: episode,
    isLoading: isLoadingEpisodes,
    isFetching: isFetchingEpisodes,
  } = useQuery(
    ["podcast-" + podcastId + "-episodes"],
    () => {
      if (podcastId) {
        return getPodcastEpisodes(podcastId);
      }
    },
    { select: (data) => mapEpisode(data, episodeTrackId) }
  );
  const {
    data: podcast,
    isLoading: isLoadingPodcasts,
    isFetching: isFetchingPodcasts,
  } = useQuery(["podcasts"], getPodcasts, {
    select: (data) => data?.find((p) => p.id === podcastId),
  });

  return (
    <>
      <VStack>
        {(isLoadingEpisodes || isFetchingEpisodes) && (
          <Loading text="Loading Episodes" />
        )}
        {(isLoadingPodcasts || isFetchingPodcasts) && (
          <Loading text="Loading Podcasts " />
        )}
      </VStack>
      {episode !== undefined && (
        <Wrap spacing={"100px"}>
          {podcast !== undefined && (
            <ReactRouterLink to={"/podcast/" + podcastId}>
              <PodcastDetailsCard
                podcast={podcast}
                cardProps={{
                  maxWidth: "350px",
                  height: "fit-content",
                  padding: "16px",
                  bg: "#f2f2f2",
                }}
              />
            </ReactRouterLink>
          )}
          {episode !== undefined && (
            <EpisodeCard
              trackName={episode.trackName}
              episodeUrl={episode.playbackUrl}
              descriptionHTMLstring={episode.descriptionHTMLstring}
              cardProps={{ maxWidth: 600, height: "fit-content" }}
            />
          )}
        </Wrap>
      )}
    </>
  );
}
