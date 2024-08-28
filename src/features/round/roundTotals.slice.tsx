import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRoundTotalsInitialState } from "../../types/roundTotals.types";
import { initialStateRoundTotals } from "../../utils/constant.utils";
import { getAllRoundsTotals } from "../rounds/roundsTotals.slice";
import { getSingleRoundTotalsThunk } from "./roundsTotals.thunk";

const initialState: IRoundTotalsInitialState = {
  isLoading: false,
  roundTotals: initialStateRoundTotals,
}

export const getSingleRoundTotals = createAsyncThunk(
  "roundTotals/getSingleRoundTotals",
  getSingleRoundTotalsThunk
);

const roundTotalsSlice = createSlice({
  name: "roundTotals",
  initialState,
  reducers: {
    setManualTotals: (state: any, { payload }: any) => {
      state.roundTotals = payload;
    },
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoundsTotals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRoundsTotals.fulfilled, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundTotals = payload;
      })
      .addCase(getAllRoundsTotals.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundTotals = initialStateRoundTotals;
      })
  },
});

export const { resetRounds, setManualTotals } = roundTotalsSlice.actions;
export default roundTotalsSlice.reducer;
