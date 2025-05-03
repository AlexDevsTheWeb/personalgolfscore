import { RootState } from '@/store/store'; // Assuming your store is here
import { InitialStateUser, IUser, ThemeMode } from '@/types/user.types';
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { fetchThemePreferenceThunk, updateUserThemePreferenceThunk } from './user.thunk';


const initialState: InitialStateUser = {
  isLoading: false,
  user: {},
  themePreference: 'light',
  rounds: {}
}

export const updateUserThemePreference = createAsyncThunk<
  ThemeMode, // Return the updated theme mode on success
  { playerId: string, theme: ThemeMode },
  { rejectValue: string }
>(
  "user/updateUserTheme",
  updateUserThemePreferenceThunk
);

export const fetchInitialTheme = createAsyncThunk<
  ThemeMode, // Return the fetched theme mode on success
  string, // Expect playerId as argument
  { rejectValue: string }
>(
  "user/fetchInitialTheme",
  async (playerId, thunkAPI) => { // Use inline async function to call the actual thunk implementation
    return fetchThemePreferenceThunk(playerId, thunkAPI);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    setLoginUser: (state, { payload }: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = payload;
      // Remove this line - uid will be sourced from the player slice
    },
    setThemePreference: (state, action: PayloadAction<ThemeMode>) => {
      state.themePreference = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Optional: Handle pending/rejected states for the theme update if needed
    builder
      // Handle theme updates (saving)
      .addCase(updateUserThemePreference.fulfilled, (state, action) => {
        state.themePreference = action.payload;
      })
      // Handle initial theme fetch
      .addCase(fetchInitialTheme.fulfilled, (state, action) => {
        state.themePreference = action.payload;
      })
      // Handle rejected cases for both theme thunks
      .addMatcher(
        isAnyOf(updateUserThemePreference.rejected, fetchInitialTheme.rejected),
        (state, action) => {
          console.error("Theme thunk failed:", action.type, action.payload);
          // Optionally set an error state
        }
      )
    // Optional: Handle pending for initial fetch if needed
    // .addMatcher(isAnyOf(updateUserThemePreference.pending, fetchInitialTheme.pending), (state) => {
    //   console.error("Failed to update theme preference:", action.payload);
    // });

  },
});

export const { resetUser, setLoginUser, setThemePreference } = userSlice.actions;

// Selector to get the current theme preference
export const selectCurrentUserThemePreference = (state: RootState): ThemeMode => state.user.themePreference;

export default userSlice.reducer;