import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { IUser, ThemeMode } from '@/types/user.types';
import { IControls } from '@/types/controls.types';
import { InitialStatePlayer, IPlayerStateData, IGolfBagData, IGetPlayerDetailsPayload, IUpdateGolfBagPayload, IUpdatePlayerProfilePayload } from '@/types/player.types';
import { InitialStateClubs } from '@/types/clubs.types';
import { CLUBSSELECTION } from '@/enum/shots.enum';
import { InitialStateRounds } from '@/types/round.types';
import { IBasicRoundData } from '@/types/roundData.types';
import { IRoundDetails, IRoundDetailState } from '@/types/roundDetails.types';
import { IRoundInitialState } from '@/types/roundData.types';
import { IRoundTotalsInitialState, IRoundTotals } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { IRoundDistanceInitialState } from '@/types/roundTotals.types';
import { initialStateDistance } from '@/utils/constant.utils';
import { INewRound, InitialStateNewRound, IInitialStateRoundSave, IImportResult } from '@/types/round.types';
import { InitialStateNewRoundsData, IShots, InitialStateNewRoundDistances } from '@/types/roundData.types';
import { calculateGirValue, calculateGreenApproachCounts, calculatePuttLengthCounts, calculateScrambleValue, calculateStablefordPoints, calculateUDValue } from '@/utils/shots/shots.utils';
import { totalsCalculator } from '@/utils/calculator/TotalsCalculator.utils';
import { updateUserThemePreference, fetchThemePreference } from '@/utils/firestore/user.firestore';
import { getPlayerInfo, updatePlayerGolfBag, updatePlayerProfile } from '@/utils/firestore/player.firestore';
import { getRoundDetails } from '@/utils/firestore/round.firestore';
import { saveNewRound } from '@/utils/firestore/round.firestore';
import { importRoundsBatch } from '@/utils/firestore/round.firestore';
import { calculateAvg } from '@/utils/round/round.utils';
import { parseImportText, IParsedRound } from '@/components/ImportRounds/ImportRoundParser.utils';
import { matchAllCourses, ICourseMatchResult } from '@/components/ImportRounds/CourseMatcher.utils';
import { buildRoundDocument } from '@/components/ImportRounds/RoundBuilder.utils';
import { getAllCourses } from '@/utils/firestore/course.firestore';
import { calculateHandicapIndex } from '@/utils/whs/hi.utils';
import dayjs, { Dayjs } from 'dayjs';

const initialControls: IControls = {
  showDistances: false,
  isLoading: false,
};

const initialPlayer: InitialStatePlayer = {
  isLoading: false,
  error: '',
  errorMessage: '',
  player: {} as IPlayerStateData,
};

const initialGolfBag: InitialStateClubs = {
  isLoading: false,
  totalClubs: 0,
  selectedClubs: 0,
  clubs: {
    playerID: '',
    types: [],
  },
  teeClubs: [],
  distanceClubs: [],
  greenClubs: [],
  chipClubs: [],
  error: {
    errorCode: 0,
    errorMessage: '',
  },
};

const initialRounds: InitialStateRounds = {
  isLoading: false,
  playerID: '',
  rounds: [],
};

const initialRoundDetails: IRoundDetailState = {
  isLoading: false,
  round: null,
  error: null,
};

const initialRoundHoles: IRoundInitialState = {
  isLoading: false,
  mainData: {
    roundID: 0,
    roundDate: '',
    roundCourse: '',
  },
  holes: [],
};

const initialRoundTotals: IRoundTotalsInitialState = {
  isLoading: false,
  roundTotals: initialStateRoundTotals,
};

const initialRoundDistance: IRoundDistanceInitialState = {
  isLoading: false,
  roundDistance: initialStateDistance,
};

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
    roundNumber: 0,
  },
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
  roundTotals: initialStateRoundTotals,
};

const initialNewRoundDistances: InitialStateNewRoundDistances = {
  isLoading: false,
  roundDistances: [],
};

