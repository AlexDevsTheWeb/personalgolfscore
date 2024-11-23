import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDistance, IRoundsDistanceInitialState } from "../../types/roundData.types";
import { getRoundsDistancesThunk } from "./roundsDistance.thunk";

const initialState: IRoundsDistanceInitialState = {
  isLoading: false,
  roundsDistances: []
}

export const getRoundsDistances = createAsyncThunk(
  "roundDistances/getRoundDistances",
  getRoundsDistancesThunk
);

const roundsDistances = createSlice({
  name: 'roundsDistances',
  initialState,
  reducers: {
    resetDistances: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoundsDistances.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoundsDistances.fulfilled, (state, { payload }: PayloadAction<IDistance[]>) => {
        state.isLoading = false;
        state.roundsDistances = payload;
      })
      .addCase(getRoundsDistances.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundsDistances = [];
      })
  }
});

export const { resetDistances } = roundsDistances.actions;
export default roundsDistances.reducer;