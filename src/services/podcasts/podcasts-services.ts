import { IPodcast } from "../../types";
import { getJSON } from "../utils/http";
import { mapEntryToIPodcast as mapGetPodcastsResponseTypeToIPodcastList } from "./responseMappers";
import { GetPodcastsResponse } from "./types";
import { TOP_100_US_PODCASTS } from "./urls";

export async function getPodcasts(): Promise<IPodcast[]> {
  const data = await getJSON<GetPodcastsResponse>(TOP_100_US_PODCASTS);
  return mapGetPodcastsResponseTypeToIPodcastList(data);
}

export function getPodcastEpsidoes() {}
