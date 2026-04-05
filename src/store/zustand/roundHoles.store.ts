import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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
  devtools(
    (set) => ({
      ...initialRoundHoles,
      resetRounds: () => set(initialRoundHoles),
    }),
    { name: 'RoundHolesStore' }
  )
);
