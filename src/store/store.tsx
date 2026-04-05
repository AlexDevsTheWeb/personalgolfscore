import controlsReducer from '@/features/app/controls.slice';
import holeTmpReducer from '@/features/hole/holeTmp.slice';
import newRoundClubsReducer from '@/features/newRound/newRoundClubs.slice';
import newroundDistanceReducer from '@/features/newRound/newRoundDistances.slice';
import newRoundHolesReducer from '@/features/newRound/newRoundHoles.slice';
import newRoundMainReducer from '@/features/newRound/newRoundMain.slice';
import newRoundTotalsReducer from '@/features/newRound/newRoundTotals.slice';
import roundSaverReducer from '@/features/newRound/roundSaver.slice';
import playerReducer from '@/features/player/player.slice';
import roundDetailsReducer from '@/features/round/roundDetails.slice';
import roundDistanceReducer from '@/features/round/roundDistance.slice';
import roundHolesReducer from '@/features/round/roundHoles.slice';
import roundTotalsReducer from '@/features/round/roundTotals.slice';
import roundsReducer from '@/features/rounds/rounds.slice';
import userReducer from '@/features/user/user.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const webStorage = typeof window !== 'undefined' ?
  require('redux-persist/lib/storage').default :
  null;
// const ONE_DAY_IN_MS = 6 * 1000;

// const clearStorageIfOld = async () => {
//   try {
//     const lastVisit = await storage.getItem('lastVisit');
//     if (lastVisit) {
//       const lastVisitTime = new Date(JSON.parse(lastVisit)).getTime();
//       if (Date.now() - lastVisitTime > ONE_DAY_IN_MS) {
//         // Clear only the persisted state, not all of localStorage
//         await storage.removeItem('persist:root');
//       }
//     }
//     else {
//       await storage.setItem('lastVisit', JSON.stringify(new Date()));
//     }

//   } catch (error) {
//     console.error("Error handling persisted state:", error);
//   }
// };
const clearStorageIfOld = () => {
  if (typeof window === 'undefined') return;

  try {
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toISOString();

    if (lastVisit) {
      const lastVisitTime = new Date(JSON.parse(lastVisit)).getTime();

      if (Date.now() - lastVisitTime > ONE_DAY_IN_MS) {
        // Puliamo la persistenza
        localStorage.removeItem('persist:root');
        // IMPORTANTISSIMO: aggiorniamo lastVisit dopo il wipe
        localStorage.setItem('lastVisit', JSON.stringify(now));
        console.log("Storage scaduto: persistenza resettata.");
      }
    } else {
      localStorage.setItem('lastVisit', JSON.stringify(now));
    }
  } catch (error) {
    console.error("Error handling persisted state:", error);
  }
};

clearStorageIfOld();

const persistConfig = {
  key: 'root',
  // Creiamo un wrapper esplicito. Se 'storage' fallisce, usiamo localStorage.
  storage: {
    getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
  },
  whitelist: ['newRound', 'singleRound']
};

const rootReducerObject = {

  controls: controlsReducer,
  player: playerReducer,
  rounds: roundsReducer,
  roundDetails: roundDetailsReducer,
  singleRound: combineReducers({
    roundHoles: roundHolesReducer,
    roundTotals: roundTotalsReducer,
    roundDistance: roundDistanceReducer,
  }),
  newRound: combineReducers({
    newRoundMain: newRoundMainReducer,
    newRoundHoles: newRoundHolesReducer,
    newRoundTotals: newRoundTotalsReducer,
    holeTmp: holeTmpReducer,
    newRoundDistances: newroundDistanceReducer,
    newRoundClubs: newRoundClubsReducer,
  }),
  roundSaver: roundSaverReducer,
  user: userReducer,
}

const combinedRootReducer = combineReducers(rootReducerObject);

// Define RootState based on the *unwrapped* combined reducer
export type RootState = ReturnType<typeof combinedRootReducer>;

const persistedReducer = persistReducer(persistConfig, combinedRootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'newRoundsMain/setRoundDate',],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'payload.datePlayed', 'payload.roundDate'],
        ignoredPaths: ['player.player.DOB', 'rounds.rounds'],
      },
    }),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Define AppDispatch based on the store's dispatch type
export type AppDispatch = typeof store.dispatch;