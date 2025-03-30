import { useQuery } from "@tanstack/react-query";
import { IEpisode, IParsedEpisode } from "../types";
import { getPodcastEpisodes } from "../services/podcasts/podcasts-services";

const useEpisodes = (
  episodesLimit: string,
  podcastId: string,
  select?: (data: IEpisode[]) => IParsedEpisode[]
) => {
  const response = useQuery({
    queryKey: ["podcast-" + podcastId + "-episodes", episodesLimit],
    queryFn: () => getPodcastEpisodes(podcastId, episodesLimit),
    select,
  });
  return { ...response };
};

export default useEpisodes;
