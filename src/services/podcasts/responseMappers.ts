import { GetPodcastsResponse } from "./types";

export function mapEntryToIPodcast(podcasts: GetPodcastsResponse) {
  return podcasts.feed.entry.map((entry) => ({
    id: entry.id.attributes["im:id"],
    name: entry["im:name"],
    image: entry["im:image"][entry["im:image"].length - 1],
    artist: entry["im:artist"],
    summary: {
      label: entry.summary.label,
    },
  }));
}
