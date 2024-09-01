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
  let puttsAverageU2M = 0;
  let puttsAverage24M = 0;
  let puttsAverage46M = 0;
  let puttsAverage610M = 0;
  let puttsAverageO10 = 0;

  for (let i = 0; i < shots.length; i++) {
    const puttsDone = shots[i].putts;
    const puttsPerHole = shots[i].puttsLength.length - 1;
    const firstPuttLength = Number(shots[i].puttsLength[0]);
    const puttsLengthPerHole = Number(shots[i].puttsLength[puttsPerHole]);
    if (puttsDone === 1) {
      if (puttsLengthPerHole <= 2) {
        puttsHoledU2M = puttsHoledU2M + 1;
      }
      if (puttsLengthPerHole > 2 && puttsLengthPerHole <= 4) {
        puttsHoled24M = puttsHoled24M + 1;
      }
      if (Number(puttsLengthPerHole) > 4 && Number(puttsLengthPerHole) <= 6) {
        puttsHoled46M = puttsHoled46M + 1;
      }
      if (puttsLengthPerHole > 6 && puttsLengthPerHole <= 10) {
        puttsHoled610M = puttsHoled610M + 1;
      }
      if (puttsLengthPerHole > 10) {
        puttsHoledO10 = puttsHoledO10 + 1;
      }
    }

    if (firstPuttLength <= 2) {
      puttsAttempsU2M = puttsAttempsU2M + 1;
      // result.puttsU2M.puttsAverage = parseFloat((puttsDone / puttsAttempsU2M).toFixed(2));
    }
    if (firstPuttLength > 2 && firstPuttLength <= 4) {
      puttsAttempts24M = puttsAttempts24M + 1;
      // result.putts24M.puttsAverage = parseFloat((puttsDone / puttsAttempts24M).toFixed(2));
    }
    if (firstPuttLength > 4 && firstPuttLength <= 6) {
      puttsAttempts46M = puttsAttempts46M + 1;
      puttsAverage46M = parseFloat((puttsDone / puttsAttempts46M).toFixed(2));
    }
    if (firstPuttLength > 6 && firstPuttLength <= 10) {
      puttsAttempts610M = puttsAttempts610M + 1;
      // result.putts610M.puttsAverage = parseFloat((puttsDone / puttsAttempts610M).toFixed(2));
    }
    if (firstPuttLength > 10) {
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
      puttsAverage: puttsAverage46M,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    putts610M: {
      puttsHoled: puttsHoled610M,
      puttsAttempts: 0,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    puttsO10M: {
      puttsHoled: puttsHoledO10,
      puttsAttempts: 0,
      puttsAverage: 0,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
  }

  console.log("finalResult: ", finalResult)
  return finalResult;
}