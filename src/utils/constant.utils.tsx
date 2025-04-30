import { IDistance, IShots } from "../types/roundData.types";
import {
  IPuttsStatistics,
  IRoundChipPitch,
  IRoundChipPitchTotals,
  IRoundFWAndIrons,
  IRoundFwAndIronsTotals,
  IRoundInside100Mt, // <-- Also add IRoundInside100Mt if needed elsewhere
  IRoundInside100MtTotals,
  IRoundTeeShotClubTotals, // <-- Add this type
  IRoundTeeShotsTotals,
  IRoundTotals
} from "../types/roundTotals.types";

export const parList = ['3', '4', '5'];
export const hcpList18 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',];
export const hcpList9 = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const fairwayValues = ['4 - Left', '5 - Center', '6 - Right'];
export const greenSideValues = ['S - Short', 'O - Over', 'L - Left', 'R - Right'];

export const PUTT_LENGTH_THRESHOLDS = {
  SHORT: 2,
  MEDIUM: 4,
  LONG: 6,
  VERY_LONG: 10,
};

export const GREEN_APPROACH_THRESHOLDS = {
  NEAR: 60,
  MID: 80,
  FAR: 100,
};

export const pieChartDimensions = {
  height: 200,
  width: 350,
}

export const initialStateDistance: IDistance[] = [];

export const createInitialTeeShotClubTotals = (): IRoundTeeShotClubTotals => ({
  fairwayHits: 0,
  attempts: 0,
  averageDistance: 0,
  missLeft: 0,
  missRight: 0,
  noGreen: 0,
  fairwayCenterPCT: 0,
  missLeftPCT: 0,
  missRightPCT: 0,
  firMissPCT: 0,
  // --- Initialize added properties ---
  totalDistance: 0,
  countShotsWithDistance: 0,
  par4_5_Attempts: 0,
});

export const createInitialFwAndIronsTotals = (): IRoundFWAndIrons => ({
  girHits: 0,
  averageDistance: 0,
  missLeft: 0,
  missRight: 0,
  missShort: 0,
  missLong: 0,
  attempts: 0,
  totalScorePar3: 0,
  totalScorePar4: 0,
  totalNumberPar4: 0,
  totalScorePar5: 0,
  totalNumberPar5: 0,
  totalDistanceGIR: 0,
  totalGirGir2Made: 0,
  averageShots: 0,
  averageDistGIR: 0,
  girPCT: 0,
  missLeftPCT: 0,
  missRightPCT: 0,
  missShortPCT: 0,
  missLongPCT: 0,
  totalNumberPar3: 0,
});

export const createInitialInside100Mt = (): IRoundInside100Mt => ({
  greensHits: 0,
  attempts: 0,
  averageShots: 0,
  averageDistGIR: 0,
  missedLeft: 0,
  missedRight: 0,
  missedShort: 0,
  missedLong: 0,
  girPCT: 0,
  totalDistance: 0,
  totalShotsTaken: 0,
  totalPuttsTaken: 0,
  totalDistGIR: 0,
  countShotsWithDistance: 0,
});

export const createInitialChipPitch = (): IRoundChipPitch => ({
  upDownMade: 0,
  attempts: 0,
  averageShot: 0,
  averageHoleDistance: 0,
  shotsHoled: 0,
  greensMissed: 0,
  upDownPCT: 0,
  totalShotsTaken: 0,
  totalDistanceToHole: 0,
  totalDistanceNumber: 0,
  totalPuttsTaken: 0,
});

export const initialPuttsStatistics: IPuttsStatistics = {
  _puttsOverall: {
    birdieBetter: 0,
    birdieConversion: 0,
    gir: 0,
    puttsInGIR: 0,
    threePutts: 0,
    totalPutts: 0,
    totalPuttsInGIR: 0,
  },
  puttsU2M: {
    distanceFirstPutt: 0,
    distanceSecondPutt: 0,
    numberPuttsInRange: 0,
    numberSecondPutt: 0,
    putt1Perc: 0,
    putt3Perc: 0,
    putts3: 0,
    puttsAttempts: 0,
    puttsAverage: 0,
    puttsAverageDistance: 0,
    puttsHoled: 0,
    puttsSecondAverageLength: 0,
  },
  putts24M: {
    distanceFirstPutt: 0,
    distanceSecondPutt: 0,
    numberPuttsInRange: 0,
    numberSecondPutt: 0,
    putt1Perc: 0,
    putt3Perc: 0,
    putts3: 0,
    puttsAttempts: 0,
    puttsAverage: 0,
    puttsAverageDistance: 0,
    puttsHoled: 0,
    puttsSecondAverageLength: 0,
  },
  putts46M: {
    distanceFirstPutt: 0,
    distanceSecondPutt: 0,
    numberPuttsInRange: 0,
    numberSecondPutt: 0,
    putt1Perc: 0,
    putt3Perc: 0,
    putts3: 0,
    puttsAttempts: 0,
    puttsAverage: 0,
    puttsAverageDistance: 0,
    puttsHoled: 0,
    puttsSecondAverageLength: 0,
  },
  putts610M: {
    distanceFirstPutt: 0,
    distanceSecondPutt: 0,
    numberPuttsInRange: 0,
    numberSecondPutt: 0,
    putt1Perc: 0,
    putt3Perc: 0,
    putts3: 0,
    puttsAttempts: 0,
    puttsAverage: 0,
    puttsAverageDistance: 0,
    puttsHoled: 0,
    puttsSecondAverageLength: 0,
  },
  puttsO10M: {
    distanceFirstPutt: 0,
    distanceSecondPutt: 0,
    numberPuttsInRange: 0,
    numberSecondPutt: 0,
    putt1Perc: 0,
    putt3Perc: 0,
    putts3: 0,
    puttsAttempts: 0,
    puttsAverage: 0,
    puttsAverageDistance: 0,
    puttsHoled: 0,
    puttsSecondAverageLength: 0,
  },
}

