import { IShots } from "@/types/roundData.types";
import { safeDivide, safePercentage } from "../calculator/math.utils";
import {
  initialFwAndIronsStatistics,
  initialInside100MtStatistics,
  initialPitchChipStatistics,
  initialPuttsStatistics,
  initialTeeShotsStatistics
} from "../constant.utils";
import { iAmintheZone, isTheRightClub, isTheRightClubChip, isTheRightClubFw } from "./totalsGenFunc.utils";

export const calculatePuttsStatistics = (shots: IShots[]) => {

  const calculatePutts = (start: number, finish: number) => {

    return shots.reduce((acc, curr) => {
      const isWithinRange = iAmintheZone(start, finish, curr.puttsLength[0]);

      acc.puttsHoled += (isWithinRange && curr.puttsLength.length === 1) ? 1 : 0;
      acc.puttsAttempts += isWithinRange ? 1 : 0;
      acc.numberPuttsInRange += isWithinRange ? curr.puttsLength.length : 0;
      acc.distanceSecondPutt += (isWithinRange && curr.puttsLength.length > 1) ? curr.puttsLength[1] : 0;
      acc.numberSecondPutt += (isWithinRange && curr.puttsLength.length > 1) ? 1 : 0;
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
        puttsAverage: safeDivide(object.numberPuttsInRange, object.puttsAttempts),
        puttsSecondAverageLength: safeDivide(object.distanceSecondPutt, object.numberSecondPutt),
        puttsAverageDistance: safeDivide(object.distanceFirstPutt, object.puttsAttempts),
        putt1Perc: safePercentage(object.puttsHoled, object.puttsAttempts),
        putt3Perc: safePercentage(object.putts3, object.puttsAttempts),
      }
    )
  }

  const calculatePuttsOverall = (shots: IShots[]) => {
    return shots.reduce((acc, curr) => {
      acc.totalPutts += curr.puttsLength.length;
      acc.gir += curr.gir === true ? 1 : 0;
      acc.totalPuttsInGIR += curr.gir === true ? curr.puttsLength.length : 0;
      acc.birdieBetter += curr.strokes < curr.par ? 1 : 0;
      acc.threePutts += curr.puttsLength.length >= 3 ? 1 : 0;
      return acc;
    }, {
      totalPutts: 0,
      gir: 0,
      totalPuttsInGIR: 0,
      birdieBetter: 0,
      threePutts: 0,
    });
  }

  const createOverallObject = (object: any) => {
    return (
      {
        ...object,
        puttsInGIR: safeDivide(object.totalPuttsInGIR, object.gir),
        birdieConversion: safePercentage(object.birdieBetter, object.gir),
      }
    )
  }

  const finalResult = {
    ...initialPuttsStatistics,
    _puttsOverall: createOverallObject(calculatePuttsOverall(shots)),
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
        averageDistance: safeDivide(object.totDistance, object.attempts),
        fairwayCenterPCT: safePercentage(object.fairwayHits, object.attempts),
        fairwayLeftPCT: safePercentage(object.missLeft, object.attempts),
        fairwayRightPCT: safePercentage(object.missRight, object.attempts),
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
      acc.upDownMade += (rightClub && curr.upDown.made === 1 ? 1 : 0);
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
        averageShots: safeDivide(array.totalsForAverageShots, array.attempts),
        averageHoleDistanceShot: safeDivide(array.totalsForAvgDistanceToHole, array.totalsDistanceNumber),
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

export const calculateInside100mtStatistics = (shots: IShots[]) => {

  const calculateInside100 = (start: number, finish: number) => {
    return shots.reduce((acc, curr) => {

      const isWithinRange = iAmintheZone(start, finish, curr.toGreenMeters);

      acc.greenHits += (isWithinRange && !!curr.gir) ? 1 : 0;
      acc.attempts += (isWithinRange) ? 1 : 0;

      acc.shotsPar4 += (isWithinRange && curr.par === 4) ? curr.strokes : 0;
      acc.shotsPar5 += (isWithinRange && curr.par === 5) ? curr.strokes : 0;
      acc.countShotsPar4 += (isWithinRange && curr.par === 4) ? 1 : 0;
      acc.countShotsPar5 += (isWithinRange && curr.par === 5) ? 1 : 0;
      acc.toGreen += (isWithinRange ? 1 : 0);

      acc.totalDistGIR += (isWithinRange && !!curr.gir) ? curr.puttsLength[0] : 0;

      acc.missedLeft += (isWithinRange && !curr.gir && curr.greenSideL === 1) ? 1 : 0;
      acc.missedRight += (isWithinRange && !curr.gir && curr.greenSideR === 1) ? 1 : 0;
      acc.missedShort += (isWithinRange && !curr.gir && curr.greenSideS === 1) ? 1 : 0;
      acc.missedOver += (isWithinRange && !curr.gir && curr.greenSideO === 1) ? 1 : 0;

      return acc;
    }, {
      greenHits: 0,
      attempts: 0,
      shotsPar4: 0,
      shotsPar5: 0,
      countShotsPar4: 0,
      countShotsPar5: 0,
      toGreen: 0,
      totalDistGIR: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedOver: 0
    });
  };

  const results = [
    calculateInside100(0, 100),
    calculateInside100(100, 81),
    calculateInside100(80, 61),
    calculateInside100(60, 0),
  ];

  const createFinalObject = (object: any) => {
    return (
      {
        ...object,
        averageShots: safeDivide(((object.shotsPar4 - object.countShotsPar4) + (object.shotsPar5 - object.countShotsPar5 * 2)), object.toGreen),
        averageDistGIR: safeDivide(object.totalDistGIR, object.greenHits),
      }
    )
  }

  const finalResult = {
    ...initialInside100MtStatistics,
    over100: createFinalObject(results[0]), // Changed key from over100mt to over100
    inside10081: createFinalObject(results[1]),
    inside8061: createFinalObject(results[2]),
    inside60: createFinalObject(results[3]),
  }

  return finalResult;

}

export const calculateFWIrons = (shots: IShots[]) => {

  const reduceFWIronsStatsByCategory = (clubCategoryIdentifier: string) => { // Renamed inner function
    return shots.reduce((acc, curr) => {
      const isTheRightClub = isTheRightClubFw(clubCategoryIdentifier, curr.toGreen);
      // const gir2 = (curr.par + curr.putts - curr.strokes) < 3 ? true : false;

      acc.greenHits += (isTheRightClub && !!curr.gir) ? 1 : 0;
      acc.attempts += isTheRightClub ? 1 : 0;

      acc.totalScorePar3 += (isTheRightClub && curr.par === 3) ? curr.strokes : 0;
      acc.totalScorePar4 += (isTheRightClub && curr.par === 4) ? curr.strokes : 0;
      acc.totalScorePar5 += (isTheRightClub && curr.par === 5) ? curr.strokes : 0;
      acc.totalNumberPar4 += (isTheRightClub && curr.par === 4) ? 1 : 0;
      acc.totalNumberPar5 += (isTheRightClub && curr.par === 5) ? 1 : 0;

      acc.totalDistanceGIR += (isTheRightClub && !!curr.gir) ? curr.puttsLength[0] : 0;
      acc.totalGirGir2Made += (isTheRightClub && !!curr.gir) ? 1 : 0;

      acc.missedLeft += (isTheRightClub && !curr.gir && curr.greenSideL === 1) ? 1 : 0
      acc.missedRight += (isTheRightClub && !curr.gir && curr.greenSideR === 1) ? 1 : 0
      acc.missedShort += (isTheRightClub && !curr.gir && curr.greenSideS === 1) ? 1 : 0
      acc.missedOver += (isTheRightClub && !curr.gir && curr.greenSideO === 1) ? 1 : 0

      return acc;
    }, {
      greenHits: 0,
      attempts: 0,

      totalScorePar3: 0,
      totalScorePar4: 0,
      totalNumberPar4: 0,
      totalScorePar5: 0,
      totalNumberPar5: 0,

      totalDistanceGIR: 0,
      totalGirGir2Made: 0,
      missedLeft: 0,
      missedRight: 0,
      missedShort: 0,
      missedOver: 0
    });
  };

  const results = [
    reduceFWIronsStatsByCategory('FW'),         // For Fairway Woods
    reduceFWIronsStatsByCategory('HY'),         // For Hybrids
    reduceFWIronsStatsByCategory('LONG_IRON'),  // For Long Irons (4-6)
    reduceFWIronsStatsByCategory('MID_IRON'),   // For Mid Irons (7-9)
  ];

  const createFinalObject = (object: any) => {
    return (
      {
        ...object,
        averageShots: safeDivide((object.totalScorePar3 + object.totalScorePar4 - object.totalNumberPar4 + object.totalScorePar5 - object.totalNumberPar5 * 2), object.attempts),
        averageDistGIR: safeDivide(object.totalDistanceGIR, object.totalGirGir2Made),
      }
    )
  }

  const finalResult = {
    ...initialFwAndIronsStatistics,
    fwFW: createFinalObject(results[0]),
    fwHY: createFinalObject(results[1]),
    fwLongIron: createFinalObject(results[2]),
    fwMidIron: createFinalObject(results[3]),
  }

  return finalResult;
}