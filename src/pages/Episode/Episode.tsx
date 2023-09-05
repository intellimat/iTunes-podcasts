import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { VStack, Flex } from "@chakra-ui/react";
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
        <Flex
          wrap={"wrap"}
          columnGap={20}
          rowGap={10}
          justifyContent={["space-evenly", "space-evenly", "flex-start"]}
        >
          {podcast !== undefined && (
            <ReactRouterLink to={"/podcast/" + podcastId}>
              <PodcastDetailsCard
                podcast={podcast}
                cardProps={{
                  width: [300, 300, 300, 300, 300, 400],
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
              cardProps={{
                width: [300, 300, 300, 500, 800],
                height: "fit-content",
              }}
            />
          )}
        </Flex>
      )}
    </>
  );
}
