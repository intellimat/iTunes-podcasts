import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { VStack, Grid, GridItem, Center, HStack, Text } from "@chakra-ui/react";
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
import Loading from "../../components/Loading";
import {
  BreadcrumbCurrentLink,
  BreadcrumbRoot,
} from "../../components/ui/breadcrumb";

export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const [searchParams] = useSearchParams();
  const { data: episode, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes"],
    queryFn: () => {
      if (podcastId) {
        return getPodcastEpisodes(
          podcastId,
          searchParams.get("episodesLimit") || "50"
        );
      }
    },
    select: (data) => mapEpisode(data, episodeTrackId),
  });
  const { data: podcast, isLoading: isLoadingPodcasts } = useQuery({
    queryKey: ["podcasts"],
    queryFn: () => getPodcasts(searchParams.get("podcastsLimit") || "50"),
    select: (data: IPodcast[]) =>
      data?.find((p: IPodcast) => p.id === podcastId),
  });

  return (
    <>
      <VStack>
        {podcastId && (
          <HStack marginRight={"auto"} marginBottom={2}>
            <BreadcrumbRoot size="md">
              <ReactRouterLink to="/">
                <Text>Home</Text>
              </ReactRouterLink>
              <ReactRouterLink to={getPodcastRoutePath(podcastId)}>
                <Text>Podcast</Text>
              </ReactRouterLink>
              <BreadcrumbCurrentLink>
                <Text>Episode</Text>
              </BreadcrumbCurrentLink>
            </BreadcrumbRoot>
          </HStack>
        )}
      </VStack>
      {episode !== undefined && (
        <Grid templateColumns={["1fr", "1fr", "1fr 3fr"]} gap={6}>
          {podcast !== undefined && (
            <GridItem>
              {isLoadingPodcasts && (
                <Center>
                  <Loading text={LOADING_PODCASTS_MESSAGE} />
                </Center>
              )}
              {!isLoadingPodcasts && <PodcastDetailsCard podcast={podcast} />}
            </GridItem>
          )}
          {episode !== undefined && (
            <GridItem>
              {isLoadingEpisodes && (
                <Center>
                  <Loading text={LOADING_EPISODES_MESSAGE} />
                </Center>
              )}
              {!isLoadingEpisodes && (
                <EpisodeCard
                  trackName={episode.trackName}
                  episodeUrl={episode.playbackUrl}
                  descriptionHTMLstring={episode.descriptionHTMLstring}
                />
              )}
            </GridItem>
          )}
        </Grid>
      )}
    </>
  );
}
