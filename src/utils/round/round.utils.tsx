import _, { capitalize } from 'lodash';
import { CHIPCONDITION } from '../../enum/shots.enum';
import { IClub, IClubs, IGolfBag } from "../../types/clubs.types";
import { IDistance, IDistanceSingle, IShots } from '../../types/roundData.types';

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

export const getDistanceClubs = (distanceClubs: string[]) => {
  const newDistanceClubs = [...distanceClubs];
  newDistanceClubs.pop();

  return newDistanceClubs;
}

export const getGreenClubs = (teeClubs: string[]) => {
  const newTeeClubs = [...teeClubs];
  newTeeClubs.push("mt.");
  newTeeClubs.push("NO");
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

export const newRoundDisabledSelect = (name: string, tmpHole: IShots) => {
  switch (name) {
    case CHIPCONDITION.GREEN:
    case CHIPCONDITION.CHIP:
      if (tmpHole.gir) {
        return true;
      }
      else {
        return false;
      }
    case CHIPCONDITION.FAIRWAY:
      if (tmpHole.par === 3) {
        return true;
      }
      else {
        return false;
      }
    default:
      return false;
  }
}

export const createDistanceObject = (value: IDistanceSingle) => {
  let newDistance: IDistance[] = [];
  const { roundDistances, course, date, club, mt } = value;

  if (roundDistances.length === 0) {
    return [{ course, date, club, mt: [mt], avg: mt }];
  }

  const existingIndex = roundDistances.findIndex((distance) => distance.club === club);

  if (existingIndex === -1) {
    newDistance = [...roundDistances, { course: course, date: date, club: club, mt: [mt], avg: mt }];
  }
  else {
    const newClubMt = [...roundDistances[existingIndex].mt, mt];
    const newAvg = calculateAvg(newClubMt);
    newDistance = [...roundDistances, { course: course, date: date, club: club, mt: newClubMt, avg: newAvg }];
    newDistance.splice(existingIndex, 1);
  }
  return newDistance;
}

const calculateAvg = (values: number[]) => {
  let finalAvg = 0;
  const items = values.length;

  const sum = values.reduce((acc, curr) => {
    acc.total += curr;
    return acc;
  }, {
    total: 0
  });
  finalAvg = Math.floor(sum.total / items);
  return finalAvg;
}