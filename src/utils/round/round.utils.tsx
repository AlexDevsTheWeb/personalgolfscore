import { INewRound } from "../../types/round.types";
import { IShots } from "../../types/roundData.types";

export const checkMainRoundDataValid = (round: INewRound) => {
  const { roundCourse, roundDate, roundHoles, roundTee, roundPar, roundPlayingHCP, roundStrokes } = round;

  if (
    roundCourse !== '' &&
    roundDate !== '' &&
    roundHoles !== 0 &&
    roundTee !== '' &&
    roundPar !== 0 &&
    roundPlayingHCP !== 0 &&
    roundStrokes !== 0
  ) return true
  else return false
}

export const checkSingleHoleValid = (hole: IShots) => {
  const { holeNumber,
    distance,
    hcp,
    par,
    strokes,
    points,
    teeClub,
    fir,
    gir,
    putts,
    sand,
    water,
    out } = hole;

  if (
    holeNumber &&
    distance &&
    hcp &&
    par &&
    strokes &&
    points &&
    teeClub &&
    fir &&
    gir &&
    putts &&
    sand &&
    water &&
    out
  ) return true
  else return false
}