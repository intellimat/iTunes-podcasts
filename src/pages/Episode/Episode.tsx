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
import { mapEpisode } from "./utils/parsers";
import { getPodcastRoutePath } from "../../routing/paths";
import {
  LOADING_EPISODES_MESSAGE,
  LOADING_PODCASTS_MESSAGE,
} from "../../messages/loading";
import { IPodcast } from "../../types";
import { toaster } from "../../components/ui/toaster";
import { useMemo, useRef } from "react";
export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const { data: episode, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes"],
    queryFn: () => {
      if (podcastId) {
        return getPodcastEpisodes(podcastId);
      }
    },
    select: (data) => mapEpisode(data, episodeTrackId),
  });
  const { data: podcast, isLoading: isLoadingPodcasts } = useQuery({
    queryKey: ["podcasts"],
    queryFn: getPodcasts,
    select: (data: IPodcast[]) =>
      data?.find((p: IPodcast) => p.id === podcastId),
  });

  const loadingPodcastsToasterRef = useRef<string | undefined>(undefined);
  const loadingEpisodesToasterRef = useRef<string | undefined>(undefined);

  useMemo(() => {
    if (isLoadingPodcasts) {
      loadingPodcastsToasterRef.current = toaster.create({
        title: LOADING_PODCASTS_MESSAGE,
        type: "info",
      });
    } else if (
      loadingPodcastsToasterRef.current &&
      toaster.isVisible(loadingPodcastsToasterRef.current)
    ) {
      toaster.dismiss(loadingPodcastsToasterRef.current);
      loadingPodcastsToasterRef.current = undefined;
    }

    if (isLoadingEpisodes) {
      loadingEpisodesToasterRef.current = toaster.create({
        title: LOADING_EPISODES_MESSAGE,
        type: "info",
      });
    } else if (
      loadingEpisodesToasterRef.current &&
      toaster.isVisible(loadingEpisodesToasterRef.current)
    ) {
      toaster.dismiss(loadingEpisodesToasterRef.current);
      loadingEpisodesToasterRef.current = undefined;
    }
  }, [isLoadingPodcasts, isLoadingEpisodes]);

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
