import { create } from 'zustand';
import { IRoundDetails, IRoundDetailState } from '@/types/roundDetails.types';
import { getRoundDetailsThunk } from '@/features/round/roundDetails.thunk';

interface RoundDetailsState extends IRoundDetailState {
  getRoundDetails: (playerId: string, roundId: string) => Promise<IRoundDetails | null>;
  clearRoundDetails: () => void;
}

const initialState: IRoundDetailState = {
  isLoading: false,
  round: null,
  error: null,
};

export const useRoundDetailsStore = create<RoundDetailsState>()(
  (set) => ({
    ...initialState,
    getRoundDetails: async (playerId, roundId) => {
      set({ isLoading: true, error: null, round: null });
      try {
        const result = await getRoundDetailsThunk(
          { playerId, roundId },
          { rejectWithValue: (msg: string) => msg }
        );
        if (typeof result === 'string') {
          set({ isLoading: false, error: result });
          return null;
        }
        set({ isLoading: false, round: result });
        return result;
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : 'Failed to fetch round details';
        set({ isLoading: false, error: errMsg });
        return null;
      }
    },
    clearRoundDetails: () => set({ round: null, isLoading: false, error: null }),
  })
);
