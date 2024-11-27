import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getSingleRoundHolesThunk = async (thunkAPI: any) => {
  let roundsDataURL = `/data/NEW/01 - CARIMATE/HOLES_CARIMATE.json`;
  try {
    const response = await authFetch.get(roundsDataURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};