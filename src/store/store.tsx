import { combineReducers, configureStore } from '@reduxjs/toolkit';
import golfBagReducer from '../features/golfBag/golfBag.slice'
import playerReducer from '../features/player/player.slice';

const rootReducer = {
  golfBag: golfBagReducer,
  player: playerReducer,
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
