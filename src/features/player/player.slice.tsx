import { IGetPlayerDetailsPayload, IGolfBagData, InitialStatePlayer, IPlayerDetails } from "@/types/player.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlayerInfoThunk, updatePlayerGolfBagThunk } from "./player.thunk";

const initialState: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
  player: {} as Omit<IPlayerDetails, 'rounds'>,
};


export const getPlayerDetails = createAsyncThunk<
  IGetPlayerDetailsPayload,
  string,
  { rejectValue: string }
>(
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
    setPlayer: (state, { payload }: PayloadAction<Omit<IPlayerDetails, 'rounds'>>) => {
      state.isLoading = false;
      state.player = payload;
    },
    resetPlayer: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerDetails.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.errorMessage = '';
      })
      .addCase(getPlayerDetails.fulfilled, (state, action: PayloadAction<IGetPlayerDetailsPayload>) => {
        state.isLoading = false;
        if (action.payload && action.payload.player) {
          state.player = action.payload.player;
        }
        else {
          state.player = {} as Omit<IPlayerDetails, 'rounds'>;
          console.warn("getPlayerDetails.fulfilled: Payload received, but no 'player' object found.");
        }
      })
      .addCase(getPlayerDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload?.status || 'Unknown Error';
        state.errorMessage = payload.statusText || payload || 'Fauloed to fetch player';
        state.player = {} as Omit<IPlayerDetails, 'rounds'>;
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
