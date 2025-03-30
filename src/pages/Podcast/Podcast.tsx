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
import {
  VStack,
  Grid,
  GridItem,
  Center,
  Text,
  SegmentGroup,
  HStack,
} from "@chakra-ui/react";
import EpisodePreviewCard from "../../components/cards/EpisodePreviewCard";
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
import {
  DEFAULT_EPISODES_LIMIT,
  EPISODES_LIMITS,
  PODCASTS_LIMITS,
} from "../../constants";
import { useEffect, useState } from "react";
import { getEpisodeRoutePath } from "../../routing/paths";

export default function Podcast() {
  const { podcastId } = useParams<{ podcastId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [episodesLimit, setEpisodesLimit] = useState<string>(
    DEFAULT_EPISODES_LIMIT
  );

  const { data: episodes, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes", episodesLimit],
    queryFn: () => getPodcastEpisodes(podcastId!, episodesLimit),
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

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("episodesLimit", episodesLimit);
      return newParams;
    });
  }, [episodes, episodesLimit, searchParams, setSearchParams]);

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        wrap={"wrap"}
      >
        <BreadcrumbRoot size="md" marginBottom={2}>
          <ReactRouterLink to="/">
            <Text>Home</Text>
          </ReactRouterLink>
          <BreadcrumbCurrentLink>
            <Text>Podcast</Text>
          </BreadcrumbCurrentLink>
        </BreadcrumbRoot>
        <SegmentGroup.Root
          value={episodesLimit}
          onValueChange={(e) => setEpisodesLimit(e.value)}
        >
          <SegmentGroup.Indicator />
          {EPISODES_LIMITS.map((limit) => (
            <SegmentGroup.Item value={limit} key={limit}>
              <SegmentGroup.ItemText>{limit}</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          ))}
        </SegmentGroup.Root>
      </HStack>
      {podcastId && (
        <Grid
          overflow={"hidden"}
          templateColumns={[
            "minmax(0, 1fr)",
            "minmax(0, 1fr)",
            "minmax(0, 1fr) 3fr",
          ]}
          gap={6}
        >
          {podcast && (
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
                      linkTo={{
                        pathname: getEpisodeRoutePath(podcastId, e.trackId),
                        search: searchParams.toString(),
                      }}
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
