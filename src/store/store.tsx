import { combineReducers, configureStore } from '@reduxjs/toolkit';
import golfBagReducer from '../features/golfBag/golfBag.slice'
import playerReducer from '../features/player/player.slice';
import roundsReducer from '../features/rounds/rounds.slice';
import roundsDataReducer from '../features/rounds/roundsData.slice';
import roundsTotalsReducer from '../features/rounds/roundsTotals.slice';
import newRoundMainReducer from '../features/newRound/newRoundMain.slice';
import newRoundHolesReducer from '../features/newRound/newRoundHoles.slice';
import newRoundTotalsReducer from '../features/newRound/newRoundTotals.slice';

const rootReducer = {
  golfBag: golfBagReducer,
  player: playerReducer,
  rounds: roundsReducer,
  roundsNumber: combineReducers({
    roundsData: roundsDataReducer,
    roundsTotals: roundsTotalsReducer
  }),
  newRound: combineReducers({
    newRoundMain: newRoundMainReducer,
    newRoundHoles: newRoundHolesReducer,
    newRoundTotals: newRoundTotalsReducer
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
export type AppDispatch = typeof store.dispatch;
