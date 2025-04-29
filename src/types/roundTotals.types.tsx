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

export interface IRoundDistanceInitialState {
  isLoading: boolean,
  roundDistance: IDistance[]
}

export interface IRoundTotals {
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
  roundsTotals: IRoundTotals[]
}

interface IRoundsTotals {
  playerID: string,
  totals: IAllRoundsTotalsNew[];
}

interface IAllRoundsTotalsNew {
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
  over100: IRoundInside100Mt, // Changed from over100mt
  inside10081: IRoundInside100Mt,
  inside8061: IRoundInside100Mt,
  inside60: IRoundInside100Mt
}
export interface IRoundInside100Mt {
  greensHits: number;
  attempts: number;
  averageShots: number;
  averageDistGIR: number;
  missedLeft: number;
  missedRight: number;
  missedShort: number;
  missedLong: number;
  girPCT?: number;
  totalDistGIR: number;
  totalShotsTaken: number;
  totalPuttsTaken: number;
  totalDistance: number;
  countShotsWithDistance: number;
}

export interface IRoundFwAndIronsTotals {
  fwFW: IRoundFWAndIrons,
  fwHY: IRoundFWAndIrons,
  fwLongIron: IRoundFWAndIrons,
  fwShortIron: IRoundFWAndIrons,
  fwMidIron?: IRoundFWAndIrons;
}

export interface IRoundFWAndIrons {
  girHits: number;
  averageDistance: number;
  missLeft: number;
  missRight: number;
  missShort: number;
  missLong: number;
  attempts: number;
  totalScorePar3: number;
  totalScorePar4: number;
  totalNumberPar4: number;
  totalScorePar5: number;
  totalNumberPar5: number;
  totalDistanceGIR: number;
  totalGirGir2Made: number;
  averageShots: number;
  averageDistGIR: number;
  girPCT?: number;
  missLeftPCT?: number;
  missRightPCT?: number;
  missShortPCT?: number;
  missLongPCT?: number;
  totalNumberPar3: number;
}
export interface IRoundChipPitchTotals {
  pw: IRoundChipPitch,
  gw: IRoundChipPitch,
  sw: IRoundChipPitch,
  lw: IRoundChipPitch,
  b: IRoundChipPitch,
  chip: IRoundChipPitch,
  putt: IRoundChipPitch,
  chipPutter?: IRoundChipPitch,
  chipWedge?: IRoundChipPitch,
  chipIron?: IRoundChipPitch,
}

export interface IRoundChipPitch {
  upDownMade: number;
  attempts: number;
  averageShot: number;
  averageHoleDistance: number;
  shotsHoled: number;
  greensMissed: number;
  upDownPCT?: number;
  totalShotsTaken: number;
  totalDistanceToHole: number;
  totalDistanceNumber: number;
  totalPuttsTaken: number;
}

export interface IRoundTeeShotsTotals {
  teeDriver: IRoundTeeShotClubTotals,
  teeFW: IRoundTeeShotClubTotals,
  teeHY: IRoundTeeShotClubTotals,
  teeIron: IRoundTeeShotClubTotals,
}

export interface IRoundTeeShotClubTotals {
  fairwayHits: number;
  attempts: number;
  averageDistance: number;
  missLeft: number;
  missRight: number;
  noGreen: number; // Corresponds to firMiss in aggregation
  fairwayCenterPCT: number;
  missLeftPCT: number;
  missRightPCT: number;
  firMissPCT: number;
  // --- Added missing properties ---
  totalDistance?: number; // Sum of drive distances
  countShotsWithDistance?: number; // Count of drives with distance > 0
  par4_5_Attempts?: number; // Count of attempts on Par 4s and Par 5s
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
  _puttsOverall: {
    birdieBetter: number, // Count of birdies/better made on GIR
    birdieConversion: number, // Percentage
    gir: number, // Count of GIRs
    puttsInGIR: number, // Average putts per GIR
    threePutts: number, // Count of 3-putts or more
    totalPutts: number, // Total putts in round
    totalPuttsInGIR: number, // Sum of putts on GIR holes
    // --- Add missing property ---
    birdieBetterAttempts?: number, // Count of attempts for birdie/better on GIR
    // --- End Add ---
  }
}

interface IPuttsBreakDownStatistics {
  distanceFirstPutt: number;
  distanceSecondPutt: number;
  numberPuttsInRange: number;
  numberSecondPutt: number;
  putt1Perc: number;
  putt3Perc: number;
  putts3: number;
  puttsAttempts: number;
  puttsAverage: number;
  puttsAverageDistance: number;
  puttsHoled: number;
  puttsSecondAverageLength: number;
}

