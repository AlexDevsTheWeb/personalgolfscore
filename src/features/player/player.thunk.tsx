import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";

export const getPlayerInfoThunk = async (thunkAPI: any) => {
  let playerURL = `/data/player.json`;
  try {
    const response = await authFetch.get(playerURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
