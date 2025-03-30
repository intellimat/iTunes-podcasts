import { IParsedEpisode } from "../../../types";

export function mapEpisode(episode?: IParsedEpisode) {
  let descriptionHTMLstring = "";
  if (!episode) {
    return undefined;
  }

  if (episode.description !== undefined) {
    const descriptionElement = new window.DOMParser()
      .parseFromString(episode.description, "text/html")
      .querySelector("body");
    descriptionHTMLstring =
      descriptionElement === null ? "" : descriptionElement.innerHTML;
  }
  return {
    trackName: episode.trackName,
    descriptionHTMLstring,
    playbackUrl: episode.episodeUrl,
  };
}
