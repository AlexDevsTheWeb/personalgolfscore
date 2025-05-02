import { CLUBSSELECTION } from "@/enum/shots.enum";
import { InitialStateClubs } from "@/types/clubs.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialStateClubs = {
  isLoading: false,
  totalClubs: 0,
  selectedClubs: 0,
  clubs: {
    playerID: "",
    types: [],
  },
  teeClubs: [],
  distanceClubs: [],
  greenClubs: [],
  chipClubs: [],
  error: {
    errorCode: 0,
    errorMessage: "",
  }
};

const golfBagSlice = createSlice({
  name: "golfBag",
  initialState,
  reducers: {
    updateClub: (state, action) => { },
    updateClubSelection: (state, { payload }) => {
      const { name, clubNumber, loft, selected, typeName } = payload;

      const typeIndex = state.clubs.types.findIndex((type) => type.typeName === typeName);

      if (typeIndex !== -1) {
        const clubIndex = state.clubs.types[typeIndex].details.findIndex((detail) => {
          return (
            detail.clubNumber === clubNumber &&
            detail.name === name &&
            detail.loft === loft
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
    updateTeeGreenClubs: (state, { payload }) => {
      switch (payload.type) {
        case CLUBSSELECTION.TEE:
          state.teeClubs = payload.updatedTeeClubs;
          break;
        case CLUBSSELECTION.DISTANCE:
          state.distanceClubs = payload.updatedDistanceClubs;
          break;
        case CLUBSSELECTION.GREEN:
          state.greenClubs = payload.updatedGreenClubs;
          break;
        case CLUBSSELECTION.CHIP:
          state.chipClubs = payload.updatedChipClubs;
          break;
        default:
          break;
      }
    },
    resetClubs: () => initialState,
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { resetClubs, updateClubSelection, updateClub, updateTeeGreenClubs } = golfBagSlice.actions;
export default golfBagSlice.reducer;