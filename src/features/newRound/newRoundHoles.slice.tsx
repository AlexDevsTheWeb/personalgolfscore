import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateNewRoundsData } from "../../types/roundData.types";
import { calculateStablefordPoints } from "../../utils/shots/shots.utils";

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
    setNewHole: (state, { payload }: PayloadAction<{ hole: any, roundPlayingHCP: number, roundHoles: number }>) => {
      const pointCalc = {
        hcp: payload.hole.hcp,
        par: payload.hole.par,
        strokes: payload.hole.strokes,
        finalPlayerHCP: payload.roundPlayingHCP,
        totalHoles: payload.roundHoles
      };
      const holePoints = calculateStablefordPoints(pointCalc);

      const newHole = { ...payload.hole, points: holePoints };
      state.shots = [...state.shots, newHole]
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setHolesCompleted, setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;