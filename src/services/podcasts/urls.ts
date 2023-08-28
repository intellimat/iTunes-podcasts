const BASE_API_URL = "https://itunes.apple.com";
const TOPUSPODCASTS = "/us/rss/toppodcasts";
const LOOKUP = "/lookup";
const LIMIT = "100";

export function getTop100UsPodcastsUrl() {
  return BASE_API_URL + TOPUSPODCASTS + "/limit=" + LIMIT + "/json";
}
export function getPodcastEpisodesUrl(id: string) {
  const url = new URL(BASE_API_URL + LOOKUP);
  url.searchParams.set("id", id);
  url.searchParams.set("country", "US");
  url.searchParams.set("entity", "podcastEpisode");
  url.searchParams.set("limit", LIMIT);
  return url.href;
}
