import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlayerInfoThunk } from "./player.thunk";
import { IPlayer, InitialStatePlayer, PlayerPayload } from "../../types/player.types";
// import { editCarrierThunk, getCarrierDetailsThunk } from "./carrierThunk";
// import {
//   CarrierPayload,
//   CarrierResponse,
//   InitialStateCarrier,
// } from "types/Carrier";

const initialState: InitialStatePlayer = {
  isLoading: false,
  player: {} as IPlayer,
};

export const getPlayerDetails = createAsyncThunk(
  "player/getPlayerDetails",
  getPlayerInfoThunk
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // setIsEditing: (state, { payload }) => {
    //   state.isEditing = payload;
    // },
    // setCarrierLogo: (state, { payload }) => {
    //   state.carrierLogo = payload;
    // },
    resetPlayer: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayerDetails.fulfilled, (state, { payload }: PlayerPayload) => {
        state.isLoading = false;
        state.player = payload;
      })
      .addCase(getPlayerDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetPlayer } = playerSlice.actions;
export default playerSlice.reducer;
