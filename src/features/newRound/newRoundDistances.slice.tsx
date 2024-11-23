
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDistance, InitialStateNewRoundDistances } from "../../types/roundData.types";

const initialState: InitialStateNewRoundDistances = {
  isLoading: false,
  playerID: '',
  roundID: '',
  roundDistances: [],
}

const newRoundDistanceSlice = createSlice({
  name: 'newRoundDistance',
  initialState,
  reducers: {
    addNewDistanceWithClub: (state, { payload }: PayloadAction<IDistance[]>) => {
      state.roundDistances = payload;
    },
    resetNewHoleDistance: () => initialState,
  },
  extraReducers: () => { }
});

export const { addNewDistanceWithClub, resetNewHoleDistance } = newRoundDistanceSlice.actions;
export default newRoundDistanceSlice.reducer;