import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  VStack,
  Link as ChakraLink,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../../services/podcasts/podcasts-services";
import PodcastDetailsCard from "../../components/cards/PodcastDetailsCard";
import EpisodeCard from "../../components/cards/EpisodeCard";
import Loading from "../../components/Loading";
import { mapEpisode } from "./utils/parsers";
import { getPodcastRoutePath } from "../../routing/paths";
import {
  LOADING_EPISODES_MESSAGE,
  LOADING_PODCASTS_MESSAGE,
} from "../../messages/loading";
import { IPodcast } from "../../types";
export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const {
    data: episode,
    isLoading: isLoadingEpisodes,
    isFetching: isFetchingEpisodes,
  } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes"],
    queryFn: () => {
      if (podcastId) {
        return getPodcastEpisodes(podcastId);
      }
    },
    select: (data) => mapEpisode(data, episodeTrackId),
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
        {podcastId && (
          <ChakraLink asChild width={"fit-content"} marginRight={"auto"}>
            <ReactRouterLink to={getPodcastRoutePath(podcastId)}>
              <Text>Go back</Text>
            </ReactRouterLink>
          </ChakraLink>
        )}
        {(isLoadingEpisodes || isFetchingEpisodes) && (
          <Loading text={LOADING_EPISODES_MESSAGE} />
        )}
        {(isLoadingPodcasts || isFetchingPodcasts) && (
          <Loading text={LOADING_PODCASTS_MESSAGE} />
        )}
      </VStack>
      {episode !== undefined && (
        <Grid templateColumns={["1fr", "1fr", "1fr 3fr"]} gap={6}>
          {podcast !== undefined && (
            <GridItem>
              <ReactRouterLink to={"/podcast/" + podcastId}>
                <PodcastDetailsCard podcast={podcast} />
              </ReactRouterLink>
            </GridItem>
          )}
          {episode !== undefined && (
            <GridItem>
              <EpisodeCard
                trackName={episode.trackName}
                episodeUrl={episode.playbackUrl}
                descriptionHTMLstring={episode.descriptionHTMLstring}
              />
            </GridItem>
          )}
        </Grid>
      )}
    </>
  );
}
