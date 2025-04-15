import { IInitialStateRoundSave } from "@/types/round.types";
import { roundToSave } from "@/utils/constant.utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveNewRoundThunk } from "./roundSaver.thunk";

const initialState: IInitialStateRoundSave = {
  isLoading: false,
  roundToSave: roundToSave
}

export const saveNewRound = createAsyncThunk(
  "roundSaver/saveNewRound",
  saveNewRoundThunk
);

const roundSaverSlice = createSlice({
  name: 'roundSaver',
  initialState,
  reducers: {
    // saveRound: (state, { payload }: PayloadAction<IRoundFinalData>) => {
    //   console.log("round to save: ", payload);
    //   state.roundToSave = payload;
    // },
    resetRoundSaver: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveNewRound.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveNewRound.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false;
        state.roundToSave = payload;
      })
      .addCase(saveNewRound.rejected, (state) => {
        state.isLoading = false;
      })
  }
});

export const { resetRoundSaver } = roundSaverSlice.actions;
export default roundSaverSlice.reducer
