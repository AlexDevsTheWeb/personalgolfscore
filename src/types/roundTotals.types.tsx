
export interface IState {
  playerID: string;
  totals: INewTotals[];
}

export interface INewState {
  playerID: string;
  totals: INewShotsTotals;
}

export interface IShotsTotals {
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

export interface INewShotsTotals {
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

export interface ITotals {
  numberOfHoles: number;
  putt: ITotalsPutt;
  gir: ITotalsGir
  pointsAvg: number;
  out: number;
  water: number;
}

export interface ITotalsGir {
  girPar: number;
  girBogey: number;
}
export interface ITotalsPutt {
  puttsHole: number;
  puttFirst: number;
  puttSecond: number;
  puttThird: number;
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

export type NewRoundsTotalsPayload = {
  payload: IState;
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

export interface IRoundTotals {
  hcp: number,
  par: number,
  score: IRoundScoreTotalsAvg,
  points: IRoundPointsTotalsAvg,
  fairway: IRoundFairwatTotals,
  gir: IRoundTotalsAvgINOUT,
  girBogey: IRoundTotalsAvgINOUT,
  upDown: IRoundTotalsUpDown,
  scramble: IRoundTotalsUpDown,
  putts: IRoundTotalsAvgINOUT,
  sand: IRoundTotalsAvgSand,
  water: IRoundTotalsAvgINOUT,
  out: IRoundTotalsAvgINOUT,
}

export interface IRoundFairwatTotals {
  total: number,
  fairwayCenter: number,
  fairwayLeft: number,
  fairwayRight: number,
}

export interface IRoundTotalsAvg {
  totals: number,
  avg: string,
}
export interface IRoundTotalsUpDown {
  totals: number,
  saved: number,
  perc: number,
}
export interface IRoundTotalsAvgSand extends IRoundTotalsAvg {
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
export interface IRoundScoreTotalsAvg extends IRoundTotalsAvg {
  vsPar: string,
  scoreIN: number,
  scoreOUT: number,
  vsParIN: string,
  vsParOUT: string,
  avgIN: string;
  avgOUT: string;
}

export interface IRoundPointsTotalsAvg extends IRoundTotalsAvg {
  pointsIN: number,
  pointsOUT: number,
  avgIN: string,
  avgOUT: string,
}