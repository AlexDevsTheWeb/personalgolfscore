import { IRoundTotals } from "./roundTotals.types";

export interface IShots {
  holeNumber: number;
  chipClub: string;
  distance: number;
  driveDistance: number;
  fairway: number;
  fir: number;
  gir: boolean;
  girBogey: boolean;
  greenSide: string;
  greenSideL: number;
  greenSideO: number;
  greenSideR: number;
  greenSideS: number;
  hcp: number;
  out: number
  par: number;
  bounceBack: number,
  bounceForward: number,
  points: number;
  pointsAvg: number;
  putts: number;
  puttsLength: number[];
  puttsUnder2: number;
  putts2_4: number;
  putts4_6: number;
  putts6_10: number;
  puttsOver10: number;
  sand: number;
  strokes: number;
  teeClub: string;
  toGreen: string;
  toGreenMeters: number;
  toGreenMetersOver100: number;
  toGreenMeters80_100: number;
  toGreenMeters60_80: number;
  toGreenMetersUnder60: number;
  upDown: IMadeAttempts;
  scramble: IMadeAttempts;
  water: number;
}

interface IMadeAttempts {
  made: number,
  attempts: number
}

export type InitialStateNewRoundsData = {
  isLoading: boolean;
  playerID: string;
  roundID: string;
  holesCompleted: number;
  holes: IShots[];
}

export type InitialStateNewRoundDistances = {
  isLoading: boolean;
  roundDistances: IDistance[];
}

export type IDistance = {
  club: string,
  mt: number[],
  avg: number,
}

export type IDistanceSingle = {
  roundDistances: IDistance[],
  course: string,
  date: string,
  club: string,
  mt: number,
}

export interface IRoundInitialState {
  isLoading: boolean;
  mainData: IRoundMainData;
  holes: IShots[];
}

export interface IRoundsDistanceInitialState {
  isLoading: boolean;
  roundsDistances: IDistance[];
}

export interface IRoundMainData {
  roundID: number,
  roundDate: string,
  roundCourse: string,
}

export interface IRoundHoles {
  holeNumber: number;
  chipClub: string;
  distance: number;
  driveDistance: number;
  fairway: number;
  fir: number;
  gir: boolean;
  girBogey: boolean;
  greenSide: string;
  greenSideL: number;
  greenSideO: number;
  greenSideR: number;
  greenSideS: number;
  hcp: number;
  out: number
  par: number;
  bounceBack: number,
  bounceForward: number,
  points: number;
  pointsAvg: number;
  putts: number;
  puttsLength: number[];
  puttsUnder2: number;
  putts2_4: number;
  putts4_6: number;
  putts6_10: number;
  puttsOver10: number;
  sand: number;
  strokes: number;
  teeClub: string;
  toGreen: string;
  toGreenMeters: number;
  toGreenMetersOver100: number;
  toGreenMeters80_100: number;
  toGreenMeters60_80: number;
  toGreenMetersUnder60: number;
  upDown: { made: number, attempts: number };
  upDownX: number;
  upDownN: number;
  upDownE: number;
  scramble: { made: number, attempts: number };
  water: number;
}

// FIXME: NOT USED?
// export interface IRoundData {
//   createdAt: {
//     nanoseconds: number, seconds: number
//   },
//   roundCourse: string,
//   roundDate: {
//     nanoseconds: number, seconds: number
//   },
//   roundHoles: string,
//   roundNumber: string,
//   roundPar: string,
//   roundPlayingHCP: string,
//   roundTee: string,
//   userId: string,
//   totals: IRoundTotals
// }

export interface IBasicRoundData {
  id: string,
  // roundData: DocumentData,
  roundCourse?: string,
  roundDate: number,
  roundHoles?: string,
  roundTee?: string,
  roundPar?: string,
  roundNumber?: string,
  roundPlayingHCP?: string,
  roundStrokes?: number,
  userId?: string
  createdAt: number,
  totals: IRoundTotals
}

export interface ITotalDistanceAvg {
  club: string,
  totalDistancesSum: number;
  numberOfShots: number;
  avg: number;
}