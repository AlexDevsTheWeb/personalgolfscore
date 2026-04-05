import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { INewRound, InitialStateNewRound, IInitialStateRoundSave } from '@/types/round.types';
import { InitialStateNewRoundsData, IShots, InitialStateNewRoundDistances } from '@/types/roundData.types';
import { IRoundTotalsInitialState } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { calculateGirValue, calculateGreenApproachCounts, calculatePuttLengthCounts, calculateScrambleValue, calculateStablefordPoints, calculateUDValue } from '@/utils/shots/shots.utils';
import { totalsCalculator } from '@/utils/calculator/TotalsCalculator.utils';
import { saveNewRoundThunk } from '@/features/newRound/roundSaver.thunk';
import { calculateAvg } from '@/utils/round/round.utils';
import dayjs, { Dayjs } from 'dayjs';

interface INewRoundClubsInitialState {
  teeClubs: string[];
  distanceClubs: string[];
  greenClubs: string[];
  chipClubs: string[];
}

interface NewRoundState {
  main: InitialStateNewRound;
  holes: InitialStateNewRoundsData;
  totals: IRoundTotalsInitialState;
  holeTmp: IShots;
  distances: InitialStateNewRoundDistances;
  clubs: INewRoundClubsInitialState;
  saver: IInitialStateRoundSave;
  setRoundMainData: (round: Partial<INewRound>) => void;
  setRoundDate: (date: Dayjs | null) => void;
  setRoundCourse: (course: string) => void;
  setRoundHoles: (holes: number) => void;
  setRoundTee: (tee: string) => void;
  setRoundPar: (par: number) => void;
  setRoundPlayingHCP: (hcp: number) => void;
  setRoundNumber: (number: number) => void;
  setPlayerID: (playerID: string) => void;
  setFirstHole: () => void;
  resetSetFirstHole: () => void;
  setNewHole: (holeAdjusted: Partial<IShots>, roundPlayingHCP: number, roundHoles: number) => void;
  setTotalsByHole: (holes: IShots[]) => void;
  setTmpHoleData: (payload: { name: keyof IShots; value: string | number | number[] | boolean; roundPlayingHCP: number; roundHoles: number; chipClubs: string[] }) => void;
  setHoleNumber: (holeNumber: number) => void;
  resetNewRoundHoleTmp: () => void;
  addTeeShotDistance: (club: string, distance: number) => void;
  addApproachShotDistance: (club: string, distance: number) => void;
  addNewDistanceWithClub: (distances: IDistance[]) => void;
  setNewRoundClubs: (clubs: INewRoundClubsInitialState) => void;
  saveNewRound: () => Promise<{ success: boolean; roundId: string } | null>;
  resetNewRound: () => void;
}

interface IDistance {
  club: string;
  mt: number[];
  avg: number;
}

const initialNewRoundMain: InitialStateNewRound = {
  isLoading: false,
  isSaved: false,
  playerID: '',
  setFirstHole: false,
  round: {
    roundDate: '',
    roundCourse: '',
    roundHoles: 0,
    roundTee: '',
    roundPar: 0,
    roundPlayingHCP: 0,
    roundNumber: 0
  }
};

const initialNewRoundHoles: InitialStateNewRoundsData = {
  isLoading: false,
  playerID: '',
  roundID: '',
  holesCompleted: 0,
  holes: [],
};

const initialNewRoundTotals: IRoundTotalsInitialState = {
  isLoading: false,
  roundTotals: initialStateRoundTotals
};

const initialNewRoundDistances: InitialStateNewRoundDistances = {
  isLoading: false,
  roundDistances: [],
};

const initialNewRoundClubs: INewRoundClubsInitialState = {
  teeClubs: [],
  distanceClubs: [],
  greenClubs: [],
  chipClubs: [],
};

const initialRoundSaver: IInitialStateRoundSave = {
  isLoading: false,
  roundId: '',
  success: false,
};

