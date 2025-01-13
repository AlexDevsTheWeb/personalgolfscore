import { InitialStateUser, IUser } from "@/types/user.types";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllRounds } from "../rounds/rounds.slice";
import { getUserDetailsThunk } from "./user.thunk";

const initialState: InitialStateUser = {
  isLoading: false,
  user: {},
  rounds: {}
}

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  getUserDetailsThunk
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    setLoginUser: (state, { payload }: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = payload;
      state.user.uid = readUserLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => { state.isLoading = true; })
      .addCase(getUserDetails.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(getUserDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.user = {};
      })
      .addCase(getAllRounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRounds.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.rounds = payload;
      })
      .addCase(getAllRounds.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.rounds = {};
      });
  },
});

export const { resetUser, setLoginUser } = userSlice.actions;
export default userSlice.reducer;