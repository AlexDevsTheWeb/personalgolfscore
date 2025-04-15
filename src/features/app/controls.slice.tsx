import { IControls } from "@/types/controls.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IControls = {
  showDistances: false,
  isLoading: false,
};

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setShowDistances: (state, { payload }: PayloadAction<boolean>) => {
      state.showDistances = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    resetControls: () => initialState,
  },
  extraReducers: () => { }
});

export const { resetControls, setShowDistances, setIsLoading } = controlsSlice.actions;
export default controlsSlice.reducer;