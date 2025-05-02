import { IRoundsDistanceInitialState } from "@/types/roundData.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IRoundsDistanceInitialState = {
  isLoading: false,
  roundsDistances: []
}


const roundsDistancesSlice = createSlice({
  name: 'roundsDistances',
  initialState,
  reducers: {
    resetDistances: () => initialState,
  },
  extraReducers: (builder) => {
    builder

  }
});

export const { resetDistances } = roundsDistancesSlice.actions;
export default roundsDistancesSlice.reducer;