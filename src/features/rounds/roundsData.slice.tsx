import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InitialStateRoundsData, RoundsDataPayload } from "../../types/roundData.types";
import { getAllRoundsDataThunk } from "./roundsData.thunk";

const initialState: InitialStateRoundsData = {
  isLoading: false,
  playerID: "",
  roundID: "",
  shots: [],
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
      .addCase(getAllRoundsData.fulfilled, (state, { payload }: RoundsDataPayload) => {
        state.isLoading = false;
        state.playerID = payload.playerID;
        state.roundID = payload.roundID;
        state.shots = payload.shots;
      })
      .addCase(getAllRoundsData.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.playerID = "";
        state.roundID = "";
        state.shots = [];
      });
  },
});

export const { resetRounds } = roundsDataSlice.actions;
export default roundsDataSlice.reducer;
