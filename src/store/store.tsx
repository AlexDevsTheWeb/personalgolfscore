import controlsReducer from '@/features/app/controls.slice';
import holeTmpReducer from '@/features/hole/holeTmp.slice';
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
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
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
  }),
  roundSaver: roundSaverReducer,
  user: userReducer,
}

const combinedRootReducer = combineReducers(rootReducerObject);

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