interface INewRoundClubsInitialState {
  teeClubs: string[];
  distanceClubs: string[];
  greenClubs: string[];
  chipClubs: string[];
}

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

interface IDistance {
  club: string;
  mt: number[];
  avg: number;
}

export interface AppState {
  isLoadingUser: boolean;
  user: IUser;
  themePreference: ThemeMode;
  userRounds: Record<string, unknown>;
  showDistances: boolean;
  isLoadingControls: boolean;
  isLoadingPlayer: boolean;
  playerError: string;
  playerErrorMessage: string;
  player: IPlayerStateData;
  isLoadingGolfBag: number;
  totalClubs: number;
  selectedClubs: number;
  golfBagClubs: { playerID: string; types: any[] };
  teeClubs: string[];
  distanceClubs: string[];
  greenClubs: string[];
  chipClubs: string[];
  golfBagErrorCode: number;
  golfBagErrorMessage: string;
  isLoadingRounds: boolean;
  roundsPlayerID: string;
  roundsList: IBasicRoundData[];
  isLoadingRoundDetails: boolean;
  roundDetailsError: string | null;
  roundDetailsData: IRoundDetails | null;
  isLoadingRoundHoles: boolean;
  roundHolesMainData: { roundID: number; roundDate: string; roundCourse: string };
  roundHolesList: any[];
  isLoadingRoundTotals: boolean;
  roundTotalsData: IRoundTotals;
  isLoadingRoundDistance: boolean;
  roundDistanceData: { clubDistances: { club: string; mt: number[]; avg: number }[] };
  newRoundMain: InitialStateNewRound;
  newRoundHoles: InitialStateNewRoundsData;
  newRoundTotals: IRoundTotalsInitialState;
  newRoundHoleTmp: IShots;
  newRoundDistances: InitialStateNewRoundDistances;
  newRoundClubs: INewRoundClubsInitialState;
  newRoundSaver: IInitialStateRoundSave;
  setLoginUser: (user: IUser) => void;
  setThemePreference: (theme: ThemeMode) => void;
  updateUserThemePreference: (playerId: string, theme: ThemeMode) => Promise<void>;
  fetchInitialTheme: (playerId: string) => Promise<void>;
  resetUser: () => void;
  setShowDistances: (show: boolean) => void;
  setIsLoadingControls: (loading: boolean) => void;
  resetControls: () => void;
  setPlayer: (player: IPlayerStateData) => void;
  getPlayerDetails: (uid: string) => Promise<IGetPlayerDetailsPayload | null>;
  updatePlayerGolfbag: (payload: IUpdateGolfBagPayload) => Promise<IGolfBagData | null>;
  updatePlayerProfile: (payload: IUpdatePlayerProfilePayload) => Promise<Partial<IPlayerStateData> | null>;
  resetPlayer: () => void;
  updateClubSelection: (payload: { name: string; clubNumber: number | string; loft: number; selected: boolean; typeName: string }) => void;
  updateTeeGreenClubs: (payload: { type: CLUBSSELECTION; updatedTeeClubs?: string[]; updatedDistanceClubs?: string[]; updatedGreenClubs?: string[]; updatedChipClubs?: string[] }) => void;
  resetClubs: () => void;
  setRounds: (rounds: IBasicRoundData[]) => void;
  setRoundsPlayerID: (playerID: string) => void;
  resetRounds: () => void;
  getRoundDetails: (playerId: string, roundId: string) => Promise<IRoundDetails | null>;
  clearRoundDetails: () => void;
  resetRoundHoles: () => void;
  setRoundTotals: (totals: IRoundTotals) => void;
  resetRoundTotals: () => void;
  setRoundDistance: (distances: { club: string; mt: number[]; avg: number }[]) => void;
  resetRoundDistance: () => void;
  setRoundMainData: (round: Partial<INewRound>) => void;
  setRoundDate: (date: Dayjs | null) => void;
  setRoundCourse: (course: string) => void;
  setRoundHoles: (holes: number) => void;
  setRoundTee: (tee: string) => void;
  setRoundPar: (par: number) => void;
  setRoundPlayingHCP: (hcp: number) => void;
  setRoundNumber: (number: number) => void;
  setNewRoundPlayerID: (playerID: string) => void;
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
  parsedRounds: IParsedRound[];
  courseMatches: ICourseMatchResult[];
  importResults: IImportResult | null;
  isLoadingImport: boolean;
  importError: string | null;
  parseImportText: (text: string) => Promise<void>;
  importRounds: (selectedIndices: number[]) => Promise<void>;
  resetImport: () => void;
}