export const initialStateRoundTotals: IRoundTotals = {
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
    avg: 0,
    scoreIN: 0,
    scoreOUT: 0,
    vsParIN: 0,
    vsParOUT: 0,
    avgIN: 0,
    avgOUT: 0,
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
    avg: 0,
    pointsIN: 0,
    pointsOUT: 0,
    avgIN: 0,
    avgOUT: 0,
  },
  fairway: {
    total: 0,
    fairwayCenter: 0,
    fairwayLeft: 0,
    fairwayRight: 0,
  },
  teeShots: {
    // Use the helper function
    teeDriver: createInitialTeeShotClubTotals(),
    teeFW: createInitialTeeShotClubTotals(),
    teeHY: createInitialTeeShotClubTotals(),
    teeIron: createInitialTeeShotClubTotals(),
  },
  chipPitch: {
    // Use the helper function
    pw: createInitialChipPitch(),
    gw: createInitialChipPitch(),
    sw: createInitialChipPitch(),
    lw: createInitialChipPitch(),
    b: createInitialChipPitch(),
    putt: createInitialChipPitch(),
    chip: createInitialChipPitch(),
    // Initialize new keys if added to type
    chipPutter: createInitialChipPitch(),
    chipWedge: createInitialChipPitch(),
    chipIron: createInitialChipPitch(),
  },
  fwAndIrons: {
    // Use the helper function
    fwFW: createInitialFwAndIronsTotals(),
    fwHY: createInitialFwAndIronsTotals(),
    fwLongIron: createInitialFwAndIronsTotals(), // Changed key
    fwShortIron: createInitialFwAndIronsTotals(), // Changed key
    fwMidIron: createInitialFwAndIronsTotals(),
  },
  inside100Mt: {
    // Use the helper function
    over100: createInitialInside100Mt(), // Renamed key for consistency
    inside10081: createInitialInside100Mt(),
    inside8061: createInitialInside100Mt(),
    inside60: createInitialInside100Mt(),
  },
  gir: {
    totals: 0,
    avg: 0,
    totalsIN: 0,
    avgIN: 0,
    totalsOUT: 0,
    avgOUT: 0
  },
  girBogey: {
    totals: 0,
    avg: 0,
    totalsIN: 0,
    avgIN: 0,
    totalsOUT: 0,
    avgOUT: 0
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
    avg: 0,
    totalsIN: 0,
    avgIN: 0,
    totalsOUT: 0,
    avgOUT: 0,
    puttsGir: 0,
    puttsGirIn: 0,
    puttsGirOut: 0,
    puttsThree: 0,
    putts1: 0,
    putts2: 0,
    putts3More: 0,
    puttsDistGir: 0,
    puttsStatistics: initialPuttsStatistics,
  },
  sand: {
    totals: 0,
    avg: 0,
    saved: 0,
    avgSaved: 0,
    savedPerc: 0,
  },
  water: {
    totals: 0,
    avg: 0,
    totalsIN: 0,
    avgIN: 0,
    totalsOUT: 0,
    avgOUT: 0,
  },
  out: {
    totals: 0,
    avg: 0,
    totalsIN: 0,
    avgIN: 0,
    totalsOUT: 0,
    avgOUT: 0,
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

export const catConversion = (string: string) => {
  let result = '';
  switch (string) {
    case 'teeDriver': result = 'Driver'; break;
    case 'teeFW': result = 'Fairway Wood'; break;
    case 'teeHY': result = 'Hybrid'; break;
    case 'teeIron': result = 'Irons'; break;
    case '_puttsOverall': result = 'Overall'; break;
    case 'fwFW': result = 'Fairway Wood'; break; // Added fwFW
    case 'fwHY': result = '4w - Hybrid'; break;
    case 'fwLongIron': result = '4i - 6i'; break;
    case 'fwShortIron': result = 'Mid Irons'; break; // Added fwMidIron
    case 'shortIrons': result = '7i - 9i'; break;
    case 'puttsU2M': result = '1° putt < 2 mts.'; break; // Corrected label
    case 'putts24M': result = '1° putt 2-4 mts.'; break; // Corrected label
    case 'putts46M': result = '1° putt 4-6 mts.'; break; // Corrected label
    case 'putts610M': result = '1° putt 6-10 mts.'; break; // Corrected label
    case 'puttsO10M': result = '1° putt > 10 Mts.'; break; // Corrected label
    case 'over100mt': result = '> 100 mts.'; break; // Renamed key
    case 'range80_100': result = '100-80 mts.'; break; // Renamed key
    case 'range60_80': result = '80-60 mts.'; break; // Renamed key
    case 'under60': result = '< 60 mts.'; break; // Renamed key
    case 'over100': result = '> 100 mts.'; break; // Renamed key
    case 'inside10081': result = '100-80 mts.'; break; // Renamed key
    case 'inside8061': result = '80-60 mts.'; break; // Renamed key
    case 'inside60': result = '< 60 mts.'; break; // Renamed key
    case 'chipPutter': result = 'Putter Chip'; break; // Added
    case 'chipWedge': result = 'Wedge Chip'; break; // Added
    case 'chipIron': result = 'Iron Chip'; break; // Added
    default: result = string; // Default to the key if no match
  }
  return result;
}

export const initialTeeShotsStatistics: IRoundTeeShotsTotals = {
  teeDriver: createInitialTeeShotClubTotals(),
  teeFW: createInitialTeeShotClubTotals(),
  teeHY: createInitialTeeShotClubTotals(),
  teeIron: createInitialTeeShotClubTotals(),
}

export const initialPitchChipStatistics: IRoundChipPitchTotals = {
  pw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
  gw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
  sw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
  lw: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
  b: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
  putt: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
  chip: {
    upDownMade: 0,
    attempts: 0,
    averageShot: 0,
    averageHoleDistance: 0,
    shotsHoled: 0,
    greensMissed: 0,
    totalShotsTaken: 0,
    totalDistanceToHole: 0,
    totalDistanceNumber: 0,
    totalPuttsTaken: 0,
  },
}

export const initialInside100MtStatistics: IRoundInside100MtTotals = {
  over100: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0,
    girPCT: 0,
    totalDistance: 0,
    totalShotsTaken: 0,
    totalPuttsTaken: 0,
    totalDistGIR: 0,
    countShotsWithDistance: 0,
  },
  inside10081: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0,
    girPCT: 0,
    totalDistance: 0,
    totalShotsTaken: 0,
    totalPuttsTaken: 0,
    totalDistGIR: 0,
    countShotsWithDistance: 0,
  },
  inside8061: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0,
    girPCT: 0,
    totalDistance: 0,
    totalShotsTaken: 0,
    totalPuttsTaken: 0,
    totalDistGIR: 0,
    countShotsWithDistance: 0,
  },
  inside60: {
    greensHits: 0,
    attempts: 0,
    averageShots: 0,
    averageDistGIR: 0,
    missedLeft: 0,
    missedRight: 0,
    missedShort: 0,
    missedLong: 0,
    girPCT: 0,
    totalDistance: 0,
    totalShotsTaken: 0,
    totalPuttsTaken: 0,
    totalDistGIR: 0,
    countShotsWithDistance: 0,
  },
}

export const initialFwAndIronsStatistics: IRoundFwAndIronsTotals = {
  fwFW: createInitialFwAndIronsTotals(),
  fwHY: createInitialFwAndIronsTotals(),
  fwLongIron: createInitialFwAndIronsTotals(), // Changed key
  fwShortIron: createInitialFwAndIronsTotals(), // Changed key
  fwMidIron: createInitialFwAndIronsTotals(),
};

export const CLUB_SORT_ORDER = [
  'DRIVER',
  'FAIRWAY WOOD', // Or 'FW', '3W', etc. - match your data
  'HYBRID',       // Or 'HY', '3H', etc. - match your data
  'i4',           // Or '4i', 'IRON 4', etc. - match your data
  'i5',
  'i6',
  'i7',
  'i8',
  'i9',
  'PITCH WEDGE',  // Or 'PW' - match your data
  'GAP WEDGE',    // Or 'GW', 'AW' - match your data
  'SAND WEDGE',   // Or 'SW' - match your data
  'LOB WEDGE'     // Or 'LW' - add if needed
  // Add any other clubs in their desired order
].map(club => club.toUpperCase());