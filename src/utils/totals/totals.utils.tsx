import { IShots } from "../../types/roundData.types";
import { initialPuttsStatistics, initialTeeShotsStatistics } from "../constant.utils";
import { divide, iAmintheZone } from "./totalsPutts.utils";


export const calculatePuttsStatistics = (shots: IShots[]) => {

  const calculatePutts = (start: number, finish: number) => {
    return shots.reduce((acc, curr) => {
      const isWithinRange = iAmintheZone(start, finish, curr.puttsLength[0]);

      acc.puttsHoled += (isWithinRange && curr.puttsLength.length === 1) ? 1 : 0;
      acc.puttsAttempts += isWithinRange ? 1 : 0;
      acc.numberPuttsInRange += isWithinRange ? curr.puttsLength.length : 0;
      acc.distanceSecondPutt += (isWithinRange && curr.puttsLength.length === 2) ? curr.puttsLength[1] : 0;
      acc.numberSecondPutt += (isWithinRange && curr.puttsLength.length === 2) ? 1 : 0;
      acc.distanceFirstPutt += isWithinRange ? curr.puttsLength[0] : 0;
      acc.putts3 += isWithinRange && curr.puttsLength.length >= 3 ? 1 : 0;

      return acc;
    }, {
      puttsHoled: 0,
      puttsAttempts: 0,
      numberPuttsInRange: 0,
      distanceSecondPutt: 0,
      numberSecondPutt: 0,
      distanceFirstPutt: 0,
      putts3: 0,
    });
  };

  const results = [
    calculatePutts(2, 0),
    calculatePutts(2, 4),
    calculatePutts(4, 6),
    calculatePutts(6, 10),
    calculatePutts(0, 10),
  ];

  const finalResult = {
    ...initialPuttsStatistics,
    puttsU2M: {
      ...results[0],
      puttsAverage: parseFloat(divide(results[0].numberPuttsInRange, results[0].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[0].distanceSecondPutt, results[0].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[0].distanceFirstPutt, results[0].puttsAttempts).toFixed(2)),
      putt1Perc: parseFloat(divide(results[0].puttsHoled, results[0].puttsAttempts).toFixed(2)),
      putt3Perc: parseFloat(divide(results[0].putts3, results[0].puttsAttempts).toFixed(2)),
    },
    putts24M: {
      ...results[1],
      puttsAverage: parseFloat(divide(results[1].numberPuttsInRange, results[1].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[1].distanceSecondPutt, results[1].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[1].distanceFirstPutt, results[1].puttsAttempts).toFixed(2)),
      putt1Perc: parseFloat(divide(results[1].puttsHoled, results[1].puttsAttempts).toFixed(2)),
      putt3Perc: parseFloat(divide(results[1].putts3, results[1].puttsAttempts).toFixed(2)),
    },
    putts46M: {
      ...results[2],
      puttsAverage: parseFloat(divide(results[2].numberPuttsInRange, results[2].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[2].distanceSecondPutt, results[2].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[2].distanceFirstPutt, results[2].puttsAttempts).toFixed(2)),
      putt1Perc: parseFloat(divide(results[2].puttsHoled, results[2].puttsAttempts).toFixed(2)),
      putt3Perc: parseFloat(divide(results[2].putts3, results[2].puttsAttempts).toFixed(2)),
    },
    putts610M: {
      ...results[3],
      puttsAverage: parseFloat(divide(results[3].numberPuttsInRange, results[3].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[3].distanceSecondPutt, results[3].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[3].distanceFirstPutt, results[3].puttsAttempts).toFixed(2)),
      putt1Perc: parseFloat(divide(results[3].puttsHoled, results[3].puttsAttempts).toFixed(2)),
      putt3Perc: parseFloat(divide(results[3].putts3, results[3].puttsAttempts).toFixed(2)),
    },
    puttsO10M: {
      ...results[4],
      puttsAverage: parseFloat(divide(results[4].numberPuttsInRange, results[4].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[4].distanceSecondPutt, results[4].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[4].distanceFirstPutt, results[4].puttsAttempts).toFixed(2)),
      putt1Perc: parseFloat(divide(results[4].puttsHoled, results[4].puttsAttempts).toFixed(2)),
      putt3Perc: parseFloat(divide(results[4].putts3, results[4].puttsAttempts).toFixed(2)),
    },
  };

  return finalResult;
}

