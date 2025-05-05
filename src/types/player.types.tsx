import { IBasicRoundData, ITotalDistanceAvg } from "./roundData.types";
import { ITotalRoundsAvg } from "./roundTotals.types";

export type InitialStatePlayer = {
  isLoading: boolean;
  error: string,
  errorMessage: string,
  player: IPlayerStateData;
}

export type IPlayerStateData = Omit<IPlayerDetails, 'rounds'> & {
  totalDistancesAVG?: ITotalDistanceAvg[];
  totalsRoundsAVG?: ITotalRoundsAvg | null;
};

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
  DOB?: number;
  photoURL?: string | null;
  golfBag?: IGolfBagData;
  rounds?: IBasicRoundData[];
  totalDistancesAVG?: ITotalDistanceAvg[];
  totalsRoundsAVG?: ITotalRoundsAvg | null;
  isSetupComplete: boolean;
}

export interface IGetPlayerDetailsPayload {
  player: IPlayerStateData,
  rounds: IBasicRoundData[],
}

export interface IUpdateGolfBagPayload {
  uid: string;
  golfBagData: IGolfBagData;
}