import { IDistance } from "./roundData.types";

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

export interface IRoundsTotalsInitialState {
  isLoading: boolean,
  roundTotals: IRoundsTotals
}

export interface IRoundDistanceInitialState {
  isLoading: boolean,
  roundDistance: IDistance[]
}

export interface IRoundTotals {
  playerID: string,
  mainData: IRoundTotalsMainData,
  score: IRoundScoreTotalsAvg,
  points: IRoundPointsTotalsAvg,
  fairway: IRoundFairwayTotals,
  teeShots: IRoundTeeShotsTotals,
  chipPitch: IRoundChipPitchTotals,
  inside100Mt: IRoundInside100MtTotals,
  fwAndIrons: IRoundFwAndIronsTotals,
  gir: IRoundTotalsAvgINOUT,
  girBogey: IRoundTotalsAvgINOUT,
  upDown: IRoundTotalsUpDown,
  scramble: IRoundTotalsUpDown,
  putts: IRoundTotalsPutts,
  sand: IRoundTotalsAvgSand,
  water: IRoundTotalsAvgINOUT,
  out: IRoundTotalsAvgINOUT,
}

export interface IAllRoundsTotals {
  newTotals: {
    score: IRoundScoreTotalsAvg,
    points: IRoundPointsTotalsAvg,
    fairway: IRoundFairwayTotals,
    teeShots: IRoundTeeShotsTotals,
    chipPitch: IRoundChipPitchTotals,
    inside100Mt: IRoundInside100MtTotals,
    fwAndIrons: IRoundFwAndIronsTotals,
    gir: IRoundTotalsAvgINOUT,
    girBogey: IRoundTotalsAvgINOUT,
    upDown: IRoundTotalsUpDown,
    scramble: IRoundTotalsUpDown,
    putts: IRoundTotalsPutts,
    sand: IRoundTotalsAvgSand,
    water: IRoundTotalsAvgINOUT,
    out: IRoundTotalsAvgINOUT,
  }
}
export interface IRoundsTotals {
  playerID: string,
  totals: IAllRoundsTotalsNew[];
}

export interface IAllRoundsTotalsNew {
  mainData: IRoundTotalsMainData,
  score: IRoundScoreTotalsAvg,
  points: IRoundPointsTotalsAvg,
  fairway: IRoundFairwayTotals,
  teeShots: IRoundTeeShotsTotals,
  chipPitch: IRoundChipPitchTotals,
  inside100Mt: IRoundInside100MtTotals,
  fwAndIrons: IRoundFwAndIronsTotals,
  gir: IRoundTotalsAvgINOUT,
  girBogey: IRoundTotalsAvgINOUT,
  upDown: IRoundTotalsUpDown,
  scramble: IRoundTotalsUpDown,
  putts: IRoundTotalsPutts,
  sand: IRoundTotalsAvgSand,
  water: IRoundTotalsAvgINOUT,
  out: IRoundTotalsAvgINOUT,
}

export interface IRoundInside100MtTotals {
  over100mt: IRoundInside100Mt,
  inside10081: IRoundInside100Mt,
  inside8061: IRoundInside100Mt,
  inside60: IRoundInside100Mt
}
export interface IRoundInside100Mt {
  greensHits: number,
  attempts: number,
  averageShots: number,
  averageDistGIR: number,
  missedLeft: number,
  missedRight: number,
  missedShort: number,
  missedLong: number
}

export interface IRoundFwAndIronsTotals {
  fwHy: IRoundFWAndIrons,
  longIrons: IRoundFWAndIrons,
  shortIrons: IRoundFWAndIrons,
}

export interface IRoundFWAndIrons {
  greenHits: number,
  attempts: number,
  totalScorePar3: number,
  totalScorePar4: number,
  totalNumberPar4: number,
  totalScorePar5: number,
  totalNumberPar5: number,
  totalDistanceGIR: number,
  totalGirGir2Made: number,
  missedLeft: number,
  missedRight: number,
  missedShort: number,
  missedOver: number,
  averageShots: number,
  averageDistGIR: number,
}
export interface IRoundChipPitchTotals {
  pw: IRoundChipPitch,
  gw: IRoundChipPitch,
  sw: IRoundChipPitch,
  lw: IRoundChipPitch,
  b: IRoundChipPitch,
  chip: IRoundChipPitch,
  putt: IRoundChipPitch,
}

interface IRoundChipPitch {
  upDownMade: number,
  attempts: number,
  averageShot: number,
  averageHoleDistance: number,
  shotsHoled: number,
  greensMissed: number,
}

export interface IRoundTeeShotsTotals {
  teeDriver: IRoundTeeShotClubTotals,
  teeFW: IRoundTeeShotClubTotals,
  teeHY: IRoundTeeShotClubTotals,
  teeIron: IRoundTeeShotClubTotals,
}

interface IRoundTeeShotClubTotals {
  fairwayHits: number;
  attempts: number;
  averageDistance: number;
  missLeft: number;
  missRight: number;
  noGreen: number;
  fairwayCenterPCT: number;
  fairwayLeftPCT: number;
  fairwayRightPCT: number;
}
interface IRoundTotalsMainData {
  roundCourse: string,
  roundDate: string,
  roundNumber: number,
  roundTee: string,
  coursePar: number,
  playerHCP: number
}

interface IRoundFairwayTotals {
  total: number,
  fairwayCenter: number,
  fairwayLeft: number,
  fairwayRight: number,
}

interface IRoundTotalsAvg {
  totals: number,
  avg: number,
}
interface IRoundTotalsUpDown {
  totals: number,
  saved: number,
  perc: number,
}
interface IRoundTotalsAvgSand extends IRoundTotalsAvg {
  saved: number,
  avgSaved: number,
  savedPerc: number,
}
interface IRoundTotalsAvgINOUT extends IRoundTotalsAvg {
  totalsIN: number,
  avgIN: number,
  totalsOUT: number,
  avgOUT: number,
}
export interface IRoundTotalsPutts extends IRoundTotalsAvg {
  totalsIN: number,
  avgIN: number,
  totalsOUT: number,
  avgOUT: number,
  puttsGir: number,
  puttsGirIn: number,
  puttsGirOut: number,
  puttsThree: number,
  putts1: number,
  putts2: number,
  putts3More: number,
  puttsDistGir: number,
  puttsStatistics: IPuttsStatistics,
}
export interface IRoundScoreTotalsAvg extends IRoundTotalsAvg {
  vsPar: number,
  scoreIN: number,
  scoreOUT: number,
  vsParIN: number,
  vsParOUT: number,
  avgIN: number;
  avgOUT: number;
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
  avgIN: number,
  avgOUT: number,
}

export interface IPuttsStatistics {
  puttsU2M: IPuttsBreakDownStatistics,
  putts24M: IPuttsBreakDownStatistics,
  putts46M: IPuttsBreakDownStatistics,
  putts610M: IPuttsBreakDownStatistics,
  puttsO10M: IPuttsBreakDownStatistics,
}

interface IPuttsBreakDownStatistics {
  puttsHoled: number,
  puttsAttempts: number,
  numberPuttsInRange: number,
  distanceSecondPutt: number,
  numberSecondPutt: number,
  distanceFirstPutt: number,
  putts3: number,
}

