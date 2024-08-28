import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getSingleRoundTotalsThunk = async (thunkAPI: any) => {
  let roundsDataTotalsURL = `/data/NEW/TOTALS_new.json`;
  try {
    const response = await authFetch.get(roundsDataTotalsURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