const initialState: AppState = {
  isLoadingUser: false,
  user: {} as IUser,
  themePreference: 'light' as ThemeMode,
  userRounds: {},
  showDistances: false,
  isLoadingControls: false,
  isLoadingPlayer: false,
  playerError: '',
  playerErrorMessage: '',
  player: {} as IPlayerStateData,
  isLoadingGolfBag: 0,
  totalClubs: 0,
  selectedClubs: 0,
  golfBagClubs: { playerID: '', types: [] },
  teeClubs: [],
  distanceClubs: [],
  greenClubs: [],
  chipClubs: [],
  golfBagErrorCode: 0,
  golfBagErrorMessage: '',
  isLoadingRounds: false,
  roundsPlayerID: '',
  roundsList: [],
  isLoadingRoundDetails: false,
  roundDetailsError: null,
  roundDetailsData: null,
  isLoadingRoundHoles: false,
  roundHolesMainData: { roundID: 0, roundDate: '', roundCourse: '' },
  roundHolesList: [],
  isLoadingRoundTotals: false,
  roundTotalsData: initialStateRoundTotals,
  isLoadingRoundDistance: false,
  roundDistanceData: { clubDistances: [] },
  newRoundMain: initialNewRoundMain,
  newRoundHoles: initialNewRoundHoles,
  newRoundTotals: initialNewRoundTotals,
  newRoundHoleTmp: {} as IShots,
  newRoundDistances: initialNewRoundDistances,
  newRoundClubs: initialNewRoundClubs,
  newRoundSaver: initialRoundSaver,
  setLoginUser: () => {},
  setThemePreference: () => {},
  updateUserThemePreference: async () => {},
  fetchInitialTheme: async () => {},
  resetUser: () => {},
  setShowDistances: () => {},
  setIsLoadingControls: () => {},
  resetControls: () => {},
  setPlayer: () => {},
  getPlayerDetails: async () => null,
  updatePlayerGolfbag: async () => null,
  updatePlayerProfile: async () => null,
  resetPlayer: () => {},
  updateClubSelection: () => {},
  updateTeeGreenClubs: () => {},
  resetClubs: () => {},
  setRounds: () => {},
  setRoundsPlayerID: () => {},
  resetRounds: () => {},
  getRoundDetails: async () => null,
  clearRoundDetails: () => {},
  resetRoundHoles: () => {},
  setRoundTotals: () => {},
  resetRoundTotals: () => {},
  setRoundDistance: () => {},
  resetRoundDistance: () => {},
  setRoundMainData: () => {},
  setRoundDate: () => {},
  setRoundCourse: () => {},
  setRoundHoles: () => {},
  setRoundTee: () => {},
  setRoundPar: () => {},
  setRoundPlayingHCP: () => {},
  setRoundNumber: () => {},
  setNewRoundPlayerID: () => {},
  setFirstHole: () => {},
  resetSetFirstHole: () => {},
  setNewHole: () => {},
  setTotalsByHole: () => {},
  setTmpHoleData: () => {},
  setHoleNumber: () => {},
  resetNewRoundHoleTmp: () => {},
  addTeeShotDistance: () => {},
  addApproachShotDistance: () => {},
  addNewDistanceWithClub: () => {},
  setNewRoundClubs: () => {},
  saveNewRound: async () => null,
  resetNewRound: () => {},
  parsedRounds: [],
  courseMatches: [],
  importResults: null,
  isLoadingImport: false,
  importError: null,
  parseImportText: async () => {},
  importRounds: async () => {},
  resetImport: () => {},
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setLoginUser: (user) => set({ isLoadingUser: false, user }),
        setThemePreference: (themePreference) => set({ themePreference }),
        updateUserThemePreference: async (playerId, theme) => {
          try {
            const result = await updateUserThemePreference({ playerId, theme });
            set({ themePreference: result });
          } catch (error) {
            console.error('Theme update failed:', error);
          }
        },
        fetchInitialTheme: async (playerId) => {
          try {
            const result = await fetchThemePreference(playerId);
            set({ themePreference: result });
          } catch (error) {
            console.error('Theme fetch failed:', error);
          }
        },
        resetUser: () => set({ isLoadingUser: false, user: {} as IUser, themePreference: 'light' as ThemeMode, userRounds: {} }),
        
        setShowDistances: (showDistances) => set({ showDistances }),
        setIsLoadingControls: (isLoadingControls) => set({ isLoadingControls }),
        resetControls: () => set({ showDistances: false, isLoadingControls: false }),
        
        setPlayer: (player) => set({ isLoadingPlayer: false, player }),
        getPlayerDetails: async (uid) => {
          set({ isLoadingPlayer: true, playerError: '', playerErrorMessage: '' });
          try {
            const result = await getPlayerInfo(uid);
            set((state) => ({
              isLoadingPlayer: false,
              player: result.player,
              roundsList: result.rounds ?? state.roundsList,
              roundsPlayerID: result.player?.uid ?? state.roundsPlayerID,
            }));
            return result;
          } catch (error: unknown) {
            const err = error as { status?: string; statusText?: string; message?: string };
            set({
              isLoadingPlayer: false,
              playerError: err.status || 'Unknown Error',
              playerErrorMessage: err.statusText || err.message || 'Failed to fetch player',
              player: {} as IPlayerStateData,
            });
            return null;
          }
        },
        updatePlayerGolfbag: async (payload) => {
          set({ isLoadingPlayer: true, playerError: '', playerErrorMessage: '' });
          try {
            const result = await updatePlayerGolfBag(payload);
            set((state) => ({
              isLoadingPlayer: false,
              player: state.player ? { ...state.player, golfBag: result } : state.player,
            }));
            return result;
          } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : 'Failed to update golf bag';
            set({ isLoadingPlayer: false, playerError: errMsg, playerErrorMessage: errMsg });
            return null;
          }
        },
        updatePlayerProfile: async (payload) => {
          set({ isLoadingPlayer: true, playerError: '', playerErrorMessage: '' });
          try {
            const result = await updatePlayerProfile(payload);
            set((state) => ({
              isLoadingPlayer: false,
              player: state.player ? { ...state.player, ...result } : state.player,
            }));
            return result;
          } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : 'Failed to update profile';
            set({ isLoadingPlayer: false, playerError: errMsg, playerErrorMessage: errMsg });
            return null;
          }
        },
        resetPlayer: () => set({ isLoadingPlayer: false, playerError: '', playerErrorMessage: '', player: {} as IPlayerStateData }),
        
        updateClubSelection: ({ name, clubNumber, loft, selected, typeName }) => {
          set((state) => {
            const typeIndex = state.golfBagClubs.types.findIndex((type: any) => type.typeName === typeName);
            if (typeIndex === -1) return state;

            const clubIndex = state.golfBagClubs.types[typeIndex].details.findIndex(
              (detail: any) => detail.clubNumber === clubNumber && detail.name === name && detail.loft === loft
            );

            if (clubIndex === -1) return state;

            const newTypes = [...state.golfBagClubs.types];
            newTypes[typeIndex] = {
              ...newTypes[typeIndex],
              details: newTypes[typeIndex].details.map((detail: any, idx: any) => (idx === clubIndex ? { ...detail, selected } : detail)),
            };

            return {
              golfBagClubs: { ...state.golfBagClubs, types: newTypes },
              selectedClubs: newTypes.reduce((acc: number, curr: any) => acc + curr.details.filter((detail: any) => detail.selected).length, 0),
            };
          });
        },
        updateTeeGreenClubs: ({ type, updatedTeeClubs, updatedDistanceClubs, updatedGreenClubs, updatedChipClubs }) => {
          set((state) => {
            switch (type) {
              case CLUBSSELECTION.TEE:
                return { teeClubs: updatedTeeClubs || state.teeClubs };
              case CLUBSSELECTION.DISTANCE:
                return { distanceClubs: updatedDistanceClubs || state.distanceClubs };
              case CLUBSSELECTION.GREEN:
                return { greenClubs: updatedGreenClubs || state.greenClubs };
              case CLUBSSELECTION.CHIP:
                return { chipClubs: updatedChipClubs || state.chipClubs };
              default:
                return state;
            }
          });
        },
        resetClubs: () => set({ isLoadingGolfBag: 0, totalClubs: 0, selectedClubs: 0, golfBagClubs: { playerID: '', types: [] }, teeClubs: [], distanceClubs: [], greenClubs: [], chipClubs: [], golfBagErrorCode: 0, golfBagErrorMessage: '' }),
        
        setRounds: (roundsList) => set({ roundsList }),
        setRoundsPlayerID: (roundsPlayerID) => set({ roundsPlayerID }),
        resetRounds: () => set({ isLoadingRounds: false, roundsPlayerID: '', roundsList: [] }),
        
        getRoundDetails: async (playerId, roundId) => {
          set({ isLoadingRoundDetails: true, roundDetailsError: null, roundDetailsData: null });
          try {
            const result = await getRoundDetails({ playerId, roundId });
            set({ isLoadingRoundDetails: false, roundDetailsData: result });
            return result;
          } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : 'Failed to fetch round details';
            set({ isLoadingRoundDetails: false, roundDetailsError: errMsg });
            return null;
          }
        },
        clearRoundDetails: () => set({ roundDetailsData: null, isLoadingRoundDetails: false, roundDetailsError: null }),
        
        resetRoundHoles: () => set({ isLoadingRoundHoles: false, roundHolesMainData: { roundID: 0, roundDate: '', roundCourse: '' }, roundHolesList: [] }),
        
        setRoundTotals: (roundTotalsData) => set({ roundTotalsData }),
        resetRoundTotals: () => set({ isLoadingRoundTotals: false, roundTotalsData: initialStateRoundTotals }),
        
        setRoundDistance: (distances) => set({ roundDistanceData: { clubDistances: distances } }),
        resetRoundDistance: () => set({ isLoadingRoundDistance: false, roundDistanceData: { clubDistances: [] } }),
        
        setRoundMainData: (round) => {
          const current = get();
          const updatedRound = current.newRoundMain.round.roundDate && dayjs.isDayjs(round.roundDate)
            ? { ...round, roundDate: round.roundDate.toISOString() }
            : round;
          set({
            newRoundMain: {
              ...current.newRoundMain,
              round: { ...current.newRoundMain.round, ...updatedRound },
              setFirstHole: true,
            },
          });
        },
        setRoundDate: (date) => {
          const current = get();
          const roundDate = date && dayjs.isDayjs(date) && date.isValid() ? date.toISOString() : '';
          set({ newRoundMain: { ...current.newRoundMain, round: { ...current.newRoundMain.round, roundDate } } });
        },
        setRoundCourse: (course) => set((state) => ({ newRoundMain: { ...state.newRoundMain, round: { ...state.newRoundMain.round, roundCourse: course } } })),
        setRoundHoles: (holes) => set((state) => ({ newRoundMain: { ...state.newRoundMain, round: { ...state.newRoundMain.round, roundHoles: Number.isNaN(Number(holes)) ? 0 : Number(holes) } } })),
        setRoundTee: (tee) => set((state) => ({ newRoundMain: { ...state.newRoundMain, round: { ...state.newRoundMain.round, roundTee: tee } } })),
        setRoundPar: (par) => set((state) => ({ newRoundMain: { ...state.newRoundMain, round: { ...state.newRoundMain.round, roundPar: Number.isNaN(Number(par)) ? 0 : Number(par) } } })),
        setRoundPlayingHCP: (hcp) => set((state) => ({ newRoundMain: { ...state.newRoundMain, round: { ...state.newRoundMain.round, roundPlayingHCP: Number.isNaN(Number(hcp)) ? 0 : Number(hcp) } } })),
        setRoundNumber: (number) => set((state) => ({ newRoundMain: { ...state.newRoundMain, round: { ...state.newRoundMain.round, roundNumber: Number.isNaN(Number(number)) ? 0 : Number(number) } } })),
        setNewRoundPlayerID: (playerID) => set((state) => ({ newRoundMain: { ...state.newRoundMain, playerID } })),
        setFirstHole: () => set((state) => ({ newRoundMain: { ...state.newRoundMain, setFirstHole: true } })),
        resetSetFirstHole: () => set((state) => ({ newRoundMain: { ...state.newRoundMain, setFirstHole: false } })),
        
        setNewHole: (holeAdjusted, roundPlayingHCP, roundHoles) => {
          const current = get();
          const currentHoleNum = current.newRoundHoles.holesCompleted + 1;
          const baseHole: IShots = {
            ...(current.newRoundHoles.holes[0] || {}),
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

          set((state) => {
            const updatedHoles = [...state.newRoundHoles.holes, finalHole];
            return {
              newRoundHoles: {
                ...state.newRoundHoles,
                holes: updatedHoles,
                holesCompleted: state.newRoundHoles.holesCompleted + 1,
              },
              newRoundTotals: {
                isLoading: false,
                roundTotals: totalsCalculator(updatedHoles),
              },
            };
          });
        },
        
        setTotalsByHole: (holes) => {
          set({
            newRoundTotals: {
              isLoading: false,
              roundTotals: totalsCalculator(holes),
            },
          });
        },
        
        setTmpHoleData: ({ name, value, roundPlayingHCP, roundHoles, chipClubs }) => {
          const current = get();
          const newHoleTmp = { ...current.newRoundHoleTmp } as IShots;
          const initialValueType = typeof current.newRoundHoleTmp[name];

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
          } else {
            if (Array.isArray(value)) {
              (newHoleTmp as any)[name] = JSON.parse(JSON.stringify(value));
            } else if (typeof value === 'object' && value !== null) {
              (newHoleTmp as any)[name] = { ...(value as object) };
            } else {
              (newHoleTmp as any)[name] = value;
            }
          }

          newHoleTmp.bounceBack = newHoleTmp.strokes - newHoleTmp.par;

          if (newHoleTmp.par !== 0 && newHoleTmp.hcp !== 0 && newHoleTmp.strokes !== 0 && Number(roundPlayingHCP) !== 0 && Number(roundHoles) !== 0) {
            newHoleTmp.points = calculateStablefordPoints({
              hcp: Number(newHoleTmp.hcp),
              par: Number(newHoleTmp.par),
              strokes: Number(newHoleTmp.strokes),
              roundPlayingHCP: Number(roundPlayingHCP),
              roundHoles: Number(roundHoles),
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

          set({ newRoundHoleTmp: newHoleTmp });
        },
        
        setHoleNumber: (holeNumber) => set((state) => ({ newRoundHoleTmp: { ...state.newRoundHoleTmp, holeNumber } })),
        resetNewRoundHoleTmp: () => set({ newRoundHoleTmp: {} as IShots }),
        
        addTeeShotDistance: (club, distance) => {
          if (!club || typeof club !== 'string' || club.trim() === '' || typeof distance !== 'number' || distance <= 0) return;
          const current = get();
          const existingIndex = current.newRoundDistances.roundDistances.findIndex((d) => d.club === club);
          if (existingIndex !== -1) {
            const newMt = [...current.newRoundDistances.roundDistances[existingIndex].mt, distance];
            const newDistances = [...current.newRoundDistances.roundDistances];
            newDistances[existingIndex] = { ...newDistances[existingIndex], mt: newMt, avg: calculateAvg(newMt) };
            set({ newRoundDistances: { ...current.newRoundDistances, roundDistances: newDistances } });
          } else {
            set({
              newRoundDistances: {
                ...current.newRoundDistances,
                roundDistances: [...current.newRoundDistances.roundDistances, { club, mt: [distance], avg: distance }],
              },
            });
          }
        },
        
        addApproachShotDistance: (club, distance) => {
          if (!club || typeof club !== 'string' || club.trim() === '' || typeof distance !== 'number' || distance <= 0) return;
          const current = get();
          const existingIndex = current.newRoundDistances.roundDistances.findIndex((d) => d.club === club);
          if (existingIndex !== -1) {
            const newMt = [...current.newRoundDistances.roundDistances[existingIndex].mt, distance];
            const newDistances = [...current.newRoundDistances.roundDistances];
            newDistances[existingIndex] = { ...newDistances[existingIndex], mt: newMt, avg: calculateAvg(newMt) };
            set({ newRoundDistances: { ...current.newRoundDistances, roundDistances: newDistances } });
          } else {
            set({
              newRoundDistances: {
                ...current.newRoundDistances,
                roundDistances: [...current.newRoundDistances.roundDistances, { club, mt: [distance], avg: distance }],
              },
            });
          }
        },
        
        addNewDistanceWithClub: (distances) => set((state) => ({ newRoundDistances: { ...state.newRoundDistances, roundDistances: distances } })),
        
        setNewRoundClubs: (clubs) => set({ newRoundClubs: clubs }),
        
        saveNewRound: async () => {
          set({ newRoundSaver: { isLoading: true, roundId: '', success: false } });

          try {
            const result = await saveNewRound();

            if (!result) {
              set({ newRoundSaver: { isLoading: false, roundId: '', success: false } });
              return null;
            }

            set({ newRoundSaver: { isLoading: false, roundId: result.roundId, success: result.success } });
            return result;
          } catch (error) {
            set({ newRoundSaver: { isLoading: false, roundId: '', success: false } });
            return null;
          }
        },
        
        resetNewRound: () => set({
          newRoundMain: initialNewRoundMain,
          newRoundHoles: initialNewRoundHoles,
          newRoundTotals: initialNewRoundTotals,
          newRoundHoleTmp: {} as IShots,
          newRoundDistances: initialNewRoundDistances,
          newRoundClubs: initialNewRoundClubs,
          newRoundSaver: initialRoundSaver,
        }),

        parseImportText: async (text) => {
          set({ isLoadingImport: true, importError: null, importResults: null });
          try {
            const parsed = parseImportText(text);
            const courses = await getAllCourses();
            const matches = await matchAllCourses(parsed, courses);
            const lastValid = [...parsed].reverse().find((p) => p.indexNuovo !== null);
            set({
              parsedRounds: parsed,
              courseMatches: matches,
              isLoadingImport: false,
            });
          } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Failed to parse import data';
            set({ isLoadingImport: false, importError: msg });
          }
        },

        importRounds: async (selectedIndices) => {
          const state = get();
          const userId = state.player?.uid;

          if (!selectedIndices.length) {
            set({ importError: 'No rounds selected' });
            return;
          }
          if (!userId) {
            set({ importError: 'User not authenticated' });
            return;
          }

          set({ isLoadingImport: true, importError: null });

          try {
            const warnings: string[] = [];
            const validRounds = selectedIndices.filter(
              (i) => state.parsedRounds[i]?.parsedSuccessfully && state.parsedRounds[i]?.roundValid
            );

            if (validRounds.length === 0) {
              set({ isLoadingImport: false, importError: 'No valid rounds to import' });
              return;
            }

            if (validRounds.length > 100) {
              warnings.push('Large import — may take a moment');
            }

            const existingRounds = state.roundsList;
            const existingKeys = new Set(
              existingRounds.map((r) => `${r.roundCourse}|${r.roundDate}`)
            );

            const maxRoundNumber = existingRounds.reduce(
              (max, r) => Math.max(max, Number(r.roundNumber) || 0),
              0
            );

            const docs = validRounds.map((index, idx) => {
              const parsed = state.parsedRounds[index];
              const match = state.courseMatches[index];

              const key = `${parsed.roundCourse}|${parsed.roundDate}`;
              if (existingKeys.has(key)) {
                warnings.push(`Duplicate: ${parsed.roundCourse} on ${parsed.roundDate}`);
              }

              return buildRoundDocument({
                parsed,
                match,
                roundNumber: maxRoundNumber + 1 + idx,
                userId,
              });
            });

            const previousSDs = state.roundsList
              .map((r) => r.scoreDifferential)
              .filter((sd): sd is number => sd !== null && sd !== undefined);
            const anchorHCP = state.player?.currentHCP ?? state.player?.initialHCP ?? null;

            const result = await importRoundsBatch(userId, docs, previousSDs, anchorHCP);

            // Refetch player to sync currentHCP snapshot in store
            try {
              await get().getPlayerDetails(userId);
            } catch (refetchErr: unknown) {
              console.error('importRounds: Error refetching player details:', refetchErr);
            }

            const updatedState = get();
            const allSDs = updatedState.roundsList
              .map((r) => r.scoreDifferential)
              .filter((sd): sd is number => sd !== null && sd !== undefined);

            for (const doc of docs) {
              if (doc.scoreDifferential !== null) {
                allSDs.push(doc.scoreDifferential);
              }
            }

            allSDs.sort((a, b) => b - a);

            const calculatedHI = calculateHandicapIndex(allSDs);
            const lastParsed = [...state.parsedRounds].reverse().find((p) => p.indexNuovo !== null);
            const expectedHI = lastParsed?.indexNuovo ?? null;

            const matchedCount = validRounds.filter(
              (i) => state.courseMatches[i]?.matched
            ).length;

            set({
              isLoadingImport: false,
              importResults: {
                importedCount: result.importedCount,
                matchedCount,
                unmatchedCount: validRounds.length - matchedCount,
                roundIds: result.roundIds,
                expectedHI,
                calculatedHI,
                warnings,
              },
            });
          } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : 'Import failed';
            set({ isLoadingImport: false, importError: msg });
          }
        },

        resetImport: () => set({
          parsedRounds: [],
          courseMatches: [],
          importResults: null,
          isLoadingImport: false,
          importError: null,
        }),
      }),
      {
        name: 'app-storage',
        version: 1,
        migrate: (persisted) => {
          const state = persisted as Record<string, unknown>;
          delete state.parsedRounds;
          delete state.courseMatches;
          delete state.importResults;
          delete state.isLoadingImport;
          delete state.importError;
          return state;
        },
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          themePreference: state.themePreference,
          showDistances: state.showDistances,
          player: state.player,
          isLoadingPlayer: state.isLoadingPlayer,
          golfBagClubs: state.golfBagClubs,
          teeClubs: state.teeClubs,
          distanceClubs: state.distanceClubs,
          greenClubs: state.greenClubs,
          chipClubs: state.chipClubs,
          roundsList: state.roundsList,
          roundsPlayerID: state.roundsPlayerID,
          roundHolesMainData: state.roundHolesMainData,
          roundHolesList: state.roundHolesList,
          roundTotalsData: state.roundTotalsData,
          roundDistanceData: state.roundDistanceData,
          newRoundMain: state.newRoundMain,
          newRoundHoles: state.newRoundHoles,
          newRoundTotals: state.newRoundTotals,
          newRoundDistances: state.newRoundDistances,
          newRoundClubs: state.newRoundClubs,
        }),
      }
    ),
    { name: 'AppStore' }
  )
);
