interface IProps {
  hcp: number;
  par: number;
  strokes: number;
  totalHoles: number;
  finalPlayerHCP: number
}
enum STABLEFORDPOINTS {
  ALBATROSS = 5,
  EAGLE = 4,
  BIRDIE = 3,
  PAR = 2,
  BOGEY = 1,
  DOUBLEBOGEY = 0,
}
enum STABLEFORDSTARS {
  ZERO = '',
  ONE = '*',
  TWO = '**',
  THREE = '***',
}

export const calculateStablefordPoints = (props: IProps) => {
  const { hcp, par, strokes, finalPlayerHCP, totalHoles } = props;
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
  return calculatePoints(newPar, strokes);
}

export const calculateStablefordStars = (props: IProps) => {
  const { hcp, par, strokes, finalPlayerHCP, totalHoles } = props;
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