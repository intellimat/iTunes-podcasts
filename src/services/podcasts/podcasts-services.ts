import type { IEpisode, IPodcast, IFeed, IParsedEpisode } from "../../types";
import { getJSON } from "../utils/http";
import {
  mapFeedToIPodcastList,
  mapIEpisodeListToIParsedEpisodeList,
} from "./mappers";
import { getPodcastEpisodesUrl, getTop100UsPodcastsUrl } from "./urls";

export async function getPodcasts(limit: string): Promise<IPodcast[]> {
  const data = await getJSON<{ feed: IFeed }>(getTop100UsPodcastsUrl(limit));
  return mapFeedToIPodcastList(data.feed);
}

export async function getPodcastEpisodes(
  id: string
): Promise<IParsedEpisode[]> {
  const data = await getJSON<{ resultCount: number; results: IEpisode[] }>(
    getPodcastEpisodesUrl(id)
  );
  return mapIEpisodeListToIParsedEpisodeList(data.results);
}
