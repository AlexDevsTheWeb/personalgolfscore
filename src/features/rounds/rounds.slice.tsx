import { InitialStateRounds, IRoundsState } from "@/types/round.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlayerDetails } from "../player/player.slice";
import { getAllRoundsThunk } from "./rounds.thunk";


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
      .addCase(getAllRounds.fulfilled, (state, { payload }: PayloadAction<IRoundsState>) => {
        state.isLoading = false;
        state.playerID = payload.uid;
        state.rounds = payload.rounds;
      })
      .addCase(getAllRounds.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.playerID = "";
        state.rounds = [];
      })

      .addCase(getPlayerDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayerDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload && action.payload.rounds) {
          state.rounds = action.payload.rounds;
        }
        else {
          state.rounds = [];
        }
      })
      .addCase(getPlayerDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.rounds = [];
      });
  },
});

export const { resetRounds } = roundsSlice.actions;
export default roundsSlice.reducer;
