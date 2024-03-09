import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";
// import { resetInputStore } from "features/form/inputSlice";

export const getPlayerInfoThunk = async (thunkAPI: any) => {
  let playerURL = `/data/player.json`;
  try {
    const resp = await authFetch.get(playerURL);
    console.log(resp.data)
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
