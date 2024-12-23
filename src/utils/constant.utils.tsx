import { IRoundFinalData } from "@/types/round.types";
import { IDistance, IShots } from "../types/roundData.types";
import { IPuttsStatistics, IRoundChipPitchTotals, IRoundFwAndIronsTotals, IRoundInside100MtTotals, IRoundTeeShotsTotals, IRoundTotals } from "../types/roundTotals.types";

export const parList = ['3', '4', '5'];
export const hcpList18 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',];
export const hcpList9 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const fairwayValues = ['4 - Left', '5 - Center', '6 - Right'];
export const greenSideValues = ['S - Short', 'O - Over', 'L - Left', 'R - Right'];

export const pieChartDimensions = {
  height: 200,
  width: 350,
}

export const initialStateDistance: IDistance[] = [];

export const initialStateRoundTotals: IRoundTotals = {
  playerID: 'playerID',
  mainData: {
    roundCourse: '',
    roundDate: '',
    roundNumber: 0,
    roundTee: '',
    coursePar: 0,
    playerHCP: 0
  },
  score: {
    totals: 0,
    vsPar: 0,
    avg: '',
    scoreIN: 0,
    scoreOUT: 0,
    vsParIN: 0,
    vsParOUT: 0,
    avgIN: '',
    avgOUT: '',
    par3: 0,
    par4: 0,
    par5: 0,
    scoreEagleBetter: 0,
    scoreBirdie: 0,
    scorePar: 0,
    scoreBogey: 0,
    scoreDoubleBogeyWorst: 0,
    scorePar3: 0,
    scorePar4: 0,
    scorePar5: 0,
  },
  points: {
    totals: 0,
    avg: '',
    pointsIN: 0,
    pointsOUT: 0,
    avgIN: '',
    avgOUT: '',
  },
  fairway: {
    total: 0,
    fairwayCenter: 0,
    fairwayLeft: 0,
    fairwayRight: 0,
  },
  teeShots: {
    teeDriver: {
      fairwayHits: 0,
      attempts: 0,
      averageDistance: 0,
      missLeft: 0,
      missRight: 0,
      noGreen: 0,
      fairwayCenterPCT: 0,
      fairwayLeftPCT: 0,
      fairwayRightPCT: 0,
    },
    teeFW: {
      fairwayHits: 0,
      attempts: 0,
      averageDistance: 0,
      missLeft: 0,
      missRight: 0,
      noGreen: 0,
      fairwayCenterPCT: 0,
      fairwayLeftPCT: 0,
      fairwayRightPCT: 0,
    },
    teeHY: {
      fairwayHits: 0,
      attempts: 0,
      averageDistance: 0,
      missLeft: 0,
      missRight: 0,
      noGreen: 0,
      fairwayCenterPCT: 0,
      fairwayLeftPCT: 0,
      fairwayRightPCT: 0,
    },
    teeIron: {
      fairwayHits: 0,
      attempts: 0,
      averageDistance: 0,
      missLeft: 0,
      missRight: 0,
      noGreen: 0,
      fairwayCenterPCT: 0,
      fairwayLeftPCT: 0,
      fairwayRightPCT: 0,
    },
  },
  chipPitch: {
    pw: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
    gw: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
    sw: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
    lw: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
    b: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
    putt: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
    chip: {
      upDownMade: 0,
      attempts: 0,
      averageShot: 0,
      averageHoleDistance: 0,
      shotsHoled: 0,
      greensMissed: 0,
    },
  },
  fwAndIrons: {
    fwHy: {
      greenHits: 0,
      attempts: 0,
      totalScorePar3: 0,
      totalScorePar4: 0,
      totalNumberPar4: 0,
      totalScorePar5: 0,
      totalNumberPar5: 0,
      totalDistanceGIR: 0,
      totalGirGir2Made: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedOver: 0,
      averageShots: 0,
      averageDistGIR: 0,
    },
    longIrons: {
      greenHits: 0,
      attempts: 0,
      totalScorePar3: 0,
      totalScorePar4: 0,
      totalNumberPar4: 0,
      totalScorePar5: 0,
      totalNumberPar5: 0,
      totalDistanceGIR: 0,
      totalGirGir2Made: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedOver: 0,
      averageShots: 0,
      averageDistGIR: 0,
    },
    shortIrons: {
      greenHits: 0,
      attempts: 0,
      totalScorePar3: 0,
      totalScorePar4: 0,
      totalNumberPar4: 0,
      totalScorePar5: 0,
      totalNumberPar5: 0,
      totalDistanceGIR: 0,
      totalGirGir2Made: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedOver: 0,
      averageShots: 0,
      averageDistGIR: 0,
    }
  },
  inside100Mt: {
    over100mt: {
      greensHits: 0,
      attempts: 0,
      averageShots: 0,
      averageDistGIR: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedLong: 0
    },
    inside10081: {
      greensHits: 0,
      attempts: 0,
      averageShots: 0,
      averageDistGIR: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedLong: 0
    },
    inside8061: {
      greensHits: 0,
      attempts: 0,
      averageShots: 0,
      averageDistGIR: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedLong: 0
    },
    inside60: {
      greensHits: 0,
      attempts: 0,
      averageShots: 0,
      averageDistGIR: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedLong: 0
    },
  },


  gir: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: ''
  },
  girBogey: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: ''
  },
  scramble: {
    totals: 0,
    saved: 0,
    perc: 0,
  },
  upDown: {
    totals: 0,
    saved: 0,
    perc: 0,
  },
  putts: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: '',
    puttsGir: 0,
    puttsGirIn: 0,
    puttsGirOut: 0,
    puttsThree: 0,
    putts1: 0,
    putts2: 0,
    putts3More: 0,
    puttsDistGir: 0,
    puttsStatistics: {
      puttsU2M: {
        puttsHoled: 0,
        puttsAttempts: 0,
        numberPuttsInRange: 0,
        distanceSecondPutt: 0,
        numberSecondPutt: 0,
        distanceFirstPutt: 0,
        putts3: 0,
      },
      putts24M: {
        puttsHoled: 0,
        puttsAttempts: 0,
        numberPuttsInRange: 0,
        distanceSecondPutt: 0,
        numberSecondPutt: 0,
        distanceFirstPutt: 0,
        putts3: 0,
      },
      putts46M: {
        puttsHoled: 0,
        puttsAttempts: 0,
        numberPuttsInRange: 0,
        distanceSecondPutt: 0,
        numberSecondPutt: 0,
        distanceFirstPutt: 0,
        putts3: 0,
      },
      putts610M: {
        puttsHoled: 0,
        puttsAttempts: 0,
        numberPuttsInRange: 0,
        distanceSecondPutt: 0,
        numberSecondPutt: 0,
        distanceFirstPutt: 0,
        putts3: 0,
      },
      puttsO10M: {
        puttsHoled: 0,
        puttsAttempts: 0,
        numberPuttsInRange: 0,
        distanceSecondPutt: 0,
        numberSecondPutt: 0,
        distanceFirstPutt: 0,
        putts3: 0,
      },
    }
  },
  sand: {
    totals: 0,
    avg: '',
    saved: 0,
    avgSaved: '',
    savedPerc: 0,
  },
  water: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: '',
  },
  out: {
    totals: 0,
    avg: '',
    totalsIN: 0,
    avgIN: '',
    totalsOUT: 0,
    avgOUT: '',
  }
};

