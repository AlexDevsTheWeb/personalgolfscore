
interface IState {
  playerID: string;
  totals: INewTotals[];
}

interface IShotsTotals {
  roundID: string;
  holeNumber: number;
  distance: number;
  hcp: number;
  par: number;
  strokes: number;
  points: number;
  teeClub: string;
  fir: number;
  left: number;
  right: number;
  gir: number;
  putts: number;
  sand: number;
  water: number;
  out: number;
}

export type InitialStateRoundsTotals = {
  isLoading: boolean;
  playerID: string;
  totals: INewTotals[];
}

export type RoundsTotalsPayload = {
  payload: IState;
}

export type InitialStateNewRoundsTotals = {
  isLoading: boolean;
  playerID: string;
  totals: INewTotals;
}

export interface INewTotals {
  roundID: number,
  totDistance: number,
  totDriverDistance: number,
  totFairwaysLeft: number,
  totFairwaysCenter: number,
  totFairwaysRight: number,
  totFir: number,
  totGir: number,
  totGirBogey: number,
  totGreenSideL: number;
  totGreenSideO: number;
  totGreenSideR: number;
  totGreenSideS: number;
  totOut: number,
  totWater: number,
  totSand: number,
  totPoints: number,
  totPutts: number,
  totStrokes: number,
  totUpDown: { X: number, N: number, V: number },
}

export interface IRoundTotalsInitialState {
  isLoading: boolean,
  roundTotals: IRoundTotals
}

export interface IRoundTotals {
  playerID: string,
  mainData: IRoundTotalsMainData,
  score: IRoundScoreTotalsAvg,
  points: IRoundPointsTotalsAvg,
  fairway: IRoundFairwatTotals,
  gir: IRoundTotalsAvgINOUT,
  girBogey: IRoundTotalsAvgINOUT,
  upDown: IRoundTotalsUpDown,
  scramble: IRoundTotalsUpDown,
  putts: IRoundTotalsPutts,
  sand: IRoundTotalsAvgSand,
  water: IRoundTotalsAvgINOUT,
  out: IRoundTotalsAvgINOUT,
}

interface IRoundTotalsMainData {
  roundCourse: string,
  roundDate: string,
  roundNumber: number,
  roundTee: string,
  coursePar: number,
  playerHCP: number
}

interface IRoundFairwatTotals {
  total: number,
  fairwayCenter: number,
  fairwayLeft: number,
  fairwayRight: number,
}

interface IRoundTotalsAvg {
  totals: number,
  avg: string,
}
interface IRoundTotalsUpDown {
  totals: number,
  saved: number,
  perc: number,
}
interface IRoundTotalsAvgSand extends IRoundTotalsAvg {
  saved: number,
  avgSaved: string,
  savedPerc: number,
}
export interface IRoundTotalsAvgINOUT extends IRoundTotalsAvg {
  totalsIN: number,
  avgIN: string,
  totalsOUT: number,
  avgOUT: string,
}
export interface IRoundTotalsPutts extends IRoundTotalsAvg {
  totalsIN: number,
  avgIN: string,
  totalsOUT: number,
  avgOUT: string,
  puttsGir: number,
  puttsGirIn: number,
  puttsGirOut: number,
  puttsThree: number,
  putts1: number,
  putts2: number,
  putts3More: number,
}
export interface IRoundScoreTotalsAvg extends IRoundTotalsAvg {
  vsPar: number,
  scoreIN: number,
  scoreOUT: number,
  vsParIN: number,
  vsParOUT: number,
  avgIN: string;
  avgOUT: string;
  par3: number,
  par4: number,
  par5: number,
  scoreEagleBetter: number,
  scoreBirdie: number,
  scorePar: number,
  scoreBogey: number,
  scoreDoubleBogeyWorst: number,
  scorePar3: number,
  scorePar4: number,
  scorePar5: number,
}

interface IRoundPointsTotalsAvg extends IRoundTotalsAvg {
  pointsIN: number,
  pointsOUT: number,
  avgIN: string,
  avgOUT: string,
}


