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
interface IPayloadActionNewHole {
  tmpHole: any,
  roundPlayingHCP: number
  roundHoles: number,
  holesCompleted: number
};

const newRoundHolesSlice = createSlice({
  name: 'newRoundHoles',
  initialState,
  reducers: {

    setHolesCompleted: (state, { payload }: PayloadAction<{ newHoleNumber: number }>) => {
      state.holesCompleted = payload.newHoleNumber;
    },
    setNewHole: (state, { payload }: PayloadAction<IPayloadActionNewHole>) => {
      const completeHole = { ...payload.tmpHole, holeNumber: payload.holesCompleted };
      state.shots = [...state.shots, completeHole]
    },
    resetNewRoundsHoles: () => initialState,
  },
  extraReducers: () => { }
});

export const { setHolesCompleted, setNewHole, resetNewRoundsHoles } = newRoundHolesSlice.actions;
export default newRoundHolesSlice.reducer;