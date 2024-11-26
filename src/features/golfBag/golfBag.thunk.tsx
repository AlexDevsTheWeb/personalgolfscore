import authFetch, { checkForUnauthorizedResponse } from "@/utils/axios/axiox.utils";

export const getClubsThunk = async (thunkAPI: any) => {
  let playerURL = `/data/clubs.json`;
  try {
    const response = await authFetch.get(playerURL);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};