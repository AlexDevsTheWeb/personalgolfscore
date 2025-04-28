
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
      if (!club || distance <= 0) {
        return;
      }
      const existingIndex = state.roundDistances.findIndex((d) => d.club === club);
      if (existingIndex !== -1) {
        state.roundDistances = state.roundDistances.map((item, index) => {
          if (index === existingIndex) {
            const updatedMt = [...item.mt, distance];
            const updatedAvg = calculateAvg(updatedMt);
            return { ...item, mt: updatedMt, avg: updatedAvg };
          }
          return item;
        });
      } else {
        const newDistanceEntry: IDistance = {
          club: club,
          mt: [distance],
          avg: distance,
        };
        state.roundDistances = [...state.roundDistances, newDistanceEntry];
      }
    },
    addNewDistanceWithClub: (state, { payload }: PayloadAction<IDistance[]>) => {
      state.roundDistances = payload;
    },
    resetNewHoleDistance: () => initialState,
  },
  extraReducers: () => { }
});

export const { addNewDistanceWithClub, resetNewHoleDistance, addTeeShotDistance } = newRoundDistanceSlice.actions;
export default newRoundDistanceSlice.reducer;