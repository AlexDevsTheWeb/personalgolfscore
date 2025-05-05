import { IGolfBagData } from "./player.types";

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

export interface IAddSingleHoleProps {
  derivedClubs: {
    teeClubs: string[];
    distanceClubs: string[];
    greenClubs: string[];
    chipClubs: string[];
  }
}
export interface IClubsMainProps {
  golfBag: IGolfBagData | undefined;
}

export interface IClubDistanceDialogProps {
  open: boolean,
}

export interface IClubSetupFormProps {
  initialGolfBag: IGolfBagData;
  onGolfBagChange: (newGolfBag: IGolfBagData) => void;
}

export interface IPlayerSetupProps {
  handleHcpChange: () => void;
}