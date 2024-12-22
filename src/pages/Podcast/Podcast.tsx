import { useQuery } from "@tanstack/react-query";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../../services/podcasts/podcasts-services";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  VStack,
  Link as ChakraLink,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import EpisodePreviewCard from "../../components/cards/EpisodeCardPreviewCard";
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
        <Grid
          templateColumns={[
            "minmax(0, 1fr)",
            "minmax(0, 1fr)",
            "minmax(0, 1fr) 3fr",
          ]}
          gap={6}
        >
          {podcast !== undefined && (
            <GridItem>
              <PodcastDetailsCard podcast={podcast} />
            </GridItem>
          )}
          <GridItem>
            <VStack>
              {episodes !== undefined &&
                episodes.map((e) => (
                  <EpisodePreviewCard
                    key={e.trackId}
                    title={e.trackName}
                    description={e.description || ""}
                    date={e.parsedReleasedDate}
                    time={e.parsedDuration || ""}
                    imageUrl={""}
                    podcastId={podcastId}
                    trackId={e.trackId}
                  />
                ))}
            </VStack>
          </GridItem>
        </Grid>
      )}
    </>
  );
}
