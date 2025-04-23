import { IRoundDetails, IRoundDetailState } from "@/types/roundDetails.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoundDetailsThunk } from "./roundDetails.thunk";

const initialState: IRoundDetailState = {
  isLoading: false,
  round: null,
  error: null,
};

export const getRoundDetails = createAsyncThunk<
  IRoundDetails,
  { playerId: string, roundId: string },
  { rejectValue: string }
>(
  "roundDetail/getRoundDetails",
  getRoundDetailsThunk
);

const roundDetailsSlice = createSlice({
  name: 'roundDetails',
  initialState,
  reducers: {
    clearRoundDetails: (state) => {
      state.round = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoundDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.round = null;
      })
      .addCase(getRoundDetails.fulfilled, (state, action: PayloadAction<IRoundDetails>) => {
        state.isLoading = false;
        state.round = action.payload;
      })
      .addCase(getRoundDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch round details';
      });
  },
});

export const { clearRoundDetails } = roundDetailsSlice.actions;
export default roundDetailsSlice.reducer;