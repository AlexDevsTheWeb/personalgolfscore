import { InitialStateRounds } from "@/types/round.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
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
      .addCase(getAllRounds.fulfilled, (state, { payload }: any) => {
        let newPayload;

        state.isLoading = false;
        state.playerID = payload.uid;

        // if (!_.isEmpty(payload.rounds)) {
        //   newPayload = {
        //     rounds: payload.rounds.map((rt: any) => {
        //       return JSON.parse(rt);
        //     })
        //   };
        // }

        state.rounds = _.isEmpty(payload.rounds)
          ? []
          : payload.rounds.map((rt: any) => {
            return JSON.parse(rt);
          });
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
