import { create } from 'zustand';
import { IRoundInitialState } from '@/types/roundData.types';

interface RoundHolesState extends IRoundInitialState {
  resetRounds: () => void;
}

const initialRoundHoles: IRoundInitialState = {
  isLoading: false,
  mainData: {
    roundID: 0,
    roundDate: "",
    roundCourse: "",
  },
  holes: []
};

export const useRoundHolesStore = create<RoundHolesState>()(
  (set) => ({
    ...initialRoundHoles,
    resetRounds: () => set(initialRoundHoles),
  })
);
