import { useQuery } from "@tanstack/react-query";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../services/podcasts/podcasts-services";
import { useParams } from "react-router-dom";
import { Flex, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import EpisodesTable from "../components/EpisodesTable";
import Loading from "../components/Loading";
import PodcastDetailsCard from "../components/cards/PodcastDetailsCard";

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    isFetching: isFetchingEpisodes,
  } = useQuery(["podcast-" + podcastId + "-episodes"], () =>
    getPodcastEpisodes(podcastId!)
  );
  const {
    data: podcasts,
    isLoading: isLoadingPodcasts,
    isFetching: isFetchingPodcasts,
  } = useQuery(["podcasts"], () => getPodcasts());

  const podcast = useMemo(
    () => podcasts?.find((p) => p.id === podcastId) || null,
    [podcasts, podcastId]
  );

  return (
    <>
      <VStack>
        {(isLoadingEpisodes || isFetchingEpisodes) && (
          <Loading text="Loading Episodes" />
        )}
        {(isLoadingPodcasts || isFetchingPodcasts) && (
          <Loading text="Loading Podcasts" />
        )}
      </VStack>
      {podcastId !== undefined && (
        <Flex>
          {podcast !== null && (
            <PodcastDetailsCard
              podcast={podcast}
              cardProps={{
                maxWidth: "350px",
                height: "fit-content",
                padding: "16px",
                bg: "#f2f2f2",
              }}
            />
          )}
          {episodes !== undefined && (
            <EpisodesTable podcastId={podcastId} episodes={episodes} />
          )}
        </Flex>
      )}
    </>
  );
}
