import { InitialStateUser, IUser, ThemeMode } from '@/types/user.types';
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateUserThemePreferenceThunk } from './user.thunk';


const initialState: InitialStateUser = {
  isLoading: false,
  user: {},
  themePreference: 'light',
  rounds: {}
}

export const updateUserThemePreference = createAsyncThunk<
  void,
  { playerId: string, theme: ThemeMode },
  { rejectValue: string }
>(
  "user/updateUserTheme",
  updateUserThemePreferenceThunk
);

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
    setThemePreference: (state, action: PayloadAction<ThemeMode>) => {
      state.themePreference = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Optional: Handle pending/rejected states for the theme update if needed
    builder
      .addCase(updateUserThemePreference.pending, (state) => {
        // Optionally indicate loading state if you want UI feedback
        state.isLoading = true;
      })
      .addCase(updateUserThemePreference.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserThemePreference.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Failed to update theme preference:", action.payload);
      });

  },
});

export const { resetUser, setLoginUser, setThemePreference } = userSlice.actions;
export default userSlice.reducer;