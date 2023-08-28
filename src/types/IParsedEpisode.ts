import { IEpisode } from ".";

export interface IParsedEpisode extends IEpisode {
  parsedReleasedDate: string;
  parsedDuration: string | null;
}
