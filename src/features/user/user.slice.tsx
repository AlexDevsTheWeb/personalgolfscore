import { InitialStateUser, IUser } from "@/types/user.types";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateUser = {
  isLoading: false,
  user: {},
  rounds: {}
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    setLoginUser: (state, { payload }: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = payload;
      state.user.uid = readUserLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder

  },
});

export const { resetUser, setLoginUser } = userSlice.actions;
export default userSlice.reducer;