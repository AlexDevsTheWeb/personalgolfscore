export interface IClub {
  playerID: string,
  types: IClubType,
}

export interface IClubType {
  typeName: string,
  details: IClubDetails[]
}
export interface IClubDetails {
  name: string,
  loft: number,
  imageURL: string,
  number: number | string
}

export type InitialStateClubs = {
  isLoading: boolean;
  clubs: IClub;
}

export type ClubPayload = {
  payload: IClub;
}