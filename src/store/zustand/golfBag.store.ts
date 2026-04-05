import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { InitialStateClubs } from '@/types/clubs.types';
import { CLUBSSELECTION } from '@/enum/shots.enum';

interface GolfBagState extends InitialStateClubs {
  updateClub: () => void;
  updateClubSelection: (payload: { name: string; clubNumber: number | string; loft: number; selected: boolean; typeName: string }) => void;
  updateTeeGreenClubs: (payload: { type: CLUBSSELECTION; updatedTeeClubs?: string[]; updatedDistanceClubs?: string[]; updatedGreenClubs?: string[]; updatedChipClubs?: string[] }) => void;
  resetClubs: () => void;
}

const initialGolfBag: InitialStateClubs = {
  isLoading: false,
  totalClubs: 0,
  selectedClubs: 0,
  clubs: {
    playerID: "",
    types: [],
  },
  teeClubs: [],
  distanceClubs: [],
  greenClubs: [],
  chipClubs: [],
  error: {
    errorCode: 0,
    errorMessage: "",
  }
};

export const useGolfBagStore = create<GolfBagState>()(
  devtools(
    persist(
      (set) => ({
        ...initialGolfBag,
        updateClub: () => { },
        updateClubSelection: ({ name, clubNumber, loft, selected, typeName }) => {
          set((state) => {
            const typeIndex = state.clubs.types.findIndex((type) => type.typeName === typeName);
            if (typeIndex === -1) return state;

            const clubIndex = state.clubs.types[typeIndex].details.findIndex((detail) =>
              detail.clubNumber === clubNumber &&
              detail.name === name &&
              detail.loft === loft
            );

            if (clubIndex === -1) return state;

            const newTypes = [...state.clubs.types];
            newTypes[typeIndex] = {
              ...newTypes[typeIndex],
              details: newTypes[typeIndex].details.map((detail, idx) =>
                idx === clubIndex ? { ...detail, selected } : detail
              )
            };

            return {
              clubs: { ...state.clubs, types: newTypes },
              selectedClubs: newTypes.reduce(
                (acc, curr) => acc + curr.details.filter((detail) => detail.selected).length,
                0
              ),
            };
          });
        },
        updateTeeGreenClubs: ({ type, updatedTeeClubs, updatedDistanceClubs, updatedGreenClubs, updatedChipClubs }) => {
          set((state) => {
            switch (type) {
              case CLUBSSELECTION.TEE:
                return { ...state, teeClubs: updatedTeeClubs || state.teeClubs };
              case CLUBSSELECTION.DISTANCE:
                return { ...state, distanceClubs: updatedDistanceClubs || state.distanceClubs };
              case CLUBSSELECTION.GREEN:
                return { ...state, greenClubs: updatedGreenClubs || state.greenClubs };
              case CLUBSSELECTION.CHIP:
                return { ...state, chipClubs: updatedChipClubs || state.chipClubs };
              default:
                return state;
            }
          });
        },
        resetClubs: () => set(initialGolfBag),
      }),
      {
        name: 'golfBag-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'GolfBagStore' }
  )
);
