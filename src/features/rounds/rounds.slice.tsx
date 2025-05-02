import { IGetPlayerDetailsPayload } from "@/types/player.types";
import { InitialStateRounds } from "@/types/round.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlayerDetails } from "../player/player.slice";

const initialState: InitialStateRounds = {
  isLoading: false,
  playerID: "",
  rounds: [],
}



const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder


      .addCase(getPlayerDetails.pending, (state) => {
        if (!state.isLoading) {
          state.isLoading = true;
        }
      })
      .addCase(getPlayerDetails.fulfilled, (state, action: PayloadAction<IGetPlayerDetailsPayload>) => {

        state.isLoading = false;
        if (action.payload && action.payload.player) {
          state.rounds = action.payload.rounds;
          if (action.payload.player) {
            state.playerID = action.payload.player.uid;
          }
        }
        else {
          console.warn("getPlayerDetails.fulfilled: Payload received, but no 'rounds' array found.");
          state.rounds = [];
        }
      })
      .addCase(getPlayerDetails.rejected, (state, action) => {
        state.playerID = '';
        state.isLoading = false;
        state.rounds = [];
      });
  },
});

export const { resetRounds } = roundsSlice.actions;
export default roundsSlice.reducer;
