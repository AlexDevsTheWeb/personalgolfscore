import { IInitialStateRoundSave, IRoundFinalData } from "@/types/round.types";
import { roundToSave } from "@/utils/constant.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IInitialStateRoundSave = {
  isLoading: false,
  roundToSave: roundToSave
}

const roundSaverSlice = createSlice({
  name: 'roundSaver',
  initialState,
  reducers: {
    saveRound: (state, { payload }: PayloadAction<IRoundFinalData>) => {
      state.roundToSave = payload;
    },
    resetRoundSaver: () => initialState,
  },
  extraReducers: (builder) => { builder }
});

export const { resetRoundSaver, saveRound } = roundSaverSlice.actions;
export default roundSaverSlice.reducer
