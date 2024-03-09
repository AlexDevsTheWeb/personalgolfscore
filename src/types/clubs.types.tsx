export interface IClub {
  degree: number;
  name: string;
  playerID: string;
  type: IClubType;
}

export interface IClubType {
  cat: string;
  number: string;
}

export type InitialStateClubs = {
  isLoading: boolean;
  clubs: IClub[];
}

export type ClubPayload = {
  payload: ClubResponse[];
}

export type ClubResponse = {
  degree: number;
  name: string;
  playerID: string;
  type: IClubType;
}