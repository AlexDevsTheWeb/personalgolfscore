import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getSingleRoundDistanceThunk = async (thunkAPI: any) => {
  let roundDistanceURL = `/data/NEW/01 - CARIMATE/DISTANCE_CARIMATE.json`;
  try {
    const response = await authFetch.get(roundDistanceURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};