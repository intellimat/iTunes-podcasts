import { useMemo } from "react";
import { getPodcasts } from "../services/podcasts/podcasts-services";
import { useQuery } from "@tanstack/react-query";
import { getFilteredPodcasts } from "../pages/Home/query/filters";
import { IPodcast } from "../types";

const usePodcasts = (
  podcastsLimit: string,
  query?: string,
  select?: ((data: IPodcast[]) => IPodcast[]) | undefined
) => {
  const response = useQuery({
    queryKey: ["podcasts", podcastsLimit],
    queryFn: () => getPodcasts(podcastsLimit),
    select,
  });

  const filteredPodcasts = useMemo(() => {
    if (response.data === undefined) {
      return [];
    }
    return getFilteredPodcasts(response.data, query);
  }, [response.data, query]);

  return { ...response, data: filteredPodcasts };
};

export default usePodcasts;
