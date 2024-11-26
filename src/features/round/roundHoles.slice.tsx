import { IRoundHoles, IRoundInitialState } from "@/types/roundData.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSingleRoundHolesThunk } from "./roundHoles.thunk";

const initialState: IRoundInitialState = {
  isLoading: false,
  mainData: {
    playerID: "playerID",
    roundID: 0,
    roundDate: "",
    roundCourse: "",
  },
  holes: []
}

export const getSingleRoundHoles = createAsyncThunk(
  "roundHoles/getSingleRoundHoles",
  getSingleRoundHolesThunk
);

const roundHolesSlice = createSlice({
  name: "roundHoles",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleRoundHoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRoundHoles.fulfilled, (state, { payload }: PayloadAction<IRoundHoles[]>) => {
        state.isLoading = false;
        state.holes = payload;
      })
      .addCase(getSingleRoundHoles.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.mainData = {
          playerID: "playerID",
          roundID: 0,
          roundDate: "",
          roundCourse: "",
        };
        state.holes = [];
      });
  },
});

export const { resetRounds } = roundHolesSlice.actions;
export default roundHolesSlice.reducer;
