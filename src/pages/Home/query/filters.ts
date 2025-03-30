import { IPodcast } from "../../../types";

export function getFilteredPodcasts(
  podcasts: IPodcast[] | undefined,
  searchText?: string
) {
  if (!Array.isArray(podcasts)) {
    return [];
  }

  if (!searchText) {
    return podcasts;
  }

  const upperCaseSearchText = searchText.toUpperCase();
  return podcasts.filter(
    (p) =>
      p.artist.label.toUpperCase().includes(upperCaseSearchText) ||
      p.name.label.toUpperCase().includes(upperCaseSearchText)
  );
}
