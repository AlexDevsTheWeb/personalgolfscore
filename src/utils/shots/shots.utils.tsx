import { STABLEFORDPOINTS, STABLEFORDSTARS } from "../../enum/shots.enum";
import { IStablefordPointsProps } from "../../types/point.types";

export const calculateStablefordPoints = (props: IStablefordPointsProps) => {
  const { hcp, par, strokes, finalPlayerHCP, totalHoles } = props;
  let newPar = par;
  const diff = finalPlayerHCP - totalHoles;
  console.log(finalPlayerHCP, "- ", totalHoles)
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
  console.log(diff, ",", newPar)
  return calculatePoints(newPar, strokes);
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