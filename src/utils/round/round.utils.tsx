import _, { capitalize } from 'lodash';
import { IClub, IClubs, IGolfBag } from "../../types/clubs.types";

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