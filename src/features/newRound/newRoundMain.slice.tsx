import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INewRound, InitialStateNewRound } from "../../types/round.types";

const initialState: InitialStateNewRound = {
  isLoading: false,
  playerID: '',
  round: {
    roundID: '',
    roundDate: '',
    roundCourse: '',
    roundHoles: 0,
    roundTee: '',
    roundPar: 0,
    roundPlayingHCP: 0,
    roundStrokes: 0
  }
}

// export const getAllRounds = createAsyncThunk(
//   "rounds/getAllRounds",
//   getAllRoundsThunk
// );

const newRoundMainSlice = createSlice({
  name: 'newRoundsMain',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<{ loading: boolean }>) => {
      state.isLoading = payload.loading;
    },
    setPlayerID: (state, { payload }: PayloadAction<{ playerID: string }>) => {
      state.playerID = payload.playerID;
    },
    setRoundMainData: (state, { payload }: PayloadAction<{ mainData: INewRound }>) => {
      state.round.roundID = payload.mainData.roundID;
      state.round.roundDate = payload.mainData.roundDate;
      state.round.roundCourse = payload.mainData.roundCourse;
      state.round.roundHoles = payload.mainData.roundHoles;
      state.round.roundTee = payload.mainData.roundTee;
      state.round.roundPar = payload.mainData.roundPar;
      state.round.roundPlayingHCP = payload.mainData.roundPlayingHCP;
      state.round.roundStrokes = payload.mainData.roundStrokes;
    },
    resetNewRoundsMain: () => initialState,
  },
  extraReducers: () => { }
});

export const { resetNewRoundsMain } = newRoundMainSlice.actions;
export default newRoundMainSlice.reducer;