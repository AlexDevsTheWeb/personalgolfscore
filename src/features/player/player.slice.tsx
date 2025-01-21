import { InitialStatePlayer, IPlayer } from "@/types/player.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlayerInfoThunk } from "./player.thunk";


const initialState: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
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
    setPlayer: (state, { payload }: PayloadAction<any>) => {
      state.isLoading = false;
      state.player = payload;
    },
    resetPlayer: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlayerDetails.fulfilled, (state, { payload }: PayloadAction<{ data: IPlayer }>) => {
        state.isLoading = false;
        state.player = payload.data;
      })
      .addCase(getPlayerDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload.status;
        state.errorMessage = payload.statusText;
      });
  },
});

export const { resetPlayer, setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
