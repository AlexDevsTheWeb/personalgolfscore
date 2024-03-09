import authFetch, { checkForUnauthorizedResponse } from "../../utils/axios/axiox.utils";
// import { resetInputStore } from "features/form/inputSlice";

export const getClubsThunk = async (thunkAPI: any) => {
  let playerURL = `/data/clubs.json`;
  try {
    const resp = await authFetch.get(playerURL);
    return resp.data.clubs;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};