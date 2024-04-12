import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRoundsThunk } from "./rounds.thunk";
import { InitialStateRounds, IRounds, RoundPayload } from "../../types/round.types";
// import { editCarrierThunk, getCarrierDetailsThunk } from "./carrierThunk";
// import {
//   CarrierPayload,
//   CarrierResponse,
//   InitialStateCarrier,
// } from "types/Carrier";

const initialState: InitialStateRounds = {
  isLoading: false,
  playerID: "",
  rounds: [],
}

export const getAllRounds = createAsyncThunk(
  "rounds/getAllRounds",
  getAllRoundsThunk
);

const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRounds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRounds.fulfilled, (state, { payload }: RoundPayload) => {
        console.log("Slice payload: ", typeof payload.rounds)
        state.isLoading = false;
        state.playerID = payload.playerID;
        state.rounds = payload.rounds;
      })
      .addCase(getAllRounds.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.playerID = "";
        state.rounds = [];
      });
  },
});

export const { resetRounds } = roundsSlice.actions;
export default roundsSlice.reducer;
