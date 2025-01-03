import controlsReducer from '@/features/app/controls.slice';
import golfBagReducer from '@/features/golfBag/golfBag.slice';
import holeTmpReducer from '@/features/hole/holeTmp.slice';
import newroundDistanceReducer from '@/features/newRound/newRoundDistances.slice';
import newRoundHolesReducer from '@/features/newRound/newRoundHoles.slice';
import newRoundMainReducer from '@/features/newRound/newRoundMain.slice';
import newRoundTotalsReducer from '@/features/newRound/newRoundTotals.slice';
import roundSaverReducer from '@/features/newRound/roundSaver.slice';
import playerReducer from '@/features/player/player.slice';
import roundDistanceReducer from '@/features/round/roundDistance.slice';
import roundHolesReducer from '@/features/round/roundHoles.slice';
import roundTotalsReducer from '@/features/round/roundTotals.slice';
import roundsReducer from '@/features/rounds/rounds.slice';
import roundsDataReducer from '@/features/rounds/roundsData.slice';
import roundsDistanceReducer from '@/features/rounds/roundsDistance.slice';
import roundsTotalsReducer from '@/features/rounds/roundsTotals.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = {
  controls: controlsReducer,
  golfBag: golfBagReducer,
  player: playerReducer,
  rounds: roundsReducer,
  roundsNumber: combineReducers({
    roundsData: roundsDataReducer,
    roundsTotals: roundsTotalsReducer,
    roundsDistance: roundsDistanceReducer,
  }),
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
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
