import { useParams, useSearchParams } from "react-router-dom";
import { VStack, Flex, Center, HStack, Text, Box } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
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
import useEpisodes from "../../hooks/useEpisodes";
import { useMemo } from "react";
import usePodcasts from "../../hooks/usePodcasts";
import { EPISODES_LIMITS } from "../../constants";

export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const [searchParams] = useSearchParams();

  const { data: episodes, isLoading: isLoadingEpisodes } = useEpisodes(
    searchParams.get("episodesLimit") ||
      EPISODES_LIMITS[EPISODES_LIMITS.length - 1],
    podcastId!,
    (data) => data.filter((e) => e.trackId.toString() === episodeTrackId)
  );

  const episode = useMemo(() => {
    if (!episodes || episodes.length === 0) {
      return undefined;
    }
    return mapEpisode(episodes[0]);
  }, [episodes]);

  const { data: podcasts, isLoading: isLoadingPodcasts } = usePodcasts(
    searchParams.get("podcastsLimit") || "50",
    undefined,
    (data: IPodcast[]) => data.filter((p: IPodcast) => p.id === podcastId)
  );

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

      <Flex wrap={"wrap"} gap={6}>
        {podcasts && (
          <Box flex={1}>
            {isLoadingPodcasts ? (
              <Center>
                <Loading text={LOADING_PODCASTS_MESSAGE} />
              </Center>
            ) : (
              <PodcastDetailsCard podcast={podcasts[0]} />
            )}
          </Box>
        )}
        <Box flex={2}>
          {isLoadingEpisodes ? (
            <Center>
              <Loading text={LOADING_EPISODES_MESSAGE} />
            </Center>
          ) : episode ? (
            <EpisodeCard
              trackName={episode.trackName}
              episodeUrl={episode.playbackUrl}
              descriptionHTMLstring={episode.descriptionHTMLstring}
            />
          ) : (
            <Center>
              <Text>No episode found.</Text>
            </Center>
          )}
        </Box>
      </Flex>
    </>
  );
}
