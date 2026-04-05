import { STABLEFORDPOINTS } from "@/enum/shots.enum";
import { IGirProps, IScrambleProps, IStablefordPointsProps, IUDProps } from "@/types/point.types";
import { GreenApproachDistanceCounts, PuttLengthCounts } from "@/types/round.types";
import { IRoundScoreTotalsAvg } from "@/types/roundTotals.types";
import { GREEN_APPROACH_THRESHOLDS, PUTT_LENGTH_THRESHOLDS } from "../constant.utils";

export const calculateStablefordPoints = (props: IStablefordPointsProps) => {
  const { hcp, par, strokes, roundPlayingHCP, roundHoles } = props;
  let newPar = Number(par);
  const diff = roundPlayingHCP - roundHoles;

  if (diff === 0) {
    newPar = newPar + 1
  }
  else if (diff < 0) {
    if (hcp <= diff) {
      newPar = newPar + 1;
    }
  }
  else if (diff > 0) {
    newPar = newPar + 1;
    if (hcp <= diff) {
      newPar = newPar + 1;
    }
  }
  return calculatePoints(newPar, Number(strokes));
}

export const calculateGirValue = (props: IGirProps) => {
  const { par, strokes, putts, bogey } = props;

  // GIR is determined by strokes taken to reach the green.
  const strokesToGreen = strokes - putts;

  // Standard GIR: on green in (par - 2) strokes or less.
  // Bogey GIR (GIR+1): on green in (par - 1) strokes or less.
  const girThreshold = bogey ? (par - 1) : (par - 2);

  if (strokesToGreen <= girThreshold) {
    return true;
  } else {
    return false;
  }
};

export const calculateUDValue = (props: IUDProps): { attempts: number; made: number } => {
  const {
    girValue,         // Value indicating if GIR was made (e.g., 0 for no, 1 for yes)
    chipClub,         // The club used for the primary chip/pitch shot
    chipClubs,        // Array of valid chipping club names
    intermediateShots, // Array of any extra shots taken between chip and putts, or other recovery
    numberOfPutts     // Number of putts taken on the green
    // parValue and strokesValue are part of IUDProps but not strictly needed for this definition of Up&Down
  } = props;

  let attempts = 0;
  let made = 0;

  // Determine if the provided chipClub is valid
  const isChipClubValid = chipClub && chipClub.trim() !== '' && chipClubs && chipClubs.includes(chipClub);

  // An up-and-down attempt can only occur if:
  // 1. Green was NOT hit in regulation (girValue is not 1, typically 0).
  // 2. A designated chip/pitch shot was played from off the green.
  if (girValue !== 1 && isChipClubValid) {
    attempts = 1;

    // Calculate the total number of strokes taken *after* the initial chipClub shot to hole out.
    // This includes any intermediate shots and the putts on the green.
    const strokesTakenAfterInitialChip = (intermediateShots ? intermediateShots.length : 0) + numberOfPutts;

    // A successful up-and-down means the ball was holed in 2 strokes starting from the initial chip:
    // Stroke 1: The chipClub shot itself.
    // Stroke 2: The sum of intermediate shots and putts on the green.
    // Therefore, strokesTakenAfterInitialChip must be 0 or 1.
    // - If strokesTakenAfterInitialChip is 0: chip-in (1st shot went in).
    // - If strokesTakenAfterInitialChip is 1: one more shot (either an intermediate shot holed, or one putt on green).
    if (strokesTakenAfterInitialChip <= 1) {
      made = 1;
    }
  }

  return { attempts, made };
};

export const calculateScrambleValue = (props: IScrambleProps) => {
  let result = { made: 0, attempts: 0 };
  const { strokesValue, parValue, girValue } = props;
  if (strokesValue !== 0 && parValue !== 0) {

    if (girValue !== 1) {
      if ((strokesValue - parValue) <= 0) {
        result = { made: 1, attempts: 1 };
      }
      else {
        result = { made: 0, attempts: 1 };
      }
    }
  }

  return result;
};

const calculatePoints = (par: number, strokes: number) => {
  if (strokes !== 0 && par !== 0) {
    if (strokes === par) {
      return STABLEFORDPOINTS.PAR;
    }
    else if (strokes === par + 1) {
      return STABLEFORDPOINTS.BOGEY;
    }
    else if (strokes >= par + 2) {
      return STABLEFORDPOINTS.DOUBLEBOGEY;
    }
    else if (strokes >= par + 3) {
      return STABLEFORDPOINTS.TRIPLEBOGEY;
    }
    else if (strokes >= par + 4) {
      return STABLEFORDPOINTS.QUADRUPLEBOGEY;
    }
    else if (strokes === par - 1) {
      return STABLEFORDPOINTS.BIRDIE;
    }
    else if (strokes === par - 2) {
      return STABLEFORDPOINTS.EAGLE;
    }
    else if (strokes === par - 3) {
      return STABLEFORDPOINTS.ALBATROSS;
    }
  }
}

