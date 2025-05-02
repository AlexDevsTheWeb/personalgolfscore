import { IRoundInitialState } from "@/types/roundData.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IRoundInitialState = {
  isLoading: false,
  mainData: {
    roundID: 0,
    roundDate: "",
    roundCourse: "",
  },
  holes: []
}

const roundsDataSlice = createSlice({
  name: "roundsData",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { resetRounds } = roundsDataSlice.actions;
export default roundsDataSlice.reducer;
