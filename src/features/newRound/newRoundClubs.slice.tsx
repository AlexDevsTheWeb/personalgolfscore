import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INewRoundClubsInitialState {
  teeClubs: string[],
  distanceClubs: string[],
  greenClubs: string[],
  chipClubs: string[],
}

const initialState: INewRoundClubsInitialState = {
  teeClubs: [],
  distanceClubs: [],
  greenClubs: [],
  chipClubs: [],
}
const newRoundClubsSlice = createSlice({
  name: 'newRoundClubs',
  initialState,
  reducers: {
    setNewRoundClubs: (state: INewRoundClubsInitialState, action: PayloadAction<{
      teeClubs: string[],
      distanceClubs: string[],
      greenClubs: string[],
      chipClubs: string[],
    }>) => {
      state.teeClubs = action.payload.teeClubs;
      state.distanceClubs = action.payload.distanceClubs;
      state.greenClubs = action.payload.greenClubs;
      state.chipClubs = action.payload.chipClubs;
    },
  },
  extraReducers: () => { }
});

export const { setNewRoundClubs } = newRoundClubsSlice.actions;

export default newRoundClubsSlice.reducer;


