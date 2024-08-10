import _, { capitalize } from 'lodash';
import { IClub, IClubs, IGolfBag } from "../../types/clubs.types";
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
    hcp,
    par,
    strokes,
    teeClub,
    fir,
    putts,
    sand,
    water,
    out } = hole;

  console.log("hole to save: ", hole);
  if (
    holeNumber
    && hcp
    && par
    && strokes
    && teeClub
    && fir
    && putts
    && !_.isNull(sand)
    && !_.isNull(water)
    && !_.isNull(out)
  ) return true
  else return false
}

export const getClubsNames = (clubs: IGolfBag) => {
  const clubsName = clubs.types.map((ct: IClubs) => {
    return (
      ct.details.map((c: IClub) => {
        switch (ct.typeName) {
          case "iron":
            return (`${ct.typeName.slice(0, 1).toLowerCase()}${c.clubNumber}`);
          case "wedge":
            return (`${capitalize(c.clubNumber as string)} ${ct.typeName.toUpperCase()}`);
          default:
            return (ct.typeName.toUpperCase());
        }
      })
    );
  })
  return _.flatMapDeep(clubsName);
}

export const getGreenClubs = (teeClubs: string[]) => {
  const newTeeClubs = [...teeClubs];
  newTeeClubs.push("mt.");
  newTeeClubs.shift();

  const greenTeeClubs = newTeeClubs;
  return greenTeeClubs;
}

export const getChipClubs = (teeClubs: string[]) => {
  const newChipClubs = [...teeClubs];
  newChipClubs.push("Bunker");
  newChipClubs.push("Chip");
  newChipClubs.shift();
  newChipClubs.shift();
  newChipClubs.shift();
  const chipClubs = newChipClubs;
  return chipClubs;
}