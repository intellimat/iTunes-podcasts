import { useQuery } from "@tanstack/react-query";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../../services/podcasts/podcasts-services";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import { Flex, VStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import EpisodesTable from "../../components/EpisodesTable";
import Loading from "../../components/Loading";
import PodcastDetailsCard from "../../components/cards/PodcastDetailsCard";
import {
  LOADING_EPISODES_MESSAGE,
  LOADING_PODCASTS_MESSAGE,
} from "../../messages/loading";

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
        <ChakraLink
          as={ReactRouterLink}
          to={"/"}
          width={"fit-content"}
          marginRight={"auto"}
        >
          <Text>Go back</Text>
        </ChakraLink>
        {(isLoadingEpisodes || isFetchingEpisodes) && (
          <Loading text={LOADING_EPISODES_MESSAGE} />
        )}
        {(isLoadingPodcasts || isFetchingPodcasts) && (
          <Loading text={LOADING_PODCASTS_MESSAGE} />
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
