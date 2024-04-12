import { combineReducers, configureStore } from '@reduxjs/toolkit';
import golfBagReducer from '../features/golfBag/golfBag.slice'
import playerReducer from '../features/player/player.slice';
import roundsReducer from '../features/rounds/rounds.slice';

const rootReducer = {
  golfBag: golfBagReducer,
  player: playerReducer,
  rounds: roundsReducer,
  // hooks: combineReducers({
  //   dialog: dialogReducer,
  //   location: locationHookSlice,
  //   uploadFileDialog: uploadFileDialogSlice,
  // }),
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
