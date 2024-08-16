import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClubsThunk } from "./golfBag.thunk";
import { InitialStateClubs, ClubPayload } from "../../types/clubs.types";

const initialState: InitialStateClubs = {
  isLoading: false,
  totalClubs: 0,
  selectedClubs: 0,
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
  "golfBag/getClubsDetails",
  getClubsThunk
);

const golfBagSlice = createSlice({
  name: "golfBag",
  initialState,
  reducers: {
    updateClub: (state, action) => {
      const { clubName, propertyName, newValue, typeName } = action.payload;

      const typeIndex = state.clubs.types.findIndex((type) => type.typeName === typeName);

      if (typeIndex !== -1) {
        const clubIndex = state.clubs.types.findIndex((type) =>
          type.details.some((detail) => detail.name === clubName)
        );

        // if (clubIndex !== -1) {
        //   state.clubs.types[typeIndex].details[clubIndex][propertyName] = newValue; // Update property value
        // }
      }

    },
    updateClubSelection: (state, { payload }) => {
      const { name, clubNumber, loft, selected, typeName } = payload;

      const typeIndex = state.clubs.types.findIndex((type) => type.typeName === typeName);

      if (typeIndex !== -1) {
        const clubIndex = state.clubs.types[typeIndex].details.findIndex((detail) => {
          return (
            detail.clubNumber === clubNumber &&
            detail.name === name &&
            detail.loft === loft // Add loft check if applicable
          );
        });

        if (clubIndex !== -1) {
          state.clubs.types[typeIndex].details[clubIndex].selected = selected;
          state.selectedClubs = state.clubs.types.reduce(
            (acc, curr) => acc + curr.details.filter((detail) => detail.selected).length,
            0
          );
        }
      }
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
        state.totalClubs = payload.types.reduce(
          (acc, curr) => acc + curr.details.length,
          1
        );
        state.selectedClubs = payload.types.reduce(
          (acc, curr) => acc + curr.details.filter((detail) => detail.selected).length,
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

export const { resetClubs, updateClubSelection, updateClub } = golfBagSlice.actions;
export default golfBagSlice.reducer;