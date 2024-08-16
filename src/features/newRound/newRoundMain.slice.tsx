import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INewRound, InitialStateNewRound } from "../../types/round.types";

const initialState: InitialStateNewRound = {
  isLoading: false,
  isSaved: false,
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
    setRoundMainData: (state, { payload }: PayloadAction<{ newRound: INewRound }>) => {
      state.round = payload.newRound
    },
    resetNewRoundsMain: () => initialState,
  },
  extraReducers: () => { }
});

export const { setRoundMainData, resetNewRoundsMain } = newRoundMainSlice.actions;
export default newRoundMainSlice.reducer;