import { IShots } from "../../types/roundData.types";
import { initialPitchChipStatistics, initialPuttsStatistics, initialTeeShotsStatistics } from "../constant.utils";
import { divide, iAmintheZone, isTheRightClub, isTheRightClubChip } from "./totalsGenFunc.utils";

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

  const createFinalObject = (object: any) => {
    return (
      {
        ...object,
        puttsAverage: parseFloat(divide(object.numberPuttsInRange, object.puttsAttempts).toFixed(2)),
        puttsSecondAverageLength: parseFloat(divide(object.distanceSecondPutt, object.numberSecondPutt).toFixed(2)),
        puttsAverageDistance: parseFloat(divide(object.distanceFirstPutt, object.puttsAttempts).toFixed(2)),
        putt1Perc: parseFloat(divide(object.puttsHoled, object.puttsAttempts).toFixed(2)),
        putt3Perc: parseFloat(divide(object.putts3, object.puttsAttempts).toFixed(2)),
      }
    )
  }

  const finalResult = {
    ...initialPuttsStatistics,
    puttsU2M: createFinalObject(results[0]),
    putts24M: createFinalObject(results[1]),
    putts46M: createFinalObject(results[2]),
    putts610M: createFinalObject(results[3]),
    puttsO10M: createFinalObject(results[4]),
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

  const createFinalObject = (object: any) => {
    return (
      {
        ...object,
        averageDistance: object.attempts !== 0 ? parseFloat(divide(object.totDistance, object.attempts).toFixed(2)) : 0,
        fairwayCenterPCT: object.attempts !== 0 ? parseFloat(divide(object.fairwayHits, object.attempts).toFixed(2)) : 0,
        fairwayLeftPCT: object.attempts !== 0 ? parseFloat(divide(object.missLeft, object.attempts).toFixed(2)) : 0,
        fairwayRightPCT: object.attempts !== 0 ? parseFloat(divide(object.missRight, object.attempts).toFixed(2)) : 0,
      }
    )
  }

  const finalResult = {
    ...initialTeeShotsStatistics,
    teeDriver: createFinalObject(results[0]),
    teeFW: createFinalObject(results[1]),
    teeHY: createFinalObject(results[2]),
    teeIron: createFinalObject(results[3]),
  };

  return finalResult;

}

export const calculateChippingPitchingStatistics = (shots: IShots[]) => {
  const calculateChippingPitching = (club: string) => {
    return shots.reduce((acc, curr) => {

      const rightClub = isTheRightClubChip(club, curr.chipClub);

      acc.shots = curr.strokes - curr.par + 2;
      acc.extraChip = acc.shots - curr.putts - 1;
      acc.distance = acc.extraChip === 1 ? 0 : curr.puttsLength[0];
      acc.totalsDistanceNumber += acc.extraChip === 1 ? 0 : 1;
      acc.upDownMade += (rightClub && curr.upDownX === 1 ? 1 : 0);
      acc.attempts += (rightClub ? 1 : 0);
      acc.totalsForAverageShots += (rightClub ? acc.shots : 0);
      acc.totalsForAvgDistanceToHole += ((rightClub && acc.extraChip === 0) ? acc.distance : 0);
      acc.shotsHoled += ((acc.attempts !== 0 && rightClub && acc.shots === 1) ? 1 : 0);
      acc.totalsForGreenMissed += ((rightClub && acc.extraChip === 0) ? 1 : 0);

      acc.greenMissed = acc.attempts - acc.totalsForGreenMissed;

      return acc;
    }, {
      shots: 0,
      extraChip: 0,
      distance: 0,
      totalsDistanceNumber: 0,
      upDownMade: 0,
      attempts: 0,
      totalsForAverageShots: 0,
      totalsForAvgDistanceToHole: 0,
      shotsHoled: 0,
      totalsForGreenMissed: 0,
      greenMissed: 0
    });
  };
  const results = [
    calculateChippingPitching('Pitch Wedge'),
    calculateChippingPitching('Gap Wedge'),
    calculateChippingPitching('Sand Wedge'),
    calculateChippingPitching('Lob Wedge'),
    calculateChippingPitching('B'),
    calculateChippingPitching('CHIP'),
    calculateChippingPitching('PUTT')
  ];

  const createFinalObject = (array: any) => {
    return (
      {
        ...array,
        averageShots: array.attempts !== 0 ? parseFloat(divide(array.totalsForAverageShots, array.attempts).toFixed(2)) : 0,
        averageHoleDistanceShot: array.attempts !== 0 ? parseFloat(divide(array.totalsforAvgDistanceToHole, array.totalsDistanceNumber).toFixed(2)) : 0,
      }
    )
  }

  const finalResult = {
    ...initialPitchChipStatistics,
    pw: createFinalObject(results[0]),
    lw: createFinalObject(results[1]),
    sw: createFinalObject(results[2]),
    gw: createFinalObject(results[3]),
    b: createFinalObject(results[4]),
    chip: createFinalObject(results[5]),
    putt: createFinalObject(results[6]),

  };

  return finalResult;
}