export interface ITotalRoundsAvg {
  totalRoundsCount: number;
  totalHolesPlayed: number;
  totalHolesPlayedIN: number;
  totalHolesPlayedOUT: number;
  totalPar4_5_Holes: number; // Used?
  score?: { // Make sections optional for robustness
    sumTotals?: number;
    sumVsPar?: number;
    sumScoreIN?: number;
    sumScoreOUT?: number;
    sumVsParIN?: number;
    sumVsParOUT?: number;
    countPar3?: number;
    countPar4?: number;
    countPar5?: number;
    countScoreEagleBetter?: number;
    countScoreBirdie?: number;
    countScorePar?: number;
    countScoreBogey?: number;
    countScoreDoubleBogeyWorst?: number;
    sumScorePar3?: number;
    sumScorePar4?: number;
    sumScorePar5?: number;
  };
  points?: {
    sumTotals?: number;
    sumPointsIN?: number;
    sumPointsOUT?: number;
  };
  fairway?: {
    sumAttempts?: number;
    sumFairwayCenter?: number;
    sumFairwayLeft?: number;
    sumFairwayRight?: number;
  };
  teeShots?: {
    // Use specific keys instead of string index signature for better type safety
    teeDriver?: ITotalRoundsAvgTeeShotClub;
    teeFW?: ITotalRoundsAvgTeeShotClub;
    teeHY?: ITotalRoundsAvgTeeShotClub;
    teeIron?: ITotalRoundsAvgTeeShotClub;
  };
  fwAndIrons?: {
    // Use specific keys
    fwFW?: ITotalRoundsAvgFwAndIronsClub; // Added fwFW
    fwHY?: ITotalRoundsAvgFwAndIronsClub;
    fwLongIron?: ITotalRoundsAvgFwAndIronsClub;
    fwMidIron?: ITotalRoundsAvgFwAndIronsClub;
    fwShortIron?: ITotalRoundsAvgFwAndIronsClub;
  };
  inside100Mt?: {
    // Use specific keys
    over100?: ITotalRoundsAvgInside100MtRange;
    range80_100?: ITotalRoundsAvgInside100MtRange;
    range60_80?: ITotalRoundsAvgInside100MtRange;
    under60?: ITotalRoundsAvgInside100MtRange;
  };
  chipPitch?: {
    // Use specific keys
    chipPutter?: ITotalRoundsAvgChipPitchClub;
    chipWedge?: ITotalRoundsAvgChipPitchClub;
    chipIron?: ITotalRoundsAvgChipPitchClub;
    // Add keys for pw, gw, sw, lw, b, chip, putt if they are stored separately
    pw?: ITotalRoundsAvgChipPitchClub;
    gw?: ITotalRoundsAvgChipPitchClub;
    sw?: ITotalRoundsAvgChipPitchClub;
    lw?: ITotalRoundsAvgChipPitchClub;
    b?: ITotalRoundsAvgChipPitchClub;
    chip?: ITotalRoundsAvgChipPitchClub;
    putt?: ITotalRoundsAvgChipPitchClub;
  };
  gir?: {
    sumGirMade?: number;
    sumGirMadeIN?: number;
    sumGirMadeOUT?: number;
  };
  girBogey?: {
    sumGirBogeyMade?: number;
    sumGirBogeyMadeIN?: number;
    sumGirBogeyMadeOUT?: number;
  };
  upDown?: {
    sumAttempts?: number;
    sumSaved?: number;
  };
  scramble?: {
    sumAttempts?: number;
    sumSaved?: number;
  };
  putts?: {
    sumTotals?: number;
    sumTotalsIN?: number;
    sumTotalsOUT?: number;
    sumPuttsGir?: number;
    sumPuttsGirIN?: number;
    sumPuttsGirOUT?: number;
    countPutts1?: number;
    countPutts2?: number;
    countPutts3OrMore?: number;
    sumDistanceFirstPuttGir?: number;
    statisticsByRange?: {
      // Use specific keys
      puttsU2M?: ITotalRoundsAvgPuttsRange;
      putts24M?: ITotalRoundsAvgPuttsRange;
      putts46M?: ITotalRoundsAvgPuttsRange;
      putts610M?: ITotalRoundsAvgPuttsRange;
      puttsO10M?: ITotalRoundsAvgPuttsRange;
    };
    overallStats?: {
      sumPuttsMadeForBirdieOrBetter?: number;
      countAttemptsForBirdieOrBetter?: number;
    }
  };
  sand?: {
    sumAttempts?: number;
    sumSaved?: number;
  };
  water?: {
    countPenalties?: number;
    countPenaltiesIN?: number;
    countPenaltiesOUT?: number;
  };
  out?: {
    countPenalties?: number;
    countPenaltiesIN?: number;
    countPenaltiesOUT?: number;
  };
}

interface ITotalRoundsAvgTeeShotClub {
  sumAttempts?: number;
  sumFairwayHits?: number;
  sumPar4_5_Attempts?: number;
  sumDistance?: number;
  countShotsWithDistance?: number;
  sumMissLeft?: number;
  sumMissRight?: number;
  sumFirMiss?: number;
}

interface ITotalRoundsAvgFwAndIronsClub {
  sumAttempts?: number;
  sumGirHits?: number;
  sumDistance?: number;
  countShotsWithDistance?: number;
  sumMissLeft?: number;
  sumMissRight?: number;
  sumMissShort?: number;
  sumMissLong?: number;
  sumScorePar3?: number;
  countPar3Attempts?: number;
  sumScorePar4?: number;
  countPar4Attempts?: number;
  sumScorePar5?: number;
  countPar5Attempts?: number;
  sumDistanceToPinOnGIR?: number;
  countGirHits?: number;
}

interface ITotalRoundsAvgInside100MtRange {
  sumAttempts?: number;
  sumGirHits?: number;
  sumScoreRelativeToPar?: number;
  sumDistanceToPinOnGIR?: number;
  countGirHits?: number;
  sumMissedLeft?: number;
  sumMissedRight?: number;
  sumMissedShort?: number;
  sumMissedLong?: number;
  sumDistance?: number;
  countShotsWithDistance?: number;
  sumPuttsTaken?: number;
}

interface ITotalRoundsAvgChipPitchClub {
  sumAttempts?: number;
  sumUpDownSuccess?: number;
  sumScoreRelativeToPar?: number;
  sumDistanceToHole?: number;
  sumShotsHoled?: number;
  sumPuttsTaken?: number;
}

interface ITotalRoundsAvgPuttsRange {
  sumAttempts?: number;
  sumHoled?: number;
  sumPuttsTaken?: number;
  sumDistanceFirstPutt?: number;
  sumDistanceSecondPutt?: number;
  countSecondPutts?: number;
  countPutts3OrMore?: number;
}
