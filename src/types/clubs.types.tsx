export interface IClub {
  playerID: string,
  types: IClubType[],
}

export interface IClubType {
  typeName: string,
  details: IClubDetails[]
}
export interface IClubDetails {
  name: string,
  loft: number,
  imageURL: string,
  clubNumber: number | string,
  selected: boolean
}

export type InitialStateClubs = {
  isLoading: boolean;
  totalClubs: number;
  clubs: IClub;
}

export type ClubPayload = {
  payload: IClub;
}