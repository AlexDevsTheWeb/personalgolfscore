import { IShots } from "../../types/roundData.types";
import { IPuttsStatistics } from "../../types/roundTotals.types";
import { initialPuttsStatistics } from "../constant.utils";
import { divide, iAmintheZone } from "./totalsPutts.utils";

export const calculatePuttsStatistics = (shots: IShots[]) => {
  const result: IPuttsStatistics = initialPuttsStatistics;


  const puttsHoledU2M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && iAmintheZone(2, 0, curr.puttsLength[0])) ? 1 : 0), 0);
  const puttsHoled24M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && iAmintheZone(2, 4, curr.puttsLength[0])) ? 1 : 0
  ), 0);
  const puttsHoled46M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && iAmintheZone(4, 6, curr.puttsLength[0])) ? 1 : 0
  ), 0);
  const puttsHoled610M = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && iAmintheZone(6, 10, curr.puttsLength[0])) ? 1 : 0
  ), 0);
  const puttsHoledO10 = shots.reduce((acc, curr) => acc + (
    (curr.puttsLength.length === 1 && iAmintheZone(0, 10, curr.puttsLength[0])) ? 1 : 0), 0);


  const puttsAttemptsU2M = shots.reduce((acc, curr) => acc + (iAmintheZone(2, 0, curr.puttsLength[0]) ? 1 : 0), 0);
  const puttsAttempts24M = shots.reduce((acc, curr) => acc + (iAmintheZone(2, 4, curr.puttsLength[0]) ? 1 : 0), 0);
  const puttsAttempts46M = shots.reduce((acc, curr) => acc + (iAmintheZone(4, 6, curr.puttsLength[0]) ? 1 : 0), 0);
  const puttsAttempts610M = shots.reduce((acc, curr) => acc + (iAmintheZone(6, 10, curr.puttsLength[0]) ? 1 : 0), 0);
  const puttsAttemptsO10M = shots.reduce((acc, curr) => acc + (iAmintheZone(0, 10, curr.puttsLength[0]) ? 1 : 0), 0);

  const puttsDoneU2M = shots.reduce((acc, curr) => acc + (iAmintheZone(0, 2, curr.puttsLength[0]) ? curr.puttsLength.length : 0), 0);
  const puttsDone24M = shots.reduce((acc, curr) => acc + (iAmintheZone(2, 4, curr.puttsLength[0]) ? curr.puttsLength.length : 0), 0);
  const puttsDone46M = shots.reduce((acc, curr) => acc + (iAmintheZone(4, 6, curr.puttsLength[0]) ? curr.puttsLength.length : 0), 0);
  const puttsDone610M = shots.reduce((acc, curr) => acc + (iAmintheZone(6, 10, curr.puttsLength[0]) ? curr.puttsLength.length : 0), 0);
  const puttsDoneO10M = shots.reduce((acc, curr) => acc + (iAmintheZone(0, 10, curr.puttsLength[0]) ? curr.puttsLength.length : 0), 0);

  const puttsAverageU2M = parseFloat(divide(puttsDoneU2M, puttsAttemptsU2M).toFixed(2));
  const puttsAverage24M = parseFloat(divide(puttsDone24M, puttsAttempts24M).toFixed(2));
  const puttsAverage46M = parseFloat(divide(puttsDone46M, puttsAttempts46M).toFixed(2));
  const puttsAverage610M = parseFloat(divide(puttsDone610M, puttsAttempts610M).toFixed(2));
  const puttsAverageO10M = parseFloat(divide(puttsDoneO10M, puttsAttemptsO10M).toFixed(2));

  const puttsAverageDistanceU2M = parseFloat(divide(
    shots.reduce((acc, curr) => acc + (
      (iAmintheZone(2, 0, curr.puttsLength[0])) ? Number(curr.puttsLength[0]) : 0), 0
    ),
    puttsAttemptsU2M
  ).toFixed(2));
  const puttsAverageDistance24M = parseFloat(divide(
    shots.reduce((acc, curr) => acc + (
      (iAmintheZone(2, 4, curr.puttsLength[0])) ? Number(curr.puttsLength[0]) : 0), 0
    ),
    puttsAttempts24M
  ).toFixed(2));
  const puttsAverageDistance46M = parseFloat(divide(
    shots.reduce((acc, curr) => acc + (
      (iAmintheZone(4, 6, curr.puttsLength[0])) ? Number(curr.puttsLength[0]) : 0), 0
    ),
    puttsAttempts46M
  ).toFixed(2));
  const puttsAverageDistance610M = parseFloat(divide(
    shots.reduce((acc, curr) => acc + (
      (iAmintheZone(6, 10, curr.puttsLength[0])) ? Number(curr.puttsLength[0]) : 0), 0
    ),
    puttsAttempts610M
  ).toFixed(2));
  const puttsAverageDistanceO10M = parseFloat(divide(
    shots.reduce((acc, curr) => acc + (
      (iAmintheZone(0, 10, curr.puttsLength[0])) ? Number(curr.puttsLength[0]) : 0), 0
    ),
    puttsAttemptsO10M
  ).toFixed(2));

  const putts2AttemptU2M = shots.reduce((acc, curr) => acc + (
    ((iAmintheZone(2, 0, curr.puttsLength[0])) && curr.puttsLength.length === 2) ? 1 : 0), 0
  );
  const putts2Attempt24M = shots.reduce((acc, curr) => acc + (
    (iAmintheZone(2, 4, curr.puttsLength[0]) && curr.puttsLength.length === 2) ? 1 : 0), 0
  );
  const putts2Attempt46M = shots.reduce((acc, curr) => acc + (
    (iAmintheZone(4, 6, curr.puttsLength[0]) && curr.puttsLength.length === 2) ? 1 : 0), 0
  );
  const putts2Attempt610M = shots.reduce((acc, curr) => acc + (
    (iAmintheZone(6, 10, curr.puttsLength[0]) && curr.puttsLength.length === 2) ? 1 : 0), 0
  );
  const putts2AttemptO10M = shots.reduce((acc, curr) => acc + (
    (iAmintheZone(0, 10, curr.puttsLength[0]) && curr.puttsLength.length === 2) ? 1 : 0), 0
  );

  const putt2AverageLengthU2M = divide(
    parseFloat(shots.reduce((acc, curr) => acc + (curr.puttsLength.length === 2 && iAmintheZone(2, 0, curr.puttsLength[0]) ? Number(curr.puttsLength[1]) : 0), 0).toFixed(2)),
    parseFloat(putts2AttemptU2M.toFixed(2)));
  const putt2AverageLength24M = divide(
    parseFloat(shots.reduce((acc, curr) => acc + (curr.puttsLength.length === 2 && iAmintheZone(2, 4, curr.puttsLength[0]) ? Number(curr.puttsLength[1]) : 0), 0).toFixed(2)),
    parseFloat(putts2Attempt24M.toFixed(2)));
  const putt2AverageLength46M = divide(
    parseFloat(shots.reduce((acc, curr) => acc + (curr.puttsLength.length === 2 && iAmintheZone(4, 6, curr.puttsLength[0]) ? Number(curr.puttsLength[1]) : 0), 0).toFixed(2)),
    parseFloat(putts2Attempt46M.toFixed(2)));
  const putt2AverageLength610M = divide(
    parseFloat(shots.reduce((acc, curr) => acc + (curr.puttsLength.length === 2 && iAmintheZone(6, 10, curr.puttsLength[0]) ? Number(curr.puttsLength[1]) : 0), 0).toFixed(2)),
    parseFloat(putts2Attempt610M.toFixed(2))
  );
  const putt2AverageLengthO10M = divide(
    parseFloat(shots.reduce((acc, curr) => acc + (curr.puttsLength.length === 2 && iAmintheZone(0, 10, curr.puttsLength[0]) ? Number(curr.puttsLength[1]) : 0), 0).toFixed(2)),
    parseFloat(putts2AttemptO10M.toFixed(2))
  );

  const putt3PuttsU2m = shots.reduce(
    (acc, curr) => acc + ((iAmintheZone(2, 0, curr.puttsLength[0]) && curr.puttsLength.length >= 3) ? 1 : 0), 0
  );
  const putt3Putts24M = shots.reduce(
    (acc, curr) => acc + ((iAmintheZone(2, 4, curr.puttsLength[0]) && curr.puttsLength.length >= 3) ? 1 : 0), 0
  );
  const putt3Putts46M = shots.reduce(
    (acc, curr) => acc + ((iAmintheZone(4, 6, curr.puttsLength[0]) && curr.puttsLength.length >= 3) ? 1 : 0), 0
  );
  const putt3Putts610M = shots.reduce(
    (acc, curr) => acc + ((iAmintheZone(6, 10, curr.puttsLength[0]) && curr.puttsLength.length >= 3) ? 1 : 0), 0
  );
  const putt3PuttsO10M = shots.reduce(
    (acc, curr) => acc + ((iAmintheZone(0, 10, curr.puttsLength[0]) && curr.puttsLength.length >= 3) ? 1 : 0), 0
  );

  const finalResult = {
    ...result,
    puttsU2M: {
      puttsHoled: puttsHoledU2M,
      puttsAttempts: puttsAttemptsU2M,
      puttsAverage: puttsAverageU2M,
      puttsSecondoAverageLength: putt2AverageLengthU2M,
      puttsAverageDistance: puttsAverageDistanceU2M,
      putts3: putt3PuttsU2m,
    },
    putts24M: {
      puttsHoled: puttsHoled24M,
      puttsAttempts: puttsAttempts24M,
      puttsAverage: puttsAverage24M,
      puttsSecondoAverageLength: putt2AverageLength24M,
      puttsAverageDistance: puttsAverageDistance24M,
      putts3: putt3Putts24M,
    },
    putts46M: {
      puttsHoled: puttsHoled46M,
      puttsAttempts: puttsAttempts46M,
      puttsAverage: puttsAverage46M,
      puttsSecondoAverageLength: putt2AverageLength46M,
      puttsAverageDistance: puttsAverageDistance46M,
      putts3: putt3Putts46M,
    },
    putts610M: {
      puttsHoled: puttsHoled610M,
      puttsAttempts: puttsAttempts610M,
      puttsAverage: puttsAverage610M,
      puttsSecondoAverageLength: putt2AverageLength610M,
      puttsAverageDistance: puttsAverageDistance610M,
      putts3: putt3Putts610M,
    },
    puttsO10M: {
      puttsHoled: puttsHoledO10,
      puttsAttempts: puttsAttemptsO10M,
      puttsAverage: puttsAverageO10M,
      puttsSecondoAverageLength: putt2AverageLengthO10M,
      puttsAverageDistance: puttsAverageDistanceO10M,
      putts3: putt3PuttsO10M,
    },
  }

  console.log("FINALE result: ", finalResult);
  return finalResult;
}