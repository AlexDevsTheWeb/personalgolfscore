import { combineReducers, configureStore } from '@reduxjs/toolkit';
import golfBagReducer from '../features/golfBag/golfBag.slice';
import holeTmpReducer from '../features/hole/holeTmp.slice';
import newRoundHolesReducer from '../features/newRound/newRoundHoles.slice';
import newRoundMainReducer from '../features/newRound/newRoundMain.slice';
import newRoundTotalsReducer from '../features/newRound/newRoundTotals.slice';
import playerReducer from '../features/player/player.slice';
import roundHolesReducer from '../features/round/roundHoles.slice';
import roundTotalsReducer from '../features/round/roundTotals.slice';
import roundsReducer from '../features/rounds/rounds.slice';
import roundsDataReducer from '../features/rounds/roundsData.slice';
import roundsTotalsReducer from '../features/rounds/roundsTotals.slice';

const rootReducer = {
  golfBag: golfBagReducer,
  player: playerReducer,
  rounds: roundsReducer,
  roundsNumber: combineReducers({
    roundsData: roundsDataReducer,
    roundsTotals: roundsTotalsReducer
  }),
  singleRound: combineReducers({
    roundHoles: roundHolesReducer,
    roundTotals: roundTotalsReducer,
  }),
  newRound: combineReducers({
    newRoundMain: newRoundMainReducer,
    newRoundHoles: newRoundHolesReducer,
    newRoundTotals: newRoundTotalsReducer,
    holeTmp: holeTmpReducer,
  }),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
