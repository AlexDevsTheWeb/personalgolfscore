import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import claimReducer from '../feature/claims/claimSlice';
// import claimsReducer from '../feature/claims/claimsSlice';
// import contactUsReducer from '../feature/contactUs/contactUsSlice';
// import cookiesReducer from '../feature/cookies/cookiesSlice';
// import dialogReducer from 'feature/hooks/dialogSlice';
// import downloaderReducer from '../feature/utils/downloaderSlice';
// import footerReducer from '../feature/footer/footerSlice';
// import formReducer from '../feature/form/formSlice';
// import healthCheckReducer from '../feature/utils/checkConnectionSlice';
// import limitationsReducer from '../feature/limitations/limitationsSlice';
// import locationHookSlice from 'feature/hooks/locationSlice';
// import locationInformationReducer from '../feature/locationInformation/locationInformationSlice';
// import locationsReducers from '../feature/location/locationSlice';
// import manualReducer from '../feature/manual/manualSlice';
// import memberReducer from 'feature/members/memberSlice';
// import membersReducer from 'feature/members/membersSlice';
// import paymentReducer from '../feature/payments/paymentSlice';
// import paymentsReducer from '../feature/payments/paymentsSlice';
// import progressIndicatorReducer from 'feature/progressIndicator/progressIndicatorSlice';
// import searchReducer from '../feature/search/searchSlice';
// import textsLocalesReducer from '../feature/textsLocales/textsLocalesSlice';
// import uploadFileDialogSlice from '../feature/hooks/uploadFileDialogSlice';
// import uploadReducer from '../feature/upload/uploadSlice';
// import userReducer from '../feature/user/userSlice';

const rootReducer = {
  // user: userReducer,
  // progressIndicator: progressIndicatorReducer,
  // location: locationsReducers,
  // search: searchReducer,
  // hooks: combineReducers({
  //   dialog: dialogReducer,
  //   location: locationHookSlice,
  //   uploadFileDialog: uploadFileDialogSlice,
  // }),
  // manual: manualReducer,
  // limitations: limitationsReducer,
  // claims: claimsReducer,
  // claim: claimReducer,
  // members: membersReducer,
  // member: memberReducer,
  // form: formReducer,
  // upload: uploadReducer,
  // payments: paymentsReducer,
  // payment: paymentReducer,
  // locationInformation: locationInformationReducer,
  // footer: footerReducer,
  // downloader: downloaderReducer,
  // cookies: cookiesReducer,
  // textsLocales: textsLocalesReducer,
  // contactUs: contactUsReducer,
  // healthCheck: healthCheckReducer,
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
