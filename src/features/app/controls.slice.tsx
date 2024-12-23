import { IControls } from "@/types/controls.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IControls = {
  showDistances: false,
};

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setShowDistances: (state, { payload }: PayloadAction<boolean>) => {
      state.showDistances = payload;
    },
    resetControls: () => initialState,
  },
  extraReducers: () => { }
});

export const { resetControls, setShowDistances } = controlsSlice.actions;
export default controlsSlice.reducer;