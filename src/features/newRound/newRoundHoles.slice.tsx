import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateNewRoundsData, IShots } from "../../types/roundData.types";
import { calculateGirBogeyValue, calculateGirValue, calculateStablefordPoints } from "../../utils/shots/shots.utils";

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
      const girCalc = {
        par: payload.hole.par,
        putts: payload.hole.putts,
        strokes: payload.hole.strokes
      };
      const holePoints = calculateStablefordPoints(pointCalc);
      const girValue = calculateGirValue(girCalc);
      const girBogeyValue = calculateGirBogeyValue(girCalc)

      const newHole: IShots = { ...payload.hole, points: holePoints, gir: girValue, girBogey: girBogeyValue };

      state.shots = [...state.shots, newHole]
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setHolesCompleted, setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;