
import { IDistance, InitialStateNewRoundDistances } from "@/types/roundData.types";
import { calculateAvg } from "@/utils/round/round.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateNewRoundDistances = {
  isLoading: false,
  roundDistances: [],
}

const newRoundDistanceSlice = createSlice({
  name: 'newRoundDistance',
  initialState,
  reducers: {
    addTeeShotDistance: (state, action: PayloadAction<{ club: string; distance: number }>) => {
      const { club, distance } = action.payload;
      if (!club || typeof club !== 'string' || club.trim() === '' || typeof distance !== 'number' || distance <= 0) {
        return;
      }
      const existingIndex = state.roundDistances.findIndex((d) => d.club === club);
      if (existingIndex !== -1) {
        state.roundDistances[existingIndex].mt.push(distance);
        state.roundDistances[existingIndex].avg = calculateAvg(state.roundDistances[existingIndex].mt);
      } else {
        const newDistanceEntry: IDistance = {
          club: club,
          mt: [distance],
          avg: distance,
        };
        state.roundDistances.push(newDistanceEntry);
      }
    },
    addApproachShotDistance: (state, action: PayloadAction<{ club: string; distance: number }>) => {
      const { club, distance } = action.payload;
      if (!club || typeof club !== 'string' || club.trim() === '' || typeof distance !== 'number' || distance <= 0) {
        console.warn('Invalid data provided to addApproachShotDistance:', action.payload);
        return;
      }
      const existingIndex = state.roundDistances.findIndex((d) => d.club === club);

      if (existingIndex !== -1) {
        state.roundDistances[existingIndex].mt.push(distance);
        state.roundDistances[existingIndex].avg = calculateAvg(state.roundDistances[existingIndex].mt);
      } else {
        const newDistanceEntry: IDistance = {
          club: club,
          mt: [distance],
          avg: distance,
        };
        state.roundDistances.push(newDistanceEntry);
      }
    },
    addNewDistanceWithClub: (state, { payload }: PayloadAction<IDistance[]>) => {
      state.roundDistances = payload;
    },
    resetNewHoleDistance: () => initialState,
  },
  extraReducers: () => { }
});

export const {
  addNewDistanceWithClub,
  resetNewHoleDistance,
  addTeeShotDistance,
  addApproachShotDistance
} = newRoundDistanceSlice.actions;
export default newRoundDistanceSlice.reducer;