import { IShots } from "../../types/roundData.types";
import { IPuttsStatistics } from "../../types/roundTotals.types";
import { initialPuttsStatistics } from "../constant.utils";

export const calculatePuttsStatistics = (shots: IShots[]) => {
  const result: IPuttsStatistics = initialPuttsStatistics;
  let puttsHoledU2M = 0;
  let puttsHoled24M = 0;
  let puttsHoled46M = 0;
  let puttsHoled610M = 0;
  let puttsHoledO10 = 0;
  let puttsAttempsU2M = 0;
  let puttsAttempts24M = 0;
  let puttsAttempts46M = 0;
  let puttsAttempts610M = 0;
  let puttsAttemptsO10 = 0;

  for (let i = 0; i < shots.length; i++) {
    const puttsDone = shots[i].putts;

    if (puttsDone === 1) {
      if (shots[i].puttsLength[1] <= 2) {
        puttsHoledU2M++;
      }
      if (shots[i].puttsLength[1] > 2 && shots[i].puttsLength[1] <= 4) {
        puttsHoled24M++;
      }
      if (shots[i].puttsLength[1] > 4 && shots[i].puttsLength[1] <= 6) {
        puttsHoled46M++;
      }
      if (shots[i].puttsLength[1] > 6 && shots[i].puttsLength[1] <= 10) {
        puttsHoled610M++;
      }
      if (shots[i].puttsLength[1] > 10) {
        puttsHoledO10++;
      }
    }

    if (shots[i].puttsLength[0] <= 2) {
      puttsAttempsU2M = puttsAttempsU2M + 1;
      // result.puttsU2M.puttsAverage = parseFloat((puttsDone / puttsAttempsU2M).toFixed(2));
    }
    if (shots[i].puttsLength[0] > 2 && shots[i].puttsLength[0] <= 4) {
      puttsAttempts24M = puttsAttempts24M + 1;
      // result.putts24M.puttsAverage = parseFloat((puttsDone / puttsAttempts24M).toFixed(2));
    }
    if (shots[i].puttsLength[0] > 4 && shots[i].puttsLength[0] <= 6) {
      puttsAttempts46M = puttsAttempts46M + 1;
      // result.putts46M.puttsAverage = parseFloat((puttsDone / puttsAttempts46M).toFixed(2));
    }
    if (shots[i].puttsLength[0] > 6 && shots[i].puttsLength[0] <= 10) {
      puttsAttempts610M = puttsAttempts610M + 1;
      // result.putts610M.puttsAverage = parseFloat((puttsDone / puttsAttempts610M).toFixed(2));
    }
    if (shots[i].puttsLength[0] > 10) {
      puttsAttemptsO10 = puttsAttemptsO10 + 1;
      // result.puttsO10M.puttsAverage = parseFloat((puttsDone / puttsAttemptsO10).toFixed(2));
    }
  }

  const finalResult = {
    ...result,
    puttsU2M: {
      puttsHoled: puttsHoledU2M,
      puttsAttempts: puttsAttempsU2M,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    putts24M: {
      puttsHoled: puttsHoled24M,
      puttsAttempts: puttsAttempts24M,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    putts46M: {
      puttsHoled: puttsHoled46M,
      puttsAttempts: puttsAttempts46M,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    putts610M: {
      puttsHoled: 0,
      puttsAttempts: 0,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    puttsO10M: {
      puttsHoled: 0,
      puttsAttempts: 0,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
  }
  return finalResult;
}