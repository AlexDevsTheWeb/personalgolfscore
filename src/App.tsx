import { ThemeProvider as StyledComponentsThemeProvider } from '@emotion/react';
import { CssBaseline as MuiCssBaseline } from '@mui/material';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';
import deepmerge from 'deepmerge'; // Import deepmerge
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/common/spinner/Spinner.component';
import SignupForm from './components/LoginForm/SignupForm.component';
import AddNewRound from './pages/AddNewRound.page';
import ClubsPage from "./pages/Clubs.page";
import DashboardPage from "./pages/Dashboard.page";
import Error from './pages/Error.page';
import LoginPage from './pages/Login.page';
import ProtectedRoute from './pages/ProtectedRoute.page';
import RoundsData from './pages/RoundsData.page';
import SharedLayout from './pages/SharedLayout.page';
import Statistics from './pages/Statistics.page';
import { persistor, store } from './store/store';
import { breakpoints } from './styles/theme/Breakpoints.theme';
import components from './styles/theme/Components.theme';
import { darkPalette, lightPalette } from './styles/theme/Palette.theme';
import { OptionsDatepicker } from './styles/theme/ThemeStyle.theme';
import { systemComponentOptions } from './styles/theme/ThemeSystem.theme';
import { typography } from './styles/theme/Typography.theme';

import { ThemeModeProvider, useThemeMode } from './context/Theme.context';
import SettingsPage from './pages/Settings.page';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeModeProvider>
              <ThemeSetup>
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
                    <Route index element={<DashboardPage />} /> {/* Use index route */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/clubs" element={<ClubsPage />} />
                    <Route path="/round/:roundID" element={<RoundsData />} />
                    <Route path='/addNewRound' element={<AddNewRound />} />
                    <Route path='/statistics' element={<Statistics />} />
                    <Route path='/settings' element={<SettingsPage />} />
                  </Route>
                  <Route path="*" element={<Error />} />
                  <Route path="/error" element={<Error />} />
                  <Route path="/signup" element={<SignupForm />} />
                </Routes>
              </ThemeSetup>
            </ThemeModeProvider>
          </PersistGate>
        </Provider>
      </LocalizationProvider>
    </Suspense >
  );
};

const ThemeSetup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useThemeMode(); // Get the current mode

  // Create the theme dynamically based on the mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: mode === 'light' ? lightPalette : darkPalette,
        typography,
        breakpoints,
        // Provide fallback empty objects to satisfy deepmerge types
        components: deepmerge(components || {}, systemComponentOptions || {}),
        datepicker: OptionsDatepicker.Margin, // Ensure OptionsDatepicker is 
      }),
    [mode] // Recreate theme only when mode changes
  );

  // Return the theme providers wrapping the children
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <MuiCssBaseline /> {/* Ensures background color and baseline styles adapt */}
        <StyledComponentsThemeProvider theme={theme}>
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;