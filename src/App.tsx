import { ThemeProvider as StyledComponentsThemeProvider } from '@emotion/react';
import { CssBaseline as MuiCssBaseline } from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers';
// import LoginForm from "./components/LoginForm/LoginForm.component";
import SignupForm from "./components/LoginForm/SignupForm.component";
import Spinner from "./components/common/spinner/Spinner.component";
import AddNewRound from './pages/AddNewRound.page';
import ClubsPage from "./pages/Clubs.page";
import DashboardPage from "./pages/Dashboard.page";
import RoundsData from './pages/RoundsData.page';
import SharedLayout from './pages/SharedLayout.page';
import Statistics from './pages/Statistics.page';
import { store } from "./store/store";
import { theme } from './styles/theme/ThemeStyle.theme';
import { themeSystem } from './styles/theme/ThemeSystem.theme';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/it';
import Error from './pages/Error.page';
import LoginPage from './pages/Login.page';
import ProtectedRoute from './pages/ProtectedRoute.page';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={deepmerge(themeSystem, theme)}>
              <MuiCssBaseline />
              <StyledComponentsThemeProvider theme={theme}>
                <Routes>
                  {["/login"].map((path) => (
                    <Route key={path} path={path} element={<LoginPage />} />
                  ))}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <SharedLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/clubs" element={<ClubsPage />} />
                    <Route path="/round/:roundID" element={<RoundsData />} />
                    <Route path="/round/:roundID/hole/:holeNumber/edit" element={<RoundsData />} />
                    <Route path='/addNewRound' element={<AddNewRound />} />
                    <Route path='/statistics' element={<Statistics />} />
                  </Route>
                  <Route path="*" element={<Error />} />
                  <Route path="/error" element={<Error />} /> // TODO: change with a proper 404 error page
                  <Route path="/signup" element={<SignupForm />} />
                </Routes>



                {/* <ToastElement />
                // TODO: consider to add this block
                  <ErrorDialog /> */}
                {/* <GeneralErrorDialog
                    isOpen={isOpen}
                    onClick={() => {
                      setIsOpen(false);
                      localStorage.removeItem("error");
                    }}
                  />
                  // TODO: consider to add this block
                  <DialogConfirm /> */}


              </StyledComponentsThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </Suspense>
  );
};

export default App;