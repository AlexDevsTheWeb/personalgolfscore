import { combineReducers, configureStore } from '@reduxjs/toolkit';
import clubReducer from '../features/clubs/clubs.slice'
import playerReducer from '../features/player/player.slice';

const rootReducer = {
  clubs: clubReducer,
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
