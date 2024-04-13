import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateRoundsTotals, RoundsTotalsPayload } from "../../types/roundTotals.types";
import { getAllRoundsTotalsThunk } from "./roundsTotals.thunk";

const initialState: InitialStateRoundsTotals = {
  isLoading: false,
  playerID: "",
  totals: [],
}

export const getAllRoundsTotals = createAsyncThunk(
  "roundsTotals/getAllRoundsTotals",
  getAllRoundsTotalsThunk
);

const roundsTotalsSlice = createSlice({
  name: "roundsTotals",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoundsTotals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRoundsTotals.fulfilled, (state, { payload }: RoundsTotalsPayload) => {
        state.isLoading = false;
        state.playerID = payload.playerID;
        state.totals = payload.totals;
      })
      .addCase(getAllRoundsTotals.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.playerID = "";
        state.totals = [];
      });
  },
});

export const { resetRounds } = roundsTotalsSlice.actions;
export default roundsTotalsSlice.reducer;
