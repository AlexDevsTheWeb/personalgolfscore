import axios from "axios";

const authFetch = axios.create({
  baseURL: '',
});

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  return thunkAPI.rejectWithValue(error.response);
};

export default authFetch;
