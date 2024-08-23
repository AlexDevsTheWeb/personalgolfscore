import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INewTotals, InitialStateNewRoundsTotals } from "../../types/roundTotals.types";

const initialState: InitialStateNewRoundsTotals = {
  isLoading: false,
  playerID: "",
  totals: {
    roundID: 0,
    totDistance: 0,
    totDriverDistance: 0,
    totFairwaysLeft: 0,
    totFairwaysCenter: 0,
    totFairwaysRight: 0,
    totFir: 0,
    totGir: 0,
    totGirBogey: 0,
    totGreenSideL: 0,
    totGreenSideO: 0,
    totGreenSideR: 0,
    totGreenSideS: 0,
    totOut: 0,
    totWater: 0,
    totSand: 0,
    totPoints: 0,
    totPutts: 0,
    totStrokes: 0,
    totUpDown: { X: 0, N: 0, V: 0 },
  },
}

const newRoundTotalsSlice = createSlice({
  name: 'newRoundTotals',
  initialState,
  reducers: {
    setNewTotal: (state, { payload }: PayloadAction<{ totals: INewTotals }>) => {
      state.totals = payload.totals;
    },

    resetNewRoundsTotals: () => initialState,
  },
  extraReducers: () => { }
});

export const { setNewTotal, resetNewRoundsTotals } = newRoundTotalsSlice.actions;
export default newRoundTotalsSlice.reducer;