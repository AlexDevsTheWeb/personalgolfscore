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
  over100mt: IRoundInside100Mt,
  inside10081: IRoundInside100Mt,
  inside8061: IRoundInside100Mt,
  inside60: IRoundInside100Mt
}
interface IRoundInside100Mt {
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

interface IRoundFWAndIrons {
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
  _puttsOverall: {
    birdieBetter: number,
    birdieConversion: number,
    gir: number,
    puttsInGIR: number,
    threePutts: number,
    totalPutts: number,
    totalPuttsInGIR: number,
  }
}

interface IPuttsBreakDownStatistics {
  distanceFirstPutt: number,
  distanceSecondPutt: number,
  numberPuttsInRange: number,
  numberSecondPutt: number,
  putt1Perc: number,
  putt3Perc: number,
  putts3: number,
  puttsAttempts: number,
  puttsAverage: number,
  puttsAverageDistance: number,
  puttsHoled: number,
  puttsSecondAverageLength: number,
}

export interface ITotalRoundsAvg {
  totalRoundsCount: number;
  totalHolesPlayed: number;
  totalHolesPlayedIN: number;
  totalHolesPlayedOUT: number;
  totalPar4_5_Holes: number;
  score: {
    sumTotals: number;
    sumVsPar: number;
    sumScoreIN: number;
    sumScoreOUT: number;
    sumVsParIN: number;
    sumVsParOUT: number;
    countPar3: number;
    countPar4: number;
    countPar5: number;
    countScoreEagleBetter: number;
    countScoreBirdie: number;
    countScorePar: number;
    countScoreBogey: number;
    countScoreDoubleBogeyWorst: number;
    sumScorePar3: number;
    sumScorePar4: number;
    sumScorePar5: number;
  };
  points: {
    sumTotals: number;
    sumPointsIN: number;
    sumPointsOUT: number;
  };
  fairway: {
    sumAttempts: number;
    sumFairwayCenter: number;
    sumFairwayLeft: number;
    sumFairwayRight: number;
  };
  teeShots: {
    [clubType: string]: {
      sumAttempts: number;
      sumFairwayHits: number;
      sumPar4_5_Attempts: number;
      sumDistance: number;
      countShotsWithDistance: number;
      sumMissLeft: number;
      sumMissRight: number;
      sumFirMiss: number;
    }
  },
  fwAndIrons: {
    [clubCategory: string]: {
      sumAttempts: number;
      sumGreenHits: number;
      sumScorePar3: number;
      countPar3Attempts: number;
      sumScorePar4: number;
      countPar4Attempts: number;
      sumScorePar5: number;
      countPar5Attempts: number;
      sumDistanceToPinOnGIR: number;
      countGirHits: number;
      sumMissedLeft: number;
      sumMissedRight: number;
      sumMissedShort: number;
      sumMissedLong: number;
    },
  },
  inside100Mt: {
    [range: string]: {
      sumAttempts: number;
      sumGreensHits: number;
      sumScoreRelativeToPar: number;
      sumDistanceToPinOnGIR: number;
      countGirHits: number;
      sumMissedLeft: number;
      sumMissedRight: number;
      sumMissedShort: number;
      sumMissedLong: number;
    };
  };
  chipPitch: {
    [clubType: string]: {
      sumAttempts: number;
      sumUpDownMade: number;
      sumScoreRelativeToPar: number;
      sumDistanceToHole: number;
      sumShotsHoled: number;
    };
  };
  gir: {
    sumGirMade: number;
    sumGirMadeIN: number;
    sumGirMadeOUT: number;
    // sumGirAttempts is totalHolesPlayed
    // sumGirAttemptsIN is totalHolesPlayedIN
    // sumGirAttemptsOUT is totalHolesPlayedOUT
  };

  girBogey: {
    sumGirBogeyMade: number;
    sumGirBogeyMadeIN: number;
    sumGirBogeyMadeOUT: number;
    // sumGirBogeyAttempts is totalHolesPlayed
  };
  upDown: {
    sumAttempts: number;
    sumSaved: number;
  };
  scramble: {
    sumAttempts: number;
    sumSaved: number;
  };
  putts: {
    sumTotals: number;
    sumTotalsIN: number;
    sumTotalsOUT: number;
    sumPuttsGir: number;
    sumPuttsGirIN: number;
    sumPuttsGirOUT: number;
    countPutts1: number;
    countPutts2: number;
    countPutts3OrMore: number;
    sumDistanceFirstPuttGir: number;
    statisticsByRange: {

      [range: string]: {
        sumAttempts: number;
        sumHoled: number;
        sumPuttsTaken: number;
        sumDistanceFirstPutt: number;
        sumDistanceSecondPutt: number;
        countSecondPutts: number;
        countPutts3OrMore: number;
      };
    };

    overallStats: {
      sumPuttsMadeForBirdieOrBetter: number;
      countAttemptsForBirdieOrBetter: number;
    }
  };
  sand: {
    sumAttempts: number;
    sumSaved: number;
  };
  water: {
    countPenalties: number;
    countPenaltiesIN: number;
    countPenaltiesOUT: number;
  };
  out: {
    countPenalties: number;
    countPenaltiesIN: number;
    countPenaltiesOUT: number;
  };
}
