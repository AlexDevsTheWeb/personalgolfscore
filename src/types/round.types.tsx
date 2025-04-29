import { Dayjs } from "dayjs"
import { IBasicRoundData, IDistance, IShots } from "./roundData.types"
import { IRoundTotals, IRoundTotalsPutts } from "./roundTotals.types"

export interface IPayloadActionNewHole {
  holeAdjusted: any,
  roundPlayingHCP: number
  roundHoles: number,
  holesCompleted: number
};

interface IState {
  playerID: string,
  rounds: IRounds[]
}

export interface IRounds {
  id: string,
  roundID: string,
  roundDate: string,
  roundCourse: string,
  roundHoles: number,
  roundTee: string,
  roundPar: number,
  roundPlayingHCP: number,
  roundStrokes: number
  general: IRoundGeneral,
  holes: any,
  totals: any
}

export interface IRoundsState {
  rounds: IBasicRoundData[],
  uid: string,
}

interface IRoundGeneral {
  roundID: number,
  roundCourse: string,
  roundDate: Dayjs,
  roundNumber: number,
  roundTee: string,
  roundPlayingHCP: number,
  roundPar: number,
}

export type InitialStateRounds = {
  isLoading: boolean;
  playerID: string;
  rounds: IBasicRoundData[];
}

export interface INewRound {
  roundDate: any,
  roundCourse: string,
  roundHoles: number,
  roundTee: string,
  roundPar: number,
  roundPlayingHCP: number,
  roundNumber: number
}
export type InitialStateNewRound = {
  isLoading: boolean;
  isSaved: boolean;
  playerID: string;
  setFirstHole: boolean;
  round: INewRound;
}

export interface IRoundFinalData {
  roundMainData: INewRound,
  roundHolesData: IShots[],
  roundTotalsData: IRoundTotals,
  roundDistancesData: IDistance[],
}

export interface IRoundFinalDataProps {
  round: INewRound,
  holes: IShots[],
  roundTotals: IRoundTotals,
  roundDistances: IDistance[],
}

export interface IInitialStateRoundSave {
  isLoading: boolean,
  roundId: string,
  success: boolean
}

export interface ISaveRoundButtonProps {
  onSave: () => void;
  disabled: boolean;
}

export interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

export interface IFetchParams {
  playerId: string,
  roundId: string,
}

export interface PuttLengthCounts {
  puttsUnder2: number;
  putts2_4: number;
  putts4_6: number;
  putts6_10: number;
  puttsOver10: number;
}

export interface GreenApproachDistanceCounts {
  toGreenMetersOver100: number;
  toGreenMeters80_100: number;
  toGreenMeters60_80: number;
  toGreenMetersUnder60: number;
}