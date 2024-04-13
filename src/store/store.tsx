import { combineReducers, configureStore } from '@reduxjs/toolkit';
import golfBagReducer from '../features/golfBag/golfBag.slice'
import playerReducer from '../features/player/player.slice';
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
