import { IRoundsTotalsInitialState } from "@/types/roundTotals.types";
import { initialStateRoundsTotals } from "@/utils/constant.utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllRoundsTotalsThunk } from "./roundsTotals.thunk";

const initialState: IRoundsTotalsInitialState = {
  isLoading: false,
  roundsTotals: {
    roundsTotals: []
  },
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
      .addCase(getAllRoundsTotals.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        if (payload.length > 0) {
          state.roundsTotals = {
            roundsTotals: payload.roundsTotals.map((rt: any) => {
              return JSON.parse(rt);
            })
          };
        }
        else {
          state.roundsTotals = payload;
        }
      })
      .addCase(getAllRoundsTotals.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.roundsTotals = initialStateRoundsTotals;
      })
  },
});

export const { resetRounds, setRoundsTotals } = roundsTotalsSlice.actions;
export default roundsTotalsSlice.reducer;
