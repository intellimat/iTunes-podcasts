export interface IEpisode {
  wrapperType: WrapperType;
  kind: Kind;
  artistId?: number;
  collectionId: number;
  trackId: number;
  artistName?: string;
  collectionName: Name;
  trackName: string;
  collectionCensoredName?: Name;
  trackCensoredName?: Name;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  collectionHdPrice?: number;
  releaseDate: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackCount?: number;
  country: Country;
  currency?: string;
  primaryGenreName?: PrimaryGenreNameEnum;
  contentAdvisoryRating: ContentAdvisoryRating;
  artworkUrl600: string;
  genreIds?: string[];
  genres: Array<GenreClass | string>;
  previewUrl?: string;
  shortDescription?: string;
  artistIds?: number[];
  closedCaptioning?: ClosedCaptioning;
  episodeGuid?: string;
  description?: string;
  trackTimeMillis?: number;
  episodeUrl?: string;
  episodeFileExtension?: EpisodeFileExtension;
  artworkUrl160?: string;
  episodeContentType?: EpisodeContentType;
}

enum ClosedCaptioning {
  None = "none",
}

enum Name {
  OverMyDeadBody = "Over My Dead Body",
}

enum ContentAdvisoryRating {
  Clean = "Clean",
  Explicit = "Explicit",
}

enum Country {
  Usa = "USA",
}

enum EpisodeContentType {
  Audio = "audio",
}

enum EpisodeFileExtension {
  Mp3 = "mp3",
}

interface GenreClass {
  name: PrimaryGenreNameEnum;
  id: string;
}

enum PrimaryGenreNameEnum {
  TrueCrime = "True Crime",
}

enum Kind {
  Podcast = "podcast",
  PodcastEpisode = "podcast-episode",
}

enum WrapperType {
  PodcastEpisode = "podcastEpisode",
  Track = "track",
}
