import { IShots } from "../types/roundData.types";
import { calculatePuttsStatistics } from "../utils/totals/totals.utils";

export const useRoundPuttsStatistics = (shots: IShots[]) => {

  const puttsStatistics = calculatePuttsStatistics(shots);


  console.log("...passo di qui")
  return puttsStatistics
}