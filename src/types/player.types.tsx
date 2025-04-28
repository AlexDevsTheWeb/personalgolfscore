import { IRounds } from "./round.types";
import { IBasicRoundData, IDistance } from "./roundData.types";
import { IRoundTotals } from "./roundTotals.types";

export interface IPlayer {
  playerID: string,
  firstName: string,
  lastName: string,
  DOB: {
    seconds: number,
    nanoseconds: number,
  },
  HCP: number,
  email: string
}

export type InitialStatePlayer = {
  isLoading: boolean;
  error: string,
  errorMessage: string,
  player: IPlayerStateData;
}

export type IPlayerStateData = Omit<IPlayerDetails, 'rounds'>;

export type IGolfBagData = IClubType[];
export interface IClubType {
  typeName: string;
  details: IClubDetail[];
}
export interface IClubDetail {
  name: string;
  loft: number;
  imageURL: string;
  clubIdentifier: string;
  selected: boolean;
  clubNumber?: string | number; // Optional
}
export interface IPlayerDetails {
  uid: string;
  displayName: string | null;
  email: string | null;
  firstName?: string;
  lastName?: string;
  HCP?: number;
  DOB?: number; // Assuming DOB is stored as timestamp milliseconds
  photoURL?: string | null;
  golfBag?: IGolfBagData; // Use the GolfBagData type
  rounds?: IRounds[],
  totals?: IRoundTotals,
  distances?: IDistance,
  // ... other player fields
}

export interface IGetPlayerDetailsPayload {
  player: Omit<IPlayerDetails, 'rounds'>,
  rounds: IBasicRoundData[],
}