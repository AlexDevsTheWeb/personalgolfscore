import { create } from 'zustand';
import { IRoundDistanceInitialState } from '@/types/roundTotals.types';
import { initialStateDistance } from '@/utils/constant.utils';

interface RoundDistanceState extends IRoundDistanceInitialState {
  setRoundDistance: (distances: IDistance[]) => void;
  resetDistance: () => void;
}

interface IDistance {
  club: string;
  mt: number[];
  avg: number;
}

const initialDistance: IRoundDistanceInitialState = {
  isLoading: false,
  roundDistance: initialStateDistance,
};

export const useRoundDistanceStore = create<RoundDistanceState>()(
  (set) => ({
    ...initialDistance,
    setRoundDistance: (roundDistance) => set({ roundDistance }),
    resetDistance: () => set(initialDistance),
  })
);
