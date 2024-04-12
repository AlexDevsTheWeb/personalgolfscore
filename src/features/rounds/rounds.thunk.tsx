import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getAllRoundsThunk = async (thunkAPI: any) => {
  let roundsURL = `/data/rounds.json`;
  try {
    const response = await authFetch.get(roundsURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};