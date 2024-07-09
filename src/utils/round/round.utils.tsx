import { INewRound } from "../../types/round.types";
import { IShots } from "../../types/roundData.types";
import _ from 'lodash';


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
    teeClub,
    fir,
    gir,
    putts,
    sand,
    water,
    out } = hole;


  console.log("---> ", hole)
  if (
    holeNumber
    && distance
    && hcp
    && par
    && strokes
    && teeClub
    && fir
    && gir
    && putts
    && !_.isNull(sand)
    && !_.isNull(water)
    && !_.isNull(out)
  ) return true
  else return false
}