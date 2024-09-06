import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoundHoles, IRoundInitialState, IRoundMainData } from "../../types/roundData.types";
import { getAllRoundsDataThunk } from "./roundsData.thunk";

const initialState: IRoundInitialState = {
  isLoading: false,
  mainData: {
    playerID: "playerID",
    roundID: 0,
    roundDate: "",
    roundCourse: "",
  },
  holes: []
}

export const getAllRoundsData = createAsyncThunk(
  "roundsData/getAllRoundsData",
  getAllRoundsDataThunk
);

const roundsDataSlice = createSlice({
  name: "roundsData",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoundsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRoundsData.fulfilled, (state, { payload }: PayloadAction<{ mainData: IRoundMainData, holes: IRoundHoles[] }>) => {
        state.isLoading = false;
        state.mainData = payload.mainData;
        state.holes = payload.holes;
      })
      .addCase(getAllRoundsData.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.mainData = {
          playerID: "playerID",
          roundID: 0,
          roundDate: "",
          roundCourse: "",
        };
        state.holes = [];
      });
  },
});

export const { resetRounds } = roundsDataSlice.actions;
export default roundsDataSlice.reducer;
