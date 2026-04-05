import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IRoundTotalsInitialState, IRoundTotals } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';

interface RoundTotalsState extends IRoundTotalsInitialState {
  setRoundTotals: (totals: IRoundTotals) => void;
  resetRounds: () => void;
}

const initialTotals: IRoundTotalsInitialState = {
  isLoading: false,
  roundTotals: initialStateRoundTotals,
};

export const useRoundTotalsStore = create<RoundTotalsState>()(
  devtools(
    (set) => ({
      ...initialTotals,
      setRoundTotals: (roundTotals) => set({ roundTotals }),
      resetRounds: () => set(initialTotals),
    }),
    { name: 'RoundTotalsStore' }
  )
);
