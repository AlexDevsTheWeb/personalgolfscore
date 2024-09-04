import { IShots } from "../../types/roundData.types";
import { IPuttsStatistics } from "../../types/roundTotals.types";
import { initialPuttsStatistics } from "../constant.utils";

export const calculatePuttsStatistics = (shots: IShots[]) => {
  const result: IPuttsStatistics = initialPuttsStatistics;

  // PUTTS HOLED: quanti ONE PUTT ho inbucato che cadevano nell'intervallo
  // (putts[0] cade nell'intervallo) && (putts[0].length === 1)
  const puttsHoledU2M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && Number(curr.puttsLength[0]) <= 2) ? 1 : 0), 0);
  const puttsHoled24M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && (Number(curr.puttsLength[0]) > 2 && Number(curr.puttsLength[0]) <= 4)) ? 1 : 0
  ), 0);
  const puttsHoled46M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && (Number(curr.puttsLength[0]) > 4 && Number(curr.puttsLength[0]) <= 6)) ? 1 : 0
  ), 0);
  const puttsHoled610M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && (Number(curr.puttsLength[0]) > 6 && Number(curr.puttsLength[0]) <= 10)) ? 1 : 0
  ), 0);
  const puttsHoledO10 = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && Number(curr.puttsLength[0]) > 10) ? 1 : 0), 0);
  // --------------------------------------------------------------------------

  // ATTEMPTS: quanti putts  hai fatto quando il primo putt era nell'intervallo
  // (putt[0] cade nell'intervallo).length
  const puttsAttemptsU2M = shots.reduce((acc, curr) => acc + ((Number(curr.puttsLength[0]) <= 2) ? 1 : 0), 0);
  const puttsAttempts24M = shots.reduce((acc, curr) => acc + (((Number(curr.puttsLength[0]) > 2 && Number(curr.puttsLength[0]) <= 4)) ? 1 : 0), 0);
  const puttsAttempts46M = shots.reduce((acc, curr) => acc + (((Number(curr.puttsLength[0]) > 4 && Number(curr.puttsLength[0]) <= 6)) ? 1 : 0), 0);
  const puttsAttempts610M = shots.reduce((acc, curr) => acc + (((Number(curr.puttsLength[0]) > 6 && Number(curr.puttsLength[0]) <= 10)) ? 1 : 0), 0);
  const puttsAttemptsO10M = shots.reduce((acc, curr) => acc + ((Number(curr.puttsLength[0]) > 10) ? 1 : 0), 0);
  // ------------------------------------------------------------------------------------------------

  const puttsDoneU2M = shots.reduce((acc, curr) => acc + ((Number(curr.puttsLength[0]) <= 2) ? curr.puttsLength.length : 0), 0);
  const puttsDone24M = shots.reduce((acc, curr) => acc + (((Number(curr.puttsLength[0]) > 2 && Number(curr.puttsLength[0]) <= 4)) ? curr.puttsLength.length : 0), 0);
  const puttsDone46M = shots.reduce((acc, curr) => acc + (((Number(curr.puttsLength[0]) > 4 && Number(curr.puttsLength[0]) <= 6)) ? curr.puttsLength.length : 0), 0);
  const puttsDone610M = shots.reduce((acc, curr) => acc + (((Number(curr.puttsLength[0]) > 6 && Number(curr.puttsLength[0]) <= 10)) ? curr.puttsLength.length : 0), 0);
  const puttsDoneO10M = shots.reduce((acc, curr) => acc + ((Number(curr.puttsLength[0]) > 10) ? curr.puttsLength.length : 0), 0);

  console.log("DONE: ", puttsDone46M);
  console.log("ATTE: ", puttsAttempts46M);
  const puttsAverageU2M = parseFloat((puttsDoneU2M / puttsAttemptsU2M).toFixed(2));
  const puttsAverage24M = parseFloat((puttsDone24M / puttsAttempts24M).toFixed(2));
  const puttsAverage46M = parseFloat((puttsDone46M / puttsAttempts46M).toFixed(2));
  const puttsAverage610M = parseFloat((puttsDone610M / puttsAttempts610M).toFixed(2));
  const puttsAverageO10M = parseFloat((puttsDoneO10M / puttsAttemptsO10M).toFixed(2));



  // for (let i = 0; i < shots.length; i++) {
  //   const puttsDone = shots[i].putts;


  //   const puttsPerHole = shots[i].puttsLength.length - 1;
  //   const firstPuttLength = Number(shots[i].puttsLength[0]);
  //   const puttsLengthPerHole = Number(shots[i].puttsLength[puttsPerHole]);


  //   if (firstPuttLength <= 2) {
  //     puttsAttemptsU2M = puttsAttemptsU2M + 1;
  //     puttsAverageU2M = parseFloat((puttsDone / puttsAttemptsU2M).toFixed(2));
  //   }
  //   if (firstPuttLength > 2 && firstPuttLength <= 4) {
  //     puttsAttempts24M = puttsAttempts24M + 1;
  //     puttsAverage24M = parseFloat((puttsDone / puttsAttempts24M).toFixed(2));
  //   }


  //   if (firstPuttLength > 4 && firstPuttLength <= 6) {
  //     puttsAttempts46M = puttsAttempts46M + 1;
  //     console.log(puttsDone, "/", puttsAttempts46M);
  //     puttsAverage46M = parseFloat((puttsDone / puttsAttempts46M).toFixed(2));
  //   }




  //   if (firstPuttLength > 6 && firstPuttLength <= 10) {
  //     puttsAttempts610M = puttsAttempts610M + 1;
  //     puttsAverage610M = parseFloat((puttsDone / puttsAttempts610M).toFixed(2));
  //   }
  //   if (firstPuttLength > 10) {
  //     puttsAttemptsO10 = puttsAttemptsO10 + 1;
  //     puttsAverageO10M = parseFloat((puttsDone / puttsAttemptsO10).toFixed(2));
  //   }
  // }

  const finalResult = {
    ...result,
    puttsU2M: {
      puttsHoled: puttsHoledU2M,
      puttsAttempts: puttsAttemptsU2M,
      puttsAverage: puttsAverageU2M,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    putts24M: {
      puttsHoled: puttsHoled24M,
      puttsAttempts: puttsAttempts24M,
      puttsAverage: puttsAverage24M,
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
      puttsAttempts: puttsAttempts610M,
      puttsAverage: puttsAverage610M,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
    puttsO10M: {
      puttsHoled: puttsHoledO10,
      puttsAttempts: puttsAttemptsO10M,
      puttsAverage: puttsAverageO10M,
      puttsSecondoAverageLength: 0,
      puttsAverageDistance: 0,
      putts3: 0,
    },
  }

  console.log("FINALE result: ", finalResult);
  return finalResult;
}