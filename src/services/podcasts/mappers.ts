import { IPodcast } from "../../types";
import { IFeed } from "../../types/IFeed";

export function mapFeedToIPodcastList(feed: IFeed): IPodcast[] {
  return feed.entry.map((entry) => ({
    id: entry.id.attributes["im:id"],
    name: entry["im:name"],
    image: entry["im:image"][entry["im:image"].length - 1],
    artist: entry["im:artist"],
    summary: {
      label: entry.summary.label,
    },
    category: entry.category,
  }));
}