// FIXME: this is NOT USED??
export function calculation(completeHole: any) {
  const { puttsLength } = completeHole;
  let puttsUnder2 = 0;
  let putts2_4 = 0;
  let putts4_6 = 0;
  let putts6_10 = 0;
  let puttsOver10 = 0;
  let upDownX = 0;
  let upDownN = 0;
  let upDownE = 0;
  let greenMetersOver100 = 0;
  let greenMeters80_100 = 0;
  let greenMeters60_80 = 0;
  let greenMetersUnder60 = 0;
  let scramble = 0;

  // PUTTS
  for (let i = 0; i < puttsLength.length; i++) {
    (Number(puttsLength[i]) <= 2) && puttsUnder2++;
    (Number(puttsLength[i]) > 2 && Number(puttsLength[i]) <= 4) && putts2_4++;
    (Number(puttsLength[i]) > 4 && Number(puttsLength[i]) <= 6) && putts4_6++;
    (Number(puttsLength[i]) > 6 && Number(puttsLength[i]) <= 10) && putts6_10++;
    (Number(puttsLength[i]) > 10) && puttsOver10++;
  };

  //UP & DOWN
  (completeHole.upDown === 'x') && upDownX++;
  (completeHole.upDown === 'n') && upDownN++;
  (completeHole.upDown === '') && upDownE++;

  scramble = completeHole.scramble;

  // GREEN METERS
  (completeHole.toGreenMeters >= 100) && greenMetersOver100++;
  (completeHole.toGreenMeters <= 100 && completeHole.toGreenMeters > 80) && greenMeters80_100++;
  (completeHole.toGreenMeters <= 80 && completeHole.toGreenMeters > 60) && greenMeters60_80++;
  (completeHole.toGreenMeters <= 60) && greenMetersUnder60++;

  const finalValues = {
    puttsUnder2: puttsUnder2,
    putts2_4: putts2_4,
    putts4_6: putts4_6,
    putts6_10: putts6_10,
    puttsOver10: puttsOver10,
    upDownX: upDownX,
    upDownN: upDownN,
    upDownE: upDownE,
    greenMetersOver100: greenMetersOver100,
    greenMeters80_100: greenMeters80_100,
    greenMeters60_80: greenMeters60_80,
    greenMetersUnder60: greenMetersUnder60,
    scramble: scramble,
  }
  return finalValues;
}

export const correctVsParString = (score: IRoundScoreTotalsAvg) => {

  let correctScore = '';
  let correctScoreIN = '';
  let correctScoreOUT = '';

  if (score.vsPar === 0) {
    correctScore = score.vsPar.toString();
  }
  else {
    if (score.vsPar < 0) {
      correctScore = `${score.vsPar}`;
    }
    else { correctScore = `+${score.vsPar}`; }
  }
  if (score.vsParIN === 0) {
    correctScoreIN = score.vsParIN.toString();
  }
  else {
    if (score.vsParIN < 0) {
      correctScoreIN = `${score.vsParIN}`;
    }
    else { correctScoreIN = `+${score.vsParIN}`; }
  }
  if (score.vsParOUT === 0) {
    correctScoreOUT = score.vsParOUT.toString();
  }
  else {
    if (score.vsParOUT < 0) {
      correctScoreOUT = `${score.vsParOUT}`;
    }
    else { correctScoreOUT = `+${score.vsParOUT}`; }
  }

  return {
    correctScore: correctScore,
    correctScoreIN: correctScoreIN,
    correctScoreOUT: correctScoreOUT,
  }
}

export const calculatePuttLengthCounts = (puttsLength: (string | number)[] = []): PuttLengthCounts => {
  const counts: PuttLengthCounts = {
    puttsUnder2: 0,
    putts2_4: 0,
    putts4_6: 0,
    putts6_10: 0,
    puttsOver10: 0,
  };
  puttsLength.forEach(len => {
    const length = Number(len); // Consider adding error handling if len might not be numeric
    if (isNaN(length)) return; // Skip non-numeric values

    if (length <= PUTT_LENGTH_THRESHOLDS.SHORT) counts.puttsUnder2++;
    else if (length <= PUTT_LENGTH_THRESHOLDS.MEDIUM) counts.putts2_4++;
    else if (length <= PUTT_LENGTH_THRESHOLDS.LONG) counts.putts4_6++;
    else if (length <= PUTT_LENGTH_THRESHOLDS.VERY_LONG) counts.putts6_10++;
    else counts.puttsOver10++;
  });
  return counts;
};

export const calculateGreenApproachCounts = (toGreenMeters: number = 0): GreenApproachDistanceCounts => {
  const counts: GreenApproachDistanceCounts = {
    toGreenMetersOver100: 0,
    toGreenMeters80_100: 0,
    toGreenMeters60_80: 0,
    toGreenMetersUnder60: 0,
  };
  if (toGreenMeters >= GREEN_APPROACH_THRESHOLDS.FAR) counts.toGreenMetersOver100++;
  else if (toGreenMeters > GREEN_APPROACH_THRESHOLDS.MID) counts.toGreenMeters80_100++;
  else if (toGreenMeters > GREEN_APPROACH_THRESHOLDS.NEAR) counts.toGreenMeters60_80++;
  else if (toGreenMeters > 0) counts.toGreenMetersUnder60++; // Only count if > 0
  return counts;
};