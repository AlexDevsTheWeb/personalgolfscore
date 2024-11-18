import { STABLEFORDPOINTS } from "../../enum/shots.enum";
import { IGirProps, IScrambleProps, IStablefordPointsProps, IUDProps } from "../../types/point.types";
import { IRoundScoreTotalsAvg } from "../../types/roundTotals.types";

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
  const { par, putts, strokes, bogey } = props;
  const girDiff = par + putts - strokes;
  if (!bogey) {
    return girDiff < 2 ? false : true;
  }
  else {
    return girDiff < 1 ? false : true;
  }
}

export const calculateUDValue = (props: IUDProps) => {
  const { girValue, chipClub, parValue, numberOfPutts, strokesValue, chipClubs } = props;
  let result = { made: 0, attempts: 0 };
  if (chipClub !== '' && parValue !== 0 && strokesValue !== 0) {

    if (girValue !== 1) {

      const validClub = chipClubs.filter((club: string) => club === chipClub);

      if (validClub.length > 0) {

        if (numberOfPutts > 1) {
          result = { made: 0, attempts: 1 };
        }
        else {
          result = { made: 1, attempts: 1 };
        }
      }

    }
  }
  return result;
}

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