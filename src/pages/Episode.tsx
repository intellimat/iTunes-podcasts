import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { HStack, Spinner, Wrap, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  getPodcastEpisodes,
  getPodcasts,
} from "../services/podcasts/podcasts-services";
import { IParsedEpisode } from "../types";
import PodcastDetailsCard from "../components/cards/PodcastDetailsCard";
import EpisodeCard from "../components/cards/EpisodeCard";
export default function Episode() {
  const { podcastId, episodeTrackId } = useParams<{
    podcastId: string;
    episodeTrackId: string;
  }>();
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    isFetching: isFetchingEpisodes,
  } = useQuery(["podcast-" + podcastId + "-episodes"], () =>
    getPodcastEpisodes(podcastId!)
  );
  const {
    data: podcasts,
    isLoading: isLoadingPodcasts,
    isFetching: isFetchingPodcasts,
  } = useQuery(["podcasts"], getPodcasts);
  const podcast = useMemo(
    () => podcasts?.find((p) => p.id === podcastId) || null,
    [podcasts, podcastId]
  );
  const episode = useMemo(() => {
    let descriptionHTMLstring = "";
    if (episodes === undefined) {
      return null;
    }
    const foundEpisode = episodes.find(
      (episode: IParsedEpisode) => episode.trackId === parseInt(episodeTrackId!)
    );
    if (foundEpisode === undefined) {
      return null;
    }
    if (foundEpisode.description !== undefined) {
      const descriptionElement = new window.DOMParser()
        .parseFromString(foundEpisode.description, "text/html")
        .querySelector("body");
      descriptionHTMLstring =
        descriptionElement === null ? "" : descriptionElement.innerHTML;
    }
    return {
      trackName: foundEpisode.trackName,
      descriptionHTMLstring,
      playbackUrl: foundEpisode.episodeUrl,
    };
  }, [episodes, episodeTrackId]);
  return (
    <>
      {(isLoadingEpisodes || isFetchingEpisodes) && (
        <HStack>
          <Text size="md" color={"#737373"}>
            Loading Episodes{" "}
          </Text>{" "}
          <Spinner size={"sm"} color="#737373" />
        </HStack>
      )}
      {(isLoadingPodcasts || isFetchingPodcasts) && (
        <HStack>
          <Text size="md">Loading Podcasts </Text>
          <Spinner size={"sm"} />
        </HStack>
      )}
      {episode !== null && (
        <Wrap spacing={"100px"}>
          {podcast !== null && (
            <ReactRouterLink to={"/podcast/" + podcastId}>
              <PodcastDetailsCard
                podcast={podcast}
                cardProps={{
                  maxWidth: "350px",
                  height: "fit-content",
                  padding: "16px",
                  bg: "#f2f2f2",
                }}
              />
            </ReactRouterLink>
          )}
          {episode !== null && (
            <EpisodeCard
              trackName={episode.trackName}
              episodeUrl={episode.playbackUrl}
              descriptionHTMLstring={episode.descriptionHTMLstring}
              cardProps={{ maxWidth: 600, height: "fit-content" }}
            />
          )}
        </Wrap>
      )}
    </>
  );
}
