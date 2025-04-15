import { IAllRoundsTotals, IRoundsTotalsInitialState } from "@/types/roundTotals.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllRoundsTotalsThunk } from "./roundsTotals.thunk";

const initialState: IRoundsTotalsInitialState = {
  isLoading: false,
  roundsTotals: [],
}

export const getAllRoundsTotals = createAsyncThunk(
  "roundsTotals/getAllRoundsTotals",
  getAllRoundsTotalsThunk
);

const roundsTotalsSlice = createSlice({
  name: "roundsTotals",
  initialState,
  reducers: {
    setRoundsTotals: (state, { payload }: PayloadAction<any>) => {
      state.isLoading = false;
      state.roundsTotals = payload;
    },
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoundsTotals.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllRoundsTotals.fulfilled, (state, { payload }: PayloadAction<IAllRoundsTotals>) => {
        state.isLoading = false;
        state.roundsTotals = payload.roundsTotals;
      })
      .addCase(getAllRoundsTotals.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundsTotals = [];
      })
  },
});

export const { resetRounds, setRoundsTotals } = roundsTotalsSlice.actions;
export default roundsTotalsSlice.reducer;
