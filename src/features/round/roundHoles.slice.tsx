import { IRoundInitialState } from "@/types/roundData.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IRoundInitialState = {
  isLoading: false,
  mainData: {
    roundID: 0,
    roundDate: "",
    roundCourse: "",
  },
  holes: []
}


const roundHolesSlice = createSlice({
  name: "roundHoles",
  initialState,
  reducers: {
    resetRounds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
  },
});

export const { resetRounds } = roundHolesSlice.actions;
export default roundHolesSlice.reducer;
