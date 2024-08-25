import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getAllRoundsDataThunk = async (thunkAPI: any) => {
  let roundsDataURL = `/data/NEW_HOLE.json`;
  try {
    const response = await authFetch.get(roundsDataURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};