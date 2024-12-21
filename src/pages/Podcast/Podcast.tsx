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
import { IPodcast } from "../../types";

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    isFetching: isFetchingEpisodes,
  } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes"],
    queryFn: () => getPodcastEpisodes(podcastId!),
  });
  const {
    data: podcast,
    isLoading: isLoadingPodcasts,
    isFetching: isFetchingPodcasts,
  } = useQuery({
    queryKey: ["podcasts"],
    queryFn: getPodcasts,
    select: (data: IPodcast[]) =>
      data?.find((p: IPodcast) => p.id === podcastId),
  });

  return (
    <>
      <VStack>
        <ChakraLink asChild width={"fit-content"} marginRight={"auto"}>
          <ReactRouterLink to={"/"}>
            <Text>Go back</Text>
          </ReactRouterLink>
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
              styleProps={{
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
