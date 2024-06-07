import { STABLEFORDPOINTS, STABLEFORDSTARS } from "../../enum/shots.enum";
import { IStablefordPointsProps } from "../../types/point.types";
import { IShots } from "../../types/roundData.types";
import { IShotsTotals } from "../../types/roundTotals.types";

export const calculateStablefordPoints = (props: IStablefordPointsProps) => {
  const { hcp, par, strokes, finalPlayerHCP, totalHoles } = props;
  let newPar = Number(par);
  const diff = finalPlayerHCP - totalHoles;
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

export const calculateStablefordStars = (props: IStablefordPointsProps) => {
  const { hcp, par, finalPlayerHCP, totalHoles } = props;
  let newPar = par;
  const diff = finalPlayerHCP - totalHoles;
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
  return calculateStars(newPar, par);
}

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
    distance: 0,
    hcp: 0,
    par: 0,
    strokes: 0,
    points: 0,
    teeClub: '',
    fir: 0,
    gir: false,
    putts: 0,
    sand: 0,
    water: 0,
    out: 0,
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