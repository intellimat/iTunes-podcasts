const BASE_API_URL = "https://itunes.apple.com";
const TOPUSPODCASTS = "/us/rss/toppodcasts";
const LOOKUP = "/lookup";

export function getTop100UsPodcastsUrl(limit: string) {
  return BASE_API_URL + TOPUSPODCASTS + "/limit=" + limit + "/json";
}
export function getPodcastEpisodesUrl(id: string, limit: string) {
  const url = new URL(BASE_API_URL + LOOKUP);
  url.searchParams.set("id", id);
  url.searchParams.set("country", "US");
  url.searchParams.set("entity", "podcastEpisode");
  url.searchParams.set("limit", limit);
  return url.href;
}
