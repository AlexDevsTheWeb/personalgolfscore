import { STABLEFORDPOINTS, STABLEFORDSTARS } from "../../enum/shots.enum";
import { IGirProps, IStablefordPointsProps, IUDProps } from "../../types/point.types";
import { IShots } from "../../types/roundData.types";
import { IShotsTotals } from "../../types/roundTotals.types";

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
  const { girValue, chipClub, parValue, strokesValue, chipClubs } = props;
  let result = '';
  if (chipClub !== '') {
    if (girValue === 1) {
      result = '';
    }
    const validClub = chipClubs.filter((club: string) => club === chipClub);
    if (validClub.length > 0) {
      if (parValue === strokesValue) {
        result = 'x';
      }
      else {
        result = 'n';
      }
    }
    else {
      result = '';
    }
  }
  return result;
}

// export const calculateStablefordStars = (props: IStablefordPointsProps) => {
//   const { hcp, par, finalPlayerHCP, totalHoles } = props;
//   let newPar = par;
//   const diff = finalPlayerHCP - totalHoles;
//   if (diff === 0) {
//     newPar = newPar + 1
//   }
//   else if (diff < 0) {
//     if (hcp <= diff) {
//       newPar = newPar + 1;
//     }
//   }
//   else if (diff > 0) {
//     newPar = newPar + 1;
//     if (hcp <= diff) {
//       newPar = newPar + 1;
//     }
//   }
//   return calculateStars(newPar, par);
// }

export const calculatePoints = (par: number, strokes: number) => {
  if (strokes === par) {
    return STABLEFORDPOINTS.PAR;
  }
  else if (strokes === par + 1) {
    return STABLEFORDPOINTS.BOGEY;
  }
  else if (strokes >= par + 2) {
    return STABLEFORDPOINTS.DOUBLEBOGEY;
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

export const calculateStars = (par: number, strokes: number) => {
  const diff = par - strokes;

  switch (diff) {
    case 0:
      return STABLEFORDSTARS.ZERO;
    case 1:
      return STABLEFORDSTARS.ONE;
    case 2:
      return STABLEFORDSTARS.TWO;
    case 3:
      return STABLEFORDSTARS.THREE;
    default:
      return STABLEFORDSTARS.ZERO;
  }

}

export const newRoundTotals = (totals: IShots[]) => {
  const newTotals = totals.reduce((acc: IShots, total: IShots) => {
    acc.distance += Number(total.distance);
    acc.putts += Number(total.putts / totals.length)
    return acc;
  }, {
    holeNumber: 0,
    chipClub: '',
    distance: 0,
    driveDistance: 0,
    fairway: "",
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
    upDown: '',
    upDownX: 0,
    upDownN: 0,
    upDownE: 0,
    water: 0
  })

  return newTotals
}

export function calculateTotals(totalsData: IShotsTotals[], holes?: number): IShotsTotals {
  let searchableData;

  if (holes === 9 || holes === 18) {
    searchableData = totalsData.filter((data) => data.holeNumber === holes);
  }
  else {
    searchableData = totalsData;
  }
  return searchableData.reduce((acc: IShotsTotals, total: IShotsTotals) => {
    acc.roundID += total.roundID || "";
    acc.holeNumber += total.holeNumber || 0;
    acc.distance += total.distance || 0;
    acc.hcp += total.hcp || 0;
    acc.par += total.par || 0;
    acc.strokes += total.strokes || 0;
    acc.points += total.points || 0;
    acc.teeClub += total.teeClub || '';
    acc.fir += total.fir || 0;
    acc.left += total.left || 0;
    acc.right += total.right || 0;
    acc.gir += total.gir || 0;
    acc.putts += total.putts || 0;
    acc.sand += total.sand || 0;
    acc.water += total.water || 0;
    acc.out += total.out || 0;

    return acc;
  }, {
    roundID: "",
    holeNumber: 0,
    distance: 0,
    hcp: 0,
    par: 0,
    strokes: 0,
    points: 0,
    teeClub: '',
    fir: 0,
    left: 0,
    right: 0,
    gir: 0,
    putts: 0,
    sand: 0,
    water: 0,
    out: 0
  });
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
  }
  return finalValues;
}