import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IControls } from '@/types/controls.types';

interface ControlsState extends IControls {
  setShowDistances: (show: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  resetControls: () => void;
}

const initialControls: IControls = {
  showDistances: false,
  isLoading: false,
};

export const useControlsStore = create<ControlsState>()(
  persist(
    (set) => ({
      ...initialControls,
      setShowDistances: (showDistances) => set({ showDistances }),
      setIsLoading: (isLoading) => set({ isLoading }),
      resetControls: () => set(initialControls),
    }),
    {
      name: 'controls-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
