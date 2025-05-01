import { INewRound, InitialStateNewRound } from "@/types/round.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

const initialState: InitialStateNewRound = {
  isLoading: false,
  isSaved: false,
  playerID: '',
  setFirstHole: false,
  round: {
    roundDate: '',
    roundCourse: '',
    roundHoles: 0,
    roundTee: '',
    roundPar: 0,
    roundPlayingHCP: 0,
    roundNumber: 0
  }
}

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
    setRoundMainData: (state, action: PayloadAction<Partial<INewRound>>) => {
      if (action.payload.roundDate && dayjs.isDayjs(action.payload.roundDate)) {
        state.round = { ...state.round, ...action.payload, roundDate: action.payload.roundDate.toISOString() };
      } else {
        state.round = { ...state.round, ...action.payload };
      }
      state.setFirstHole = true;
    },
    setRoundDate: (state, action: PayloadAction<Dayjs | null>) => { // Expect Dayjs object from picker
      // Check if payload is a valid Dayjs object before converting
      if (action.payload && dayjs.isDayjs(action.payload) && action.payload.isValid()) {
        state.round.roundDate = action.payload.toISOString();
      } else {
        // Handle invalid or null date - store empty string or perhaps log an error
        state.round.roundDate = '';
      }
    },
    // Add reducers for other fields
    setRoundCourse: (state, action: PayloadAction<string>) => {
      state.round.roundCourse = action.payload;
    },
    setRoundHoles: (state, action: PayloadAction<number>) => {
      // Ensure it's a number, default to 0 if not valid
      state.round.roundHoles = Number.isNaN(Number(action.payload)) ? 0 : Number(action.payload);
    },
    setRoundTee: (state, action: PayloadAction<string>) => {
      state.round.roundTee = action.payload;
    },
    setRoundPar: (state, action: PayloadAction<number>) => {
      state.round.roundPar = Number.isNaN(Number(action.payload)) ? 0 : Number(action.payload);
    },
    setRoundPlayingHCP: (state, action: PayloadAction<number>) => {
      state.round.roundPlayingHCP = Number.isNaN(Number(action.payload)) ? 0 : Number(action.payload);
    },
    setRoundNumber: (state, action: PayloadAction<number>) => {
      state.round.roundNumber = Number.isNaN(Number(action.payload)) ? 0 : Number(action.payload);
    },
    resetSetFirstHole: (state) => {
      state.setFirstHole = false;
    },
    resetNewRoundsMain: () => initialState,
  },
  extraReducers: () => { }
});

export const {
  setRoundMainData, // Keep if needed for setting multiple fields at once elsewhere
  setPlayerID,
  resetNewRoundsMain,
  resetSetFirstHole,
  setRoundDate,
  setRoundCourse, // Export new actions
  setRoundHoles,
  setRoundTee,
  setRoundPar,
  setRoundPlayingHCP,
  setRoundNumber,
} = newRoundMainSlice.actions;
export default newRoundMainSlice.reducer;