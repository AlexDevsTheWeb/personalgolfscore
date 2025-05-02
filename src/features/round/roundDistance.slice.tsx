import { IRoundDistanceInitialState } from "@/types/roundTotals.types";
import { initialStateDistance } from "@/utils/constant.utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IRoundDistanceInitialState = {
  isLoading: false,
  roundDistance: initialStateDistance
}

const roundDistanceSlice = createSlice({
  name: "roundDistance",
  initialState,
  reducers: {
    resetDistance: () => initialState
  },
  extraReducers: (builder) => {
    builder
  }
});

export const { resetDistance } = roundDistanceSlice.actions;
export default roundDistanceSlice.reducer;