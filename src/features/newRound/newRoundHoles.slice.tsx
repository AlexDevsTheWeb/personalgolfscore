import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateNewRoundsData } from "../../types/roundData.types";

const initialState: InitialStateNewRoundsData = {
  isLoading: false,
  playerID: '',
  roundID: '',
  holesCompleted: 0,
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

    setHolesCompleted: (state) => {
      state.holesCompleted = state.holesCompleted + 1;
    },
    setNewHole: (state, { payload }: PayloadAction<{ tmpHole: any, roundPlayingHCP: number, roundHoles: number }>) => {
      state.shots = [...state.shots, payload.tmpHole]
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setHolesCompleted, setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;