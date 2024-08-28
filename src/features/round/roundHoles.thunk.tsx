import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getSingleRoundHolesThunk = async (thunkAPI: any) => {
  let roundsDataURL = `/data/NEW/HOLES_new.json`;
  try {
    const response = await authFetch.get(roundsDataURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};