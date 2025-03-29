import { useQuery } from "@tanstack/react-query";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../../services/podcasts/podcasts-services";
import {
  Link as ReactRouterLink,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { VStack, Grid, GridItem, Center, HStack, Text } from "@chakra-ui/react";
import EpisodePreviewCard from "../../components/cards/EpisodeCardPreviewCard";
import PodcastDetailsCard from "../../components/cards/PodcastDetailsCard";
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
import { PODCASTS_LIMITS } from "../../constants";

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const [searchParams] = useSearchParams();

  const { data: episodes, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes"],
    queryFn: () => getPodcastEpisodes(podcastId!),
  });

  const { data: podcast, isLoading: isLoadingPodcasts } = useQuery({
    queryKey: ["podcasts"],
    queryFn: () =>
      getPodcasts(
        searchParams.get("podcastsLimit") ||
          PODCASTS_LIMITS[PODCASTS_LIMITS.length - 1]
      ),
    select: (data: IPodcast[]) =>
      data?.find((p: IPodcast) => p.id === podcastId),
  });

  return (
    <>
      <HStack marginRight={"auto"}>
        <BreadcrumbRoot size="md" marginBottom={2}>
          <ReactRouterLink to="/">
            <Text>Home</Text>
          </ReactRouterLink>
          <BreadcrumbCurrentLink>
            <Text>Podcast</Text>
          </BreadcrumbCurrentLink>
        </BreadcrumbRoot>
      </HStack>
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
              {isLoadingPodcasts && (
                <Center>
                  <Loading text={LOADING_PODCASTS_MESSAGE} />
                </Center>
              )}
              {!isLoadingPodcasts && <PodcastDetailsCard podcast={podcast} />}
            </GridItem>
          )}
          <GridItem>
            {isLoadingEpisodes && (
              <Center>
                <Loading text={LOADING_EPISODES_MESSAGE} />
              </Center>
            )}
            {!isLoadingEpisodes && (
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
            )}
          </GridItem>
        </Grid>
      )}
    </>
  );
}
