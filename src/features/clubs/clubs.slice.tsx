import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClubsThunk } from "./clubs.thunk";
import { InitialStateClubs, ClubPayload } from "../../types/clubs.types";
import { RootState } from "../../store/store";

const initialState: InitialStateClubs = {
  isLoading: false,
  totalClubs: 0,
  clubs: {
    playerID: "",
    types: [],
  },
  error: {
    errorCode: 0,
    errorMessage: "",
  }
};

export const getClubsDetails = createAsyncThunk(
  "clubs/getClubsDetails",
  getClubsThunk
);

const clubsSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    setClubInserted: (state, { payload }) => {
      // Implement logic to update state.clubs with new club data
    },
    resetClubs: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubsDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClubsDetails.fulfilled, (state, { payload }: ClubPayload) => {
        state.isLoading = false;
        state.clubs = payload;
        // Calculate total clubs from payload.clubs data
        state.totalClubs = payload.types.reduce(
          (acc, curr) => acc + curr.details.length,
          0
        );
      })
      .addCase(getClubsDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.clubs = [] as never;
        state.error.errorCode = 100;
        state.error.errorMessage = "ERROR!"
        // Dispatch a separate clubsError action with error information (optional)
      });
  },
});

// Selector function to get all clubs
export const selectAllClubs = (state: RootState) => state.clubs.clubs;

export const { resetClubs } = clubsSlice.actions;
export default clubsSlice.reducer;