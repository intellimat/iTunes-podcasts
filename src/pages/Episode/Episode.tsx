import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { VStack, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
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
export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const {
    data: episode,
    isLoading: isLoadingEpisodes,
    isFetching: isFetchingEpisodes,
  } = useQuery(
    ["podcast-" + podcastId + "-episodes"],
    () => {
      if (podcastId) {
        return getPodcastEpisodes(podcastId);
      }
    },
    { select: (data) => mapEpisode(data, episodeTrackId) }
  );
  const {
    data: podcast,
    isLoading: isLoadingPodcasts,
    isFetching: isFetchingPodcasts,
  } = useQuery(["podcasts"], getPodcasts, {
    select: (data) => data?.find((p) => p.id === podcastId),
  });

  return (
    <>
      <VStack>
        {podcastId && (
          <ChakraLink
            as={ReactRouterLink}
            to={getPodcastRoutePath(podcastId)}
            width={"fit-content"}
            marginRight={"auto"}
          >
            <Text>Go back</Text>
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
        <Flex
          wrap={"wrap"}
          columnGap={20}
          rowGap={10}
          justifyContent={["space-evenly", "space-evenly", "flex-start"]}
        >
          {podcast !== undefined && (
            <ReactRouterLink to={"/podcast/" + podcastId}>
              <PodcastDetailsCard
                podcast={podcast}
                cardProps={{
                  width: [300, 300, 300, 300, 300, 400],
                  height: "fit-content",
                  padding: "16px",
                  bg: "#f2f2f2",
                }}
              />
            </ReactRouterLink>
          )}
          {episode !== undefined && (
            <EpisodeCard
              trackName={episode.trackName}
              episodeUrl={episode.playbackUrl}
              descriptionHTMLstring={episode.descriptionHTMLstring}
              cardProps={{
                width: [300, 300, 300, 500, 800],
                height: "fit-content",
              }}
            />
          )}
        </Flex>
      )}
    </>
  );
}
