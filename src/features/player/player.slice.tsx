import { IGetPlayerDetailsPayload, IGolfBagData, InitialStatePlayer, IPlayerStateData, IUpdateGolfBagPayload, IUpdatePlayerProfilePayload } from "@/types/player.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPlayerInfoThunk, updatePlayerGolfBagThunk, updatePlayerProfileThunk } from "./player.thunk";

const initialState: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
  player: {} as IPlayerStateData,
};

export const getPlayerDetails = createAsyncThunk<
  IGetPlayerDetailsPayload,
  string,
  { rejectValue: string }
>(
  "player/getPlayerDetails",
  getPlayerInfoThunk
);

export const updatePlayerProfile = createAsyncThunk<
  Partial<IPlayerStateData>, // Return type on success
  IUpdatePlayerProfilePayload, // Payload type
  { rejectValue: string } // Reject value type
>(
  "player/updatePlayerProfile",
  updatePlayerProfileThunk
);
export const updatePlayerGolfbag = createAsyncThunk<
  IGolfBagData,
  IUpdateGolfBagPayload,
  { rejectValue: string }
>(
  "player/updatePlayerGolfbag",
  updatePlayerGolfBagThunk
);

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, { payload }: PayloadAction<IPlayerStateData>) => {
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
          state.player = {} as IPlayerStateData;
          console.warn("getPlayerDetails.fulfilled: Payload received, but no 'player' object found.");
        }
      })
      .addCase(getPlayerDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.error = payload?.status || 'Unknown Error';
        state.errorMessage = payload.statusText || payload || 'Fauloed to fetch player';
        state.player = {} as IPlayerStateData;
      })

      .addCase(updatePlayerGolfbag.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.errorMessage = '';
      })
      .addCase(updatePlayerGolfbag.fulfilled, (state, action: PayloadAction<IGolfBagData>) => {
        state.isLoading = false;
        if (state.player) {
          state.player.golfBag = action.payload;
        }
        else {
          console.warn('updatePlayerGolfBag.fulfilled: Player state was null, cannot update golfbag');
        }
      })
      .addCase(updatePlayerGolfbag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update golf bag';
        state.errorMessage = typeof action.payload === 'string' ? action.payload : 'Failed to update golf bag';
      })
      // Reducers for updatePlayerProfile
      .addCase(updatePlayerProfile.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.errorMessage = '';
      })
      .addCase(updatePlayerProfile.fulfilled, (state, action: PayloadAction<Partial<IPlayerStateData>>) => {
        state.isLoading = false;
        // Merge the updated data into the existing player state
        state.player = { ...state.player, ...action.payload };
      })
      .addCase(updatePlayerProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update profile';
        state.errorMessage = typeof action.payload === 'string' ? action.payload : 'Failed to update profile';
      });
  },
});

export const { resetPlayer, setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
