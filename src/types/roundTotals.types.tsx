
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

interface ITotals {
  numberOfHoles: number;
  putt: ITotalsPutt;
  gir: ITotalsGir
  pointsAvg: number;
  out: number;
  water: number;
}

interface ITotalsGir {
  girPar: number;
  girBogey: number;
}
interface ITotalsPutt {
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

type NewRoundsTotalsPayload = {
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
interface IRoundTotalsAvgINOUT extends IRoundTotalsAvg {
  totalsIN: number,
  avgIN: string,
  totalsOUT: number,
  avgOUT: string,
}
interface IRoundScoreTotalsAvg extends IRoundTotalsAvg {
  vsPar: number,
  scoreIN: number,
  scoreOUT: number,
  vsParIN: number,
  vsParOUT: number,
  avgIN: string;
  avgOUT: string;
}

interface IRoundPointsTotalsAvg extends IRoundTotalsAvg {
  pointsIN: number,
  pointsOUT: number,
  avgIN: string,
  avgOUT: string,
}