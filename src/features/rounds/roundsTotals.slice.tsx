import { IRoundsTotalsInitialState } from "@/types/roundTotals.types";
import { initialStateRoundsTotals } from "@/utils/constant.utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRoundsTotalsThunk } from "./roundsTotals.thunk";

const initialState: IRoundsTotalsInitialState = {
  isLoading: false,
  roundsTotals: initialStateRoundsTotals,
}

export const getAllRoundsTotals = createAsyncThunk(
  "roundsTotals/getAllRoundsTotals",
  getAllRoundsTotalsThunk
);

const roundsTotalsSlice = createSlice({
  name: "roundsTotals",
  initialState,
  reducers: {
    // setManualTotals: (state: any, { payload }: any) => {
    //   state.roundTotals = payload;
    // },
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoundsTotals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRoundsTotals.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundsTotals = payload;
      })
      .addCase(getAllRoundsTotals.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundsTotals = initialStateRoundsTotals;
      })
  },
});

export const { resetRounds } = roundsTotalsSlice.actions;
export default roundsTotalsSlice.reducer;