export const initialStateTmpHole: IShots = {
  holeNumber: 0,
  chipClub: '',
  distance: 0,
  driveDistance: 0,
  fairway: 0,
  fir: 0,
  gir: false,
  girBogey: false,
  greenSide: '',
  greenSideL: 0,
  greenSideO: 0,
  greenSideR: 0,
  greenSideS: 0,
  hcp: 0,
  out: 0,
  par: 0,
  bounceBack: 0,
  bounceForward: 0,
  points: 0,
  pointsAvg: 0,
  putts: 0,
  puttsLength: [],
  puttsUnder2: 0,
  putts2_4: 0,
  putts4_6: 0,
  putts6_10: 0,
  puttsOver10: 0,
  sand: 0,
  strokes: 0,
  teeClub: '',
  toGreen: '',
  toGreenMeters: 0,
  toGreenMetersOver100: 0,
  toGreenMeters80_100: 0,
  toGreenMeters60_80: 0,
  toGreenMetersUnder60: 0,
  upDown: { made: 0, attempts: 0 },
  scramble: { made: 0, attempts: 0 },
  water: 0,
}

export const initialPuttsStatistics: IPuttsStatistics = {
  puttsU2M: {
    puttsHoled: 0,
    puttsAttempts: 0,
    numberPuttsInRange: 0,
    distanceSecondPutt: 0,
    numberSecondPutt: 0,
    distanceFirstPutt: 0,
    putts3: 0,
  },
  putts24M: {
    puttsHoled: 0,
    puttsAttempts: 0,
    numberPuttsInRange: 0,
    distanceSecondPutt: 0,
    numberSecondPutt: 0,
    distanceFirstPutt: 0,
    putts3: 0,
  },
  putts46M: {
    puttsHoled: 0,
    puttsAttempts: 0,
    numberPuttsInRange: 0,
    distanceSecondPutt: 0,
    numberSecondPutt: 0,
    distanceFirstPutt: 0,
    putts3: 0,
  },
  putts610M: {
    puttsHoled: 0,
    puttsAttempts: 0,
    numberPuttsInRange: 0,
    distanceSecondPutt: 0,
    numberSecondPutt: 0,
    distanceFirstPutt: 0,
    putts3: 0,
  },
  puttsO10M: {
    puttsHoled: 0,
    puttsAttempts: 0,
    numberPuttsInRange: 0,
    distanceSecondPutt: 0,
    numberSecondPutt: 0,
    distanceFirstPutt: 0,
    putts3: 0,
  },
}
export const catConversion = (string: string) => {
  let result = '';
  switch (string) {
    case 'teeDriver':
      result = 'Driver';
      break;
    case 'teeFW':
      result = 'Fairway Wood';
      break;
    case 'teeHY':
      result = 'Hybrid';
      break;
    case 'teeIron':
      result = 'Irons';
      break;
    case '_puttsOverall':
      result = 'Overall';
      break;
    case 'fwHy':
      result = '4w - Hybrid';
      break;
    case 'longIrons':
      result = '4i - 6i';
      break;
    case 'shortIrons':
      result = '7i - 9i';
      break;
    case 'puttsU2M':
      result = 'First putt under 2 mts.';
      break;
    case 'putts24M':
      result = 'First putt from 2 to 4 mts.';
      break;
    case 'putts46M':
      result = 'First putt from 4 to 6 mts.';
      break;
    case 'putts610M':
      result = 'First putt from 6 to 10 mts.';
      break;
    case 'puttsO10M':
      result = 'First putt over 10 Mts.';
      break;
    case 'over100mt':
      result = 'Over 100 mts.';
      break;
    case 'inside10081':
      result = '100 to 80 mts.'
      break;
    case 'inside8061':
      result = '80 to 60 mts.'
      break;
    case 'inside60':
      result = 'Inside 60 mts.'
      break;
  }
  return result;
}

