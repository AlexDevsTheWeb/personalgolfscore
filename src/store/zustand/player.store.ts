import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { InitialStatePlayer, IPlayerStateData, IGolfBagData, IGetPlayerDetailsPayload, IUpdateGolfBagPayload, IUpdatePlayerProfilePayload } from '@/types/player.types';
import { getPlayerInfoThunk, updatePlayerGolfBagThunk, updatePlayerProfileThunk } from '@/features/player/player.thunk';

interface PlayerState extends InitialStatePlayer {
  setPlayer: (player: IPlayerStateData) => void;
  getPlayerDetails: (uid: string) => Promise<IGetPlayerDetailsPayload | null>;
  updatePlayerProfile: (payload: IUpdatePlayerProfilePayload) => Promise<Partial<IPlayerStateData> | null>;
  updatePlayerGolfbag: (payload: IUpdateGolfBagPayload) => Promise<IGolfBagData | null>;
  resetPlayer: () => void;
}

const initialPlayer: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
  player: {} as IPlayerStateData,
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      ...initialPlayer,
      setPlayer: (player) => set({ isLoading: false, player }),
      getPlayerDetails: async (uid) => {
        set({ isLoading: true, error: '', errorMessage: '' });
        try {
          const result = await getPlayerInfoThunk(uid, { rejectWithValue: (msg: string) => msg });
          if (typeof result === 'string') {
            set({ isLoading: false, error: 'Unknown Error', errorMessage: result });
            return null;
          }
          set({ isLoading: false, player: result.player });
          return result;
        } catch (error: unknown) {
          const err = error as { status?: string; statusText?: string; message?: string };
          set({ 
            isLoading: false, 
            error: err.status || 'Unknown Error', 
            errorMessage: err.statusText || err.message || 'Failed to fetch player',
            player: {} as IPlayerStateData 
          });
          return null;
        }
      },
      updatePlayerGolfbag: async (payload) => {
        set({ isLoading: true, error: '', errorMessage: '' });
        try {
          const result = await updatePlayerGolfBagThunk(payload, { rejectWithValue: (msg: string) => msg });
          if (typeof result === 'string') {
            set({ isLoading: false, error: result, errorMessage: result });
            return null;
          }
          set((state) => ({ 
            isLoading: false, 
            player: state.player ? { ...state.player, golfBag: result } : state.player 
          }));
          return result;
        } catch (error: unknown) {
          const errMsg = error instanceof Error ? error.message : 'Failed to update golf bag';
          set({ isLoading: false, error: errMsg, errorMessage: errMsg });
          return null;
        }
      },
      updatePlayerProfile: async (payload) => {
        set({ isLoading: true, error: '', errorMessage: '' });
        try {
          const result = await updatePlayerProfileThunk(payload, { rejectWithValue: (msg: string) => msg });
          if (typeof result === 'string') {
            set({ isLoading: false, error: result, errorMessage: result });
            return null;
          }
          set((state) => ({ 
            isLoading: false, 
            player: state.player ? { ...state.player, ...result } : state.player 
          }));
          return result;
        } catch (error: unknown) {
          const errMsg = error instanceof Error ? error.message : 'Failed to update profile';
          set({ isLoading: false, error: errMsg, errorMessage: errMsg });
          return null;
        }
      },
      resetPlayer: () => set(initialPlayer),
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
