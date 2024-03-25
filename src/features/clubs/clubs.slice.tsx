import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClubsThunk } from "./clubs.thunk";
import { InitialStateClubs, ClubPayload } from "../../types/clubs.types";
// import { editCarrierThunk, getCarrierDetailsThunk } from "./carrierThunk";
// import {
//   CarrierPayload,
//   CarrierResponse,
//   InitialStateCarrier,
// } from "types/Carrier";

const initialState: InitialStateClubs = {
  isLoading: false,
  clubs: [],
};

export const getClubsDetails = createAsyncThunk(
  "clubs/getClubsDetails",
  getClubsThunk
);

const clubsSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    // setIsEditing: (state, { payload }) => {
    //   state.isEditing = payload;
    // },
    // setCarrierLogo: (state, { payload }) => {
    //   state.carrierLogo = payload;
    // },
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
      })
      .addCase(getClubsDetails.rejected, (state, { payload }: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetClubs } = clubsSlice.actions;
export default clubsSlice.reducer;
