export function getPodcastRoutePath(podcastId: string) {
  return `/podcast/${podcastId}`;
}
export function getEpisodeRoutePath(
  podcastId: string,
  episodeTrackId: string | number
) {
  return `/podcast/${podcastId}/episode/${episodeTrackId}`;
}
