import { getESdateFromTimestamp } from "../../converters/date";
import { convertMillistoHMS as convertMillisToHMS } from "../../converters/time";
import { IEpisode, IParsedEpisode, IPodcast } from "../../types";
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

export function mapIEpisodeListToIParsedEpisodeList(
  episodes: IEpisode[]
): IParsedEpisode[] {
  return episodes.map((e) => ({
    ...e,
    parsedReleasedDate: getESdateFromTimestamp(e.releaseDate),
    parsedDuration: convertMillisToHMS(e.trackTimeMillis),
  }));
}
