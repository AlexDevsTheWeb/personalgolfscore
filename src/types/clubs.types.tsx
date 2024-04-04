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
  error: IErrorType;
  isLoading: boolean;
  totalClubs: number;
  clubs: IClub;
}
export interface IErrorType {
  errorMessage: string;
  errorCode: number;
}

export type ClubPayload = {
  payload: IClub;
}