import { Dayjs } from "dayjs"
import { IDistance, IShots } from "./roundData.types"
import { IRoundTotals } from "./roundTotals.types"

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
  // roundID: string,
  // roundDate: string,
  // roundCourse: string,
  // roundHoles: number,
  // roundTee: string,
  // roundPar: number,
  // roundPlayingHCP: number,
  // roundStrokes: number
  general: IRoundGeneral,
  holes: any,
  totals: any
}

export interface IRoundsState {
  rounds: IRounds[],
  uid: string,
}

interface IRoundGeneral {
  roundID: number,
  roundCourse: string,
  roundDate: Dayjs,
  roundNumber: number,
  roundTee: string,
  coursePar: number,
  playerHCP: number
}

export type InitialStateRounds = {
  isLoading: boolean;
  playerID: string;
  rounds: IRounds[];
}

// export type RoundPayload = {
//   payload: IState;
// };

export interface INewRound {
  roundID: string,
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
  isLoading: false,
  roundToSave: IRoundFinalData
}