export const calculateTeeShotsStatistics = (shots: IShots[]) => {

  const calculateTeeShots = (club: string) => {
    return shots.reduce((acc, curr) => {
      const rightClub = isTheRightClub(club, curr.teeClub);

      acc.fairwayHits += (rightClub && curr.fairway === 5 ? 1 : 0);
      acc.attempts += (rightClub ? 1 : 0);
      acc.totDistance += (rightClub ? curr.driveDistance : 0);
      acc.missLeft += (rightClub && curr.fairway === 4 ? 1 : 0);
      acc.missRight += (rightClub && curr.fairway === 6 ? 1 : 0);
      acc.noGreen += (rightClub && curr.toGreen === 'NO' ? 1 : 0);

      return acc;
    }, {
      fairwayHits: 0,
      attempts: 0,
      totDistance: 0,
      missLeft: 0,
      missRight: 0,
      noGreen: 0,
    });
  };
  const results = [
    calculateTeeShots('DRIVER'),
    calculateTeeShots('FAIRWAY WOOD'),
    calculateTeeShots('HYBRID'),
    calculateTeeShots('IRONS'),
  ];

  const finalResult = {
    ...initialTeeShotsStatistics,
    teeDriver: {
      ...results[0],
      averageDistance: results[0].attempts !== 0 ? parseFloat(divide(results[0].totDistance, results[0].attempts).toFixed(2)) : 0,
      fairwayCenterPCT: results[0].attempts !== 0 ? parseFloat(divide(results[0].fairwayHits, results[0].attempts).toFixed(2)) : 0,
      fairwayLeftPCT: results[0].attempts !== 0 ? parseFloat(divide(results[0].missLeft, results[0].attempts).toFixed(2)) : 0,
      fairwayRightPCT: results[0].attempts !== 0 ? parseFloat(divide(results[0].missRight, results[0].attempts).toFixed(2)) : 0,
    },
    teeFW: {
      ...results[1],
      averageDistance: results[1].attempts !== 0 ? parseFloat(divide(results[1].totDistance, results[1].attempts).toFixed(2)) : 0,
      fairwayCenterPCT: results[1].attempts !== 0 ? parseFloat(divide(results[1].fairwayHits, results[1].attempts).toFixed(2)) : 0,
      fairwayLeftPCT: results[1].attempts !== 0 ? parseFloat(divide(results[1].missLeft, results[1].attempts).toFixed(2)) : 0,
      fairwayRightPCT: results[1].attempts !== 0 ? parseFloat(divide(results[1].missRight, results[1].attempts).toFixed(2)) : 0,
    },
    teeHY: {
      ...results[2],
      averageDistance: results[2].attempts !== 0 ? parseFloat(divide(results[2].totDistance, results[2].attempts).toFixed(2)) : 0,
      fairwayCenterPCT: results[2].attempts !== 0 ? parseFloat(divide(results[2].fairwayHits, results[2].attempts).toFixed(2)) : 0,
      fairwayLeftPCT: results[2].attempts !== 0 ? parseFloat(divide(results[2].missLeft, results[2].attempts).toFixed(2)) : 0,
      fairwayRightPCT: results[2].attempts !== 0 ? parseFloat(divide(results[2].missRight, results[2].attempts).toFixed(2)) : 0,
    },
    teeIron: {
      ...results[3],
      averageDistance: results[3].attempts !== 0 ? parseFloat(divide(results[3].totDistance, results[3].attempts).toFixed(2)) : 0,
      fairwayCenterPCT: results[3].attempts !== 0 ? parseFloat(divide(results[3].fairwayHits, results[3].attempts).toFixed(2)) : 0,
      fairwayLeftPCT: results[3].attempts !== 0 ? parseFloat(divide(results[3].missLeft, results[3].attempts).toFixed(2)) : 0,
      fairwayRightPCT: results[3].attempts !== 0 ? parseFloat(divide(results[3].missRight, results[3].attempts).toFixed(2)) : 0,
    },
  };

  return finalResult;

}

const isTheRightClub = (wanted: string, teeClub: string) => {

  let correctClub = '';
  let isTheRightClub = false;

  switch (teeClub) {
    case 'i1':
    case 'i2':
    case 'i3':
    case 'i4':
    case 'i5':
    case 'i6':
    case 'i7':
    case 'i8':
    case 'i9':
      correctClub = 'IRONS';
      break;
    default:
      correctClub = teeClub;
      break;
  }

  isTheRightClub = wanted === correctClub
    ? true
    : correctClub.includes(wanted)
      ? true
      : false;

  return isTheRightClub;
}