export const initialTeeShotsStatistics: IRoundTeeShotsTotals = {
  teeDriver: {
    fairwayHits: 0,
    attempts: 0,
    averageDistance: 0,
    missLeft: 0,
    missRight: 0,
    noGreen: 0,
    fairwayCenterPCT: 0,
    fairwayLeftPCT: 0,
    fairwayRightPCT: 0,
  },
  teeFW: {
    fairwayHits: 0,
    attempts: 0,
    averageDistance: 0,
    missLeft: 0,
    missRight: 0,
    noGreen: 0,
    fairwayCenterPCT: 0,
    fairwayLeftPCT: 0,
    fairwayRightPCT: 0,
  },
  teeHY: {
    fairwayHits: 0,
    attempts: 0,
    averageDistance: 0,
    missLeft: 0,
    missRight: 0,
    noGreen: 0,
    fairwayCenterPCT: 0,
    fairwayLeftPCT: 0,
    fairwayRightPCT: 0,
  },
  teeIron: {
    fairwayHits: 0,
    attempts: 0,
    averageDistance: 0,
    missLeft: 0,
    missRight: 0,
    noGreen: 0,
    fairwayCenterPCT: 0,
    fairwayLeftPCT: 0,
    fairwayRightPCT: 0,
  },
}

export const initialPitchChipStatistics: IRoundChipPitchTotals = {
  pw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
  gw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
  sw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
  lw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
  b: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
  putt: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
  chip: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
  },
}

export const initialInside100MtStatistics: IRoundInside100MtTotals = {
  over100mt: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0
  },
  inside10081: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0
  },
  inside8061: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0
  },
  inside60: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0
  },
}

export const initialFwAndIronsStatistics: IRoundFwAndIronsTotals = {
  fwHy: {
    greenHits: 0,
    attempts: 0,
    totalScorePar3: 0,
    totalScorePar4: 0,
    totalNumberPar4: 0,
    totalScorePar5: 0,
    totalNumberPar5: 0,
    totalDistanceGIR: 0,
    totalGirGir2Made: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedOver: 0,
    averageShots: 0,
    averageDistGIR: 0,
  },
  longIrons: {
    greenHits: 0,
    attempts: 0,
    totalScorePar3: 0,
    totalScorePar4: 0,
    totalNumberPar4: 0,
    totalScorePar5: 0,
    totalNumberPar5: 0,
    totalDistanceGIR: 0,
    totalGirGir2Made: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedOver: 0,
    averageShots: 0,
    averageDistGIR: 0,
  },
  shortIrons: {
    greenHits: 0,
    attempts: 0,
    totalScorePar3: 0,
    totalScorePar4: 0,
    totalNumberPar4: 0,
    totalScorePar5: 0,
    totalNumberPar5: 0,
    totalDistanceGIR: 0,
    totalGirGir2Made: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedOver: 0,
    averageShots: 0,
    averageDistGIR: 0,
  },
}

export const roundToSave: IRoundFinalData = {
  roundMainData: {
    roundID: '',
    roundDate: '',
    roundCourse: '',
    roundHoles: 0,
    roundTee: '',
    roundPar: 0,
    roundPlayingHCP: 0,
    roundNumber: 0
  },
  roundHolesData: [],
  roundTotalsData: initialStateRoundTotals,
  roundDistancesData: [],
}
