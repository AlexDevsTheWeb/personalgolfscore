import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getRoundsDistancesThunk = async (thunkAPI: any) => {
  let roundsDataURL = `/data/NEW/CARIMATE/HOLES_CARIMATE.json`;
  try {
    const response = await authFetch.get(roundsDataURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};