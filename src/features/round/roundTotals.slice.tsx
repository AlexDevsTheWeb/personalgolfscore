import { IRoundTotalsInitialState } from "@/types/roundTotals.types";
import { initialStateRoundTotals } from "@/utils/constant.utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IRoundTotalsInitialState = {
  isLoading: false,
  roundTotals: initialStateRoundTotals,
}


const roundTotalsSlice = createSlice({
  name: "roundTotals",
  initialState,
  reducers: {
    // setManualTotals: (state: any, { payload }: any) => {
    //   state.roundTotals = payload;
    // },
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { resetRounds } = roundTotalsSlice.actions;
export default roundTotalsSlice.reducer;
