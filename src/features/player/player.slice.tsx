import { IGolfBagData, InitialStatePlayer, IPlayerDetails } from "@/types/player.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlayerInfoThunk, updatePlayerGolfBagThunk } from "./player.thunk";


const initialState: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
  player: {} as IPlayerDetails,
};


export const getPlayerDetails = createAsyncThunk(
  "player/getPlayerDetails",
  getPlayerInfoThunk
);
export const updatePlayerGolfbag = createAsyncThunk(
  "player/updatePlayerGolfbag",
  updatePlayerGolfBagThunk
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
      .addCase(getPlayerDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload && action.payload.player) {
          state.player = action.payload.player;
        }
        else {
          state.player = {} as Omit<IPlayerDetails, 'rounds'>;
        }
      })
      .addCase(getPlayerDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload.status;
        state.errorMessage = payload.statusText;
      })

      .addCase(updatePlayerGolfbag.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updatePlayerGolfbag.fulfilled, (state, action: PayloadAction<IGolfBagData>) => {
        state.isLoading = false;
        if (state.player) {
          state.player.golfbag = action.payload;
        }
      })
      .addCase(updatePlayerGolfbag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // Store the error message
      });
  },
});

export const { resetPlayer, setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
