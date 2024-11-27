import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getSingleRoundTotalsThunk = async (thunkAPI: any) => {
  let roundsDataTotalsURL = `/data/NEW/01 - CARIMATE/TOTALS_CARIMATE.json`;
  try {
    const response = await authFetch.get(roundsDataTotalsURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
