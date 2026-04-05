import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { InitialStateRounds } from '@/types/round.types';
import { IBasicRoundData } from '@/types/roundData.types';

interface RoundsState extends InitialStateRounds {
  setRounds: (rounds: IBasicRoundData[]) => void;
  setPlayerID: (playerID: string) => void;
  resetRounds: () => void;
}

const initialRounds: InitialStateRounds = {
  isLoading: false,
  playerID: "",
  rounds: [],
};

export const useRoundsStore = create<RoundsState>()(
  devtools(
    persist(
      (set) => ({
        ...initialRounds,
        setRounds: (rounds) => set({ rounds }),
        setPlayerID: (playerID) => set({ playerID }),
        resetRounds: () => set(initialRounds),
      }),
      {
        name: 'rounds-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'RoundsStore' }
  )
);
