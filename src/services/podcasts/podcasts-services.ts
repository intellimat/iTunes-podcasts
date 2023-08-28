import type { IEpisode, IPodcast, IFeed, IParsedEpisode } from "../../types";
import { AllCorsResponse, getAllCorsURL } from "../utils/cors";
import { getJSON } from "../utils/http";
import {
  mapFeedToIPodcastList,
  mapIEpisodeListToIParsedEpisodeList,
} from "./mappers";
import { getPodcastEpisodesUrl, getTop100UsPodcastsUrl } from "./urls";

export async function getPodcasts(): Promise<IPodcast[]> {
  const data = await getJSON<AllCorsResponse>(
    getAllCorsURL(getTop100UsPodcastsUrl())
  );
  return mapFeedToIPodcastList(JSON.parse(data.contents).feed as IFeed);
}

export async function getPodcastEpisodes(
  id: string
): Promise<IParsedEpisode[]> {
  const data = await getJSON<AllCorsResponse>(
    getAllCorsURL(getPodcastEpisodesUrl(id))
  );
  return mapIEpisodeListToIParsedEpisodeList(
    JSON.parse(data.contents).results as IEpisode[]
  );
}
