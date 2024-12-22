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
import PodcastDetailsCard from "../../components/cards/PodcastDetailsCard";
import {
  LOADING_EPISODES_MESSAGE,
  LOADING_PODCASTS_MESSAGE,
} from "../../messages/loading";
import { IPodcast } from "../../types";
import { useMemo, useRef } from "react";
import { toaster } from "../../components/ui/toaster";

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const { data: episodes, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes"],
    queryFn: () => getPodcastEpisodes(podcastId!),
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
        <ChakraLink asChild width={"fit-content"} marginRight={"auto"}>
          <ReactRouterLink to={"/"}>
            <Text>Go back</Text>
          </ReactRouterLink>
        </ChakraLink>
      </VStack>
      {podcastId !== undefined && (
        <Grid
          overflow={"hidden"}
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
