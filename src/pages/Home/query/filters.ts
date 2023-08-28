import { IPodcast } from "../../../types";

export function getFilteredPodcasts(
  searchText: string,
  podcasts: IPodcast[] | undefined
) {
  if (!Array.isArray(podcasts)) {
    return [];
  }
  const upperCaseSearchText = searchText.toUpperCase();
  return podcasts.filter(
    (p) =>
      p.artist.label.toUpperCase().includes(upperCaseSearchText) ||
      p.name.label.toUpperCase().includes(upperCaseSearchText)
  );
}
