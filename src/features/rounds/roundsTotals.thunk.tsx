import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getAllRoundsTotalsThunk = async (thunkAPI: any) => {
  let roundsDataTotalsURL = `/data/round_totals.json`;
  try {
    const response = await authFetch.get(roundsDataTotalsURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};