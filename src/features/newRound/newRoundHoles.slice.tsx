import { createSlice } from "@reduxjs/toolkit";
import { InitialStateRoundsData } from "../../types/roundData.types";

const initialState: InitialStateRoundsData = {
  isLoading: false,
  playerID: '',
  roundID: '',
  shots: [],
}

// export const getAllRounds = createAsyncThunk(
//   "rounds/getAllRounds",
//   getAllRoundsThunk
// );

const newRoundHolesSlice = createSlice({
  name: 'newRoundHoles',
  initialState,
  reducers: {
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;