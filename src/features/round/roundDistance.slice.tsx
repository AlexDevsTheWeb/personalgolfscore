import { IRoundDistanceInitialState } from "@/types/roundTotals.types";
import { initialStateDistance } from "@/utils/constant.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingleRoundDistanceThunk } from "./roundDistance.thunk";

const initialState: IRoundDistanceInitialState = {
  isLoading: false,
  roundDistance: initialStateDistance
}

export const getSingleRoundDistance = createAsyncThunk(
  "roundDistance/getSingleRoundDistnace",
  getSingleRoundDistanceThunk
);

const roundDistanceSlice = createSlice({
  name: "roundDistance",
  initialState,
  reducers: {
    resetDistance: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleRoundDistance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRoundDistance.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundDistance = payload;
      })
      .addCase(getSingleRoundDistance.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundDistance = initialStateDistance;
      })
  }
});

export const { resetDistance } = roundDistanceSlice.actions;
export default roundDistanceSlice.reducer;