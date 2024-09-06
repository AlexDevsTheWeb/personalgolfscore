import { IShots } from "../../types/roundData.types";
import { initialPuttsStatistics } from "../constant.utils";
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

  console.log("---> ", results)
  const finalResult = {
    ...initialPuttsStatistics,
    puttsU2M: {
      ...results[0],
      puttsAverage: parseFloat(divide(results[0].numberPuttsInRange, results[0].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[0].distanceSecondPutt, results[0].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[0].distanceFirstPutt, results[0].puttsAttempts).toFixed(2)),
    },
    putts24M: {
      ...results[1],
      puttsAverage: parseFloat(divide(results[1].numberPuttsInRange, results[1].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[1].distanceSecondPutt, results[1].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[1].distanceFirstPutt, results[1].puttsAttempts).toFixed(2)),
    },
    putts46M: {
      ...results[2],
      puttsAverage: parseFloat(divide(results[2].numberPuttsInRange, results[2].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[2].distanceSecondPutt, results[2].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[2].distanceFirstPutt, results[2].puttsAttempts).toFixed(2)),
    },
    putts610M: {
      ...results[3],
      puttsAverage: parseFloat(divide(results[3].numberPuttsInRange, results[3].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[3].distanceSecondPutt, results[3].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[3].distanceFirstPutt, results[3].puttsAttempts).toFixed(2)),
    },
    puttsO10M: {
      ...results[4],
      puttsAverage: parseFloat(divide(results[4].numberPuttsInRange, results[4].puttsAttempts).toFixed(2)),
      puttsSecondAverageLength: parseFloat(divide(results[4].distanceSecondPutt, results[4].numberSecondPutt).toFixed(2)),
      puttsAverageDistance: parseFloat(divide(results[4].distanceFirstPutt, results[4].puttsAttempts).toFixed(2)),
    },
  };

  return finalResult;
}
