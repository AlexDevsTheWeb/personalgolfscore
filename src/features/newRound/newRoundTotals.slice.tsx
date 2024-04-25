import { createSlice } from "@reduxjs/toolkit";
import { InitialStateNewRoundsTotals } from "../../types/roundTotals.types";

const initialState: InitialStateNewRoundsTotals = {
  isLoading: false,
  playerID: "",
  totals: {
    roundID: '',
    holeNumber: 0,
    distance: 0,
    hcp: 0,
    par: 0,
    strokes: 0,
    points: 0,
    teeClub: '',
    fir: 0,
    left: 0,
    right: 0,
    gir: 0,
    putts: 0,
    sand: 0,
    water: 0,
    out: 0,
  },
}

// export const getAllRounds = createAsyncThunk(
//   "rounds/getAllRounds",
//   getAllRoundsThunk
// );

const newRoundTotalsSlice = createSlice({
  name: 'newRoundTotals',
  initialState,
  reducers: {
    resetNewRoundsTotals: () => initialState,
  },
  extraReducers: () => { }
});

export const { resetNewRoundsTotals } = newRoundTotalsSlice.actions;
export default newRoundTotalsSlice.reducer;