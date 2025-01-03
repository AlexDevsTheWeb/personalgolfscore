export interface IGolfBag {
  playerID: string,
  types: IClubs[],
}

export interface IClubs {
  typeName: string,
  details: IClub[]
}
export interface IClub {
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
  selectedClubs: number;
  clubs: IGolfBag;
  teeClubs: string[];
  distanceClubs: string[];
  greenClubs: string[];
  chipClubs: string[];
}
interface IErrorType {
  errorMessage: string;
  errorCode: number;
}

export type ClubPayload = {
  payload: IGolfBag;
}

interface ITeeClubProps {
  teeClubs: string[];
}