export const useNewRoundStore = create<NewRoundState>()(
  devtools(
    persist(
      (set, get) => ({
      main: initialNewRoundMain,
      holes: initialNewRoundHoles,
      totals: initialNewRoundTotals,
      holeTmp: {} as IShots,
      distances: initialNewRoundDistances,
      clubs: initialNewRoundClubs,
      saver: initialRoundSaver,

      setRoundMainData: (round) => {
        const { main } = get();
        const updatedRound = main.round.roundDate && dayjs.isDayjs(round.roundDate)
          ? { ...round, roundDate: round.roundDate.toISOString() }
          : round;
        set({
          main: {
            ...main,
            round: { ...main.round, ...updatedRound },
            setFirstHole: true
          }
        });
      },
      setRoundDate: (date) => {
        const { main } = get();
        const roundDate = date && dayjs.isDayjs(date) && date.isValid() ? date.toISOString() : '';
        set({ main: { ...main, round: { ...main.round, roundDate } } });
      },
      setRoundCourse: (course) => set((state) => ({ main: { ...state.main, round: { ...state.main.round, roundCourse: course } } })),
      setRoundHoles: (holes) => set((state) => ({ main: { ...state.main, round: { ...state.main.round, roundHoles: Number.isNaN(Number(holes)) ? 0 : Number(holes) } } })),
      setRoundTee: (tee) => set((state) => ({ main: { ...state.main, round: { ...state.main.round, roundTee: tee } } })),
      setRoundPar: (par) => set((state) => ({ main: { ...state.main, round: { ...state.main.round, roundPar: Number.isNaN(Number(par)) ? 0 : Number(par) } } })),
      setRoundPlayingHCP: (hcp) => set((state) => ({ main: { ...state.main, round: { ...state.main.round, roundPlayingHCP: Number.isNaN(Number(hcp)) ? 0 : Number(hcp) } } })),
      setRoundNumber: (number) => set((state) => ({ main: { ...state.main, round: { ...state.main.round, roundNumber: Number.isNaN(Number(number)) ? 0 : Number(number) } } })),
      setPlayerID: (playerID) => set((state) => ({ main: { ...state.main, playerID } })),
      setFirstHole: () => set((state) => ({ main: { ...state.main, setFirstHole: true } })),
      resetSetFirstHole: () => set((state) => ({ main: { ...state.main, setFirstHole: false } })),

      setNewHole: (holeAdjusted, roundPlayingHCP, roundHoles) => {
        const { holes } = get();
        const currentHoleNum = holes.holesCompleted + 1;
        const baseHole: IShots = {
          ...holes.holes[0] || {},
          ...holeAdjusted,
          holeNumber: currentHoleNum,
        } as IShots;

        const calculatedPoints = calculateStablefordPoints({
          hcp: baseHole.hcp,
          par: baseHole.par,
          strokes: baseHole.strokes,
          roundPlayingHCP,
          roundHoles,
        }) || 0;

        const calculatedGir = calculateGirValue({
          par: baseHole.par,
          putts: baseHole.putts,
          strokes: baseHole.strokes,
          bogey: false,
          intermediateShots: baseHole.intermediateShots?.length || 0,
        });

        const calculatedGirBogey = calculateGirValue({
          par: baseHole.par,
          putts: baseHole.putts,
          strokes: baseHole.strokes,
          bogey: true,
          intermediateShots: baseHole.intermediateShots?.length || 0,
        });

        const calculatedUpDown = calculateUDValue({
          girValue: calculatedGir ? 1 : 0,
          chipClub: baseHole.chipClub,
          parValue: baseHole.par,
          numberOfPutts: baseHole.putts,
          strokesValue: baseHole.strokes,
          chipClubs: holeAdjusted.chipClubs || [],
          intermediateShots: baseHole.intermediateShots || [],
        });

        const calculatedScramble = calculateScrambleValue({
          girValue: calculatedGir ? 1 : 0,
          parValue: baseHole.par,
          strokesValue: baseHole.strokes,
        });

        const puttCounts = calculatePuttLengthCounts(baseHole.puttsLength);
        const greenApproachCounts = calculateGreenApproachCounts(baseHole.toGreenMeters);

        const finalHole: IShots = {
          ...baseHole,
          points: calculatedPoints,
          gir: calculatedGir,
          girBogey: calculatedGirBogey,
          upDown: calculatedUpDown,
          scramble: calculatedScramble,
          ...puttCounts,
          ...greenApproachCounts,
        };

        set({
          holes: {
            ...holes,
            holes: [...holes.holes, finalHole],
            holesCompleted: holes.holesCompleted + 1,
          }
        });
      },

      setTotalsByHole: (holes) => {
        set({
          totals: {
            isLoading: false,
            roundTotals: totalsCalculator(holes),
          }
        });
      },

      setTmpHoleData: ({ name, value, roundPlayingHCP, roundHoles, chipClubs }) => {
        const { holeTmp } = get();
        const newHoleTmp = { ...holeTmp } as IShots;
        const initialValueType = typeof holeTmp[name];

        if (chipClubs) newHoleTmp.chipClubs = chipClubs;

        if (initialValueType === 'number') {
          const numericValue = value === '' ? 0 : Number(value);
          (newHoleTmp as any)[name] = isNaN(numericValue) ? 0 : numericValue;
        } else if (initialValueType === 'string') {
          if (name === 'greenSide') {
            const stringValue = String(value);
            newHoleTmp.greenSide = stringValue;
            newHoleTmp.greenSideL = 0;
            newHoleTmp.greenSideO = 0;
            newHoleTmp.greenSideR = 0;
            newHoleTmp.greenSideS = 0;
            if (stringValue.length > 0) {
              const flagKey = `greenSide${stringValue.substring(0, 1).toUpperCase()}` as keyof IShots;
              if (flagKey in newHoleTmp && typeof newHoleTmp[flagKey] === 'number') {
                (newHoleTmp as any)[flagKey] = 1;
              }
            }
          } else if (name === 'chipClub') {
            const stringValue = String(value);
            newHoleTmp.chipClub = stringValue;
            if (stringValue.toLowerCase() === 'bunker' || stringValue.toLowerCase() === 'b') {
              newHoleTmp.sand = 1;
            }
          } else {
            (newHoleTmp as any)[name] = String(value);
          }
        } else if (initialValueType === 'boolean') {
          (newHoleTmp as any)[name] = Boolean(value);
        } else if (initialValueType === 'object') {
          (newHoleTmp as any)[name] = value;
        }

        newHoleTmp.bounceBack = newHoleTmp.strokes - newHoleTmp.par;

        if (newHoleTmp.par !== 0 && newHoleTmp.hcp !== 0 && newHoleTmp.strokes !== 0 && Number(roundPlayingHCP) !== 0 && Number(roundHoles) !== 0) {
          newHoleTmp.points = calculateStablefordPoints({
            hcp: Number(newHoleTmp.hcp),
            par: Number(newHoleTmp.par),
            strokes: Number(newHoleTmp.strokes),
            roundPlayingHCP: Number(roundPlayingHCP),
            roundHoles: Number(roundHoles)
          }) ?? 0;
        }

        newHoleTmp.gir = calculateGirValue({
          par: Number(newHoleTmp.par),
          putts: Number(newHoleTmp.putts),
          strokes: Number(newHoleTmp.strokes),
          bogey: false,
          intermediateShots: newHoleTmp.intermediateShots?.length || 0,
        });

        newHoleTmp.girBogey = calculateGirValue({
          par: Number(newHoleTmp.par),
          putts: Number(newHoleTmp.putts),
          strokes: Number(newHoleTmp.strokes),
          bogey: true,
          intermediateShots: newHoleTmp.intermediateShots?.length || 0,
        });

        newHoleTmp.upDown = calculateUDValue({
          girValue: Number(newHoleTmp.gir),
          chipClub: newHoleTmp.chipClub,
          parValue: Number(newHoleTmp.par),
          numberOfPutts: newHoleTmp.putts,
          strokesValue: Number(newHoleTmp.strokes),
          chipClubs: newHoleTmp.chipClubs || [],
          intermediateShots: newHoleTmp.intermediateShots || [],
        });

        if (name !== 'puttsLength') {
          newHoleTmp.scramble = calculateScrambleValue({
            girValue: Number(newHoleTmp.gir),
            parValue: Number(newHoleTmp.par),
            strokesValue: Number(newHoleTmp.strokes),
          });
        }

        set({ holeTmp: newHoleTmp });
      },

      setHoleNumber: (holeNumber) => set((state) => ({ holeTmp: { ...state.holeTmp, holeNumber } })),

      resetNewRoundHoleTmp: () => set({ holeTmp: {} as IShots }),

      addTeeShotDistance: (club, distance) => {
        if (!club || typeof club !== 'string' || club.trim() === '' || typeof distance !== 'number' || distance <= 0) return;
        const { distances } = get();
        const existingIndex = distances.roundDistances.findIndex((d) => d.club === club);
        if (existingIndex !== -1) {
          const newMt = [...distances.roundDistances[existingIndex].mt, distance];
          const newDistances = [...distances.roundDistances];
          newDistances[existingIndex] = { ...newDistances[existingIndex], mt: newMt, avg: calculateAvg(newMt) };
          set({ distances: { ...distances, roundDistances: newDistances } });
        } else {
          set({
            distances: {
              ...distances,
              roundDistances: [...distances.roundDistances, { club, mt: [distance], avg: distance }]
            }
          });
        }
      },

      addApproachShotDistance: (club, distance) => {
        if (!club || typeof club !== 'string' || club.trim() === '' || typeof distance !== 'number' || distance <= 0) return;
        const { distances } = get();
        const existingIndex = distances.roundDistances.findIndex((d) => d.club === club);
        if (existingIndex !== -1) {
          const newMt = [...distances.roundDistances[existingIndex].mt, distance];
          const newDistances = [...distances.roundDistances];
          newDistances[existingIndex] = { ...newDistances[existingIndex], mt: newMt, avg: calculateAvg(newMt) };
          set({ distances: { ...distances, roundDistances: newDistances } });
        } else {
          set({
            distances: {
              ...distances,
              roundDistances: [...distances.roundDistances, { club, mt: [distance], avg: distance }]
            }
          });
        }
      },

      addNewDistanceWithClub: (distances) => set((state) => ({ distances: { ...state.distances, roundDistances: distances } })),

      setNewRoundClubs: (clubs) => set({ clubs }),

      saveNewRound: async () => {
        const { main, holes, totals, distances } = get();
        set({ saver: { isLoading: true, roundId: '', success: false } });

        try {
          const result = await saveNewRoundThunk(
            null,
            {
              getState: () => ({
                newRound: {
                  newRoundMain: main,
                  newRoundHoles: holes,
                  newRoundTotals: totals,
                  newRoundDistances: distances,
                },
                player: { player: { uid: '' } }
              }),
              rejectWithValue: (msg: string) => msg
            }
          );

          if (typeof result === 'string') {
            set({ saver: { isLoading: false, roundId: '', success: false } });
            return null;
          }

          set({ saver: { isLoading: false, roundId: result.roundId, success: result.success } });
          return result;
        } catch (error) {
          set({ saver: { isLoading: false, roundId: '', success: false } });
          return null;
        }
      },

      resetNewRound: () => set({
        main: initialNewRoundMain,
        holes: initialNewRoundHoles,
        totals: initialNewRoundTotals,
        holeTmp: {} as IShots,
        distances: initialNewRoundDistances,
        clubs: initialNewRoundClubs,
        saver: initialRoundSaver,
      }),
    }),
    {
      name: 'newRound-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        main: state.main,
        holes: state.holes,
        totals: state.totals,
        distances: state.distances,
        clubs: state.clubs,
      }),
    }
  ),
  { name: 'NewRoundStore' }
  )
);
