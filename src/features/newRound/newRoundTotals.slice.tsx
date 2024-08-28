import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoundTotals, IRoundTotalsInitialState } from "../../types/roundTotals.types";
import { initialStateRoundTotals } from "../../utils/constant.utils";

const initialState: IRoundTotalsInitialState = {
  isLoading: false,
  roundTotals: initialStateRoundTotals
}

const newRoundTotalsSlice = createSlice({
  name: 'newRoundTotals',
  initialState,
  reducers: {
    setNewTotal: (state, { payload }: PayloadAction<{ roundTotals: IRoundTotals }>) => {
      state.roundTotals = payload.roundTotals;
    },

    resetNewRoundsTotals: () => initialState,
  },
  extraReducers: () => { }
});

export const { setNewTotal, resetNewRoundsTotals } = newRoundTotalsSlice.actions;
export default newRoundTotalsSlice.reducer;