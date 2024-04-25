import { INewRound } from "../../types/round.types";

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