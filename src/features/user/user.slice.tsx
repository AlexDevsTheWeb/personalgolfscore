import { InitialStateUser, IUser } from "@/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllRounds } from "../rounds/rounds.slice";

const initialState: InitialStateUser = {
  isLoading: false,
  user: {},
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRounds: () => initialState,
    setLoginUser: (state, { payload }: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRounds.fulfilled, (state, { payload }: any) => {

      })
      .addCase(getAllRounds.rejected, (state, { payload }: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetRounds, setLoginUser } = userSlice.actions;
export default userSlice.reducer;