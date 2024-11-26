import { INewRound } from "@/types/round.types";
import { IShots } from "@/types/roundData.types";
import { IRoundTotals, IRoundTotalsInitialState } from "@/types/roundTotals.types";
import { totalsCalculator } from "@/utils/calculator/TotalsCalculator.utils";
import { initialStateRoundTotals } from "@/utils/constant.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

    setTotalMainData: (state, { payload }: PayloadAction<{ round: INewRound }>) => {
      const newRoundMain = {
        roundCourse: payload.round.roundCourse,
        roundDate: payload.round.roundDate,
        roundNumber: payload.round.roundNumber,
        roundTee: payload.round.roundTee,
        coursePar: payload.round.roundPar,
        playerHCP: payload.round.roundPlayingHCP
      }
      state.roundTotals.mainData = newRoundMain
    },
    setTotalsByHole: (state, { payload: { holes } }: PayloadAction<{ holes: IShots[] }>) => {
      state.roundTotals = totalsCalculator(holes);
    },

    resetNewRoundsTotals: () => initialState,
  },
  extraReducers: () => { }
});

export const { setNewTotal, resetNewRoundsTotals, setTotalMainData, setTotalsByHole } = newRoundTotalsSlice.actions;
export default newRoundTotalsSlice.reducer;