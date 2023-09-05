import { useQuery } from "@tanstack/react-query";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../../services/podcasts/podcasts-services";
import { useParams } from "react-router-dom";
import { Flex, VStack } from "@chakra-ui/react";
import EpisodesTable from "../../components/EpisodesTable";
import Loading from "../../components/Loading";
import PodcastDetailsCard from "../../components/cards/PodcastDetailsCard";

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
    data: podcast,
    isLoading: isLoadingPodcasts,
    isFetching: isFetchingPodcasts,
  } = useQuery(["podcasts"], () => getPodcasts(), {
    select: (data) => data?.find((p) => p.id === podcastId),
  });

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
        <Flex
          wrap={"wrap"}
          columnGap={20}
          rowGap={10}
          justifyContent={[
            "space-evenly",
            "space-evenly",
            "flex-start",
            "flex-start",
          ]}
        >
          {podcast !== undefined && (
            <PodcastDetailsCard
              podcast={podcast}
              cardProps={{
                width: [300, 300, 300, 300, 300, 400],
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
