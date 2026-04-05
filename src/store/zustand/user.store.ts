import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { IUser, ThemeMode } from '@/types/user.types';
import { updateUserThemePreferenceThunk, fetchThemePreferenceThunk } from '@/features/user/user.thunk';

interface UserState {
  isLoading: boolean;
  user: IUser;
  themePreference: ThemeMode;
  rounds: Record<string, unknown>;
  setLoginUser: (user: IUser) => void;
  setThemePreference: (theme: ThemeMode) => void;
  updateUserThemePreference: (playerId: string, theme: ThemeMode) => Promise<void>;
  fetchInitialTheme: (playerId: string) => Promise<void>;
  resetUser: () => void;
}

const initialUser = {
  isLoading: false,
  user: {},
  themePreference: 'light' as ThemeMode,
  rounds: {},
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialUser,
        setLoginUser: (user) => set({ isLoading: false, user }),
        setThemePreference: (themePreference) => set({ themePreference }),
        updateUserThemePreference: async (playerId, theme) => {
          try {
            const result = await updateUserThemePreferenceThunk({ playerId, theme }, null);
            set({ themePreference: result });
          } catch (error) {
            console.error('Theme thunk failed:', error);
          }
        },
        fetchInitialTheme: async (playerId) => {
          try {
            const result = await fetchThemePreferenceThunk(playerId, null);
            set({ themePreference: result });
          } catch (error) {
            console.error('Theme thunk failed:', error);
          }
        },
        resetUser: () => set(initialUser),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          themePreference: state.themePreference,
        }),
      }
    ),
    { name: 'UserStore' }
  )
);
