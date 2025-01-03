import { CssBaseline as MuiCssBaseline } from '@mui/material';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { LocalizationProvider } from '@mui/x-date-pickers';
import LoginForm from "./components/LoginForm/LoginForm.component";
import SignupForm from "./components/LoginForm/SignupForm.component";
import Spinner from "./components/spinner/Spinner.component";
import AddNewRound from './pages/AddNewRound.page';
import ClubsPage from "./pages/Clubs.page";
import DashboardPage from "./pages/DashboardPage.page";
import RoundsData from './pages/RoundsData.page';
import SharedLayout from './pages/SharedLayout.page';
import Statistics from './pages/Statistics.page';
import { store } from "./store/store";
import { theme } from './styles/theme/ThemeStyle.theme';
import { themeSystem } from './styles/theme/ThemeSystem.theme';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/it';

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
                  <Route element={<SharedLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/clubs" element={<ClubsPage />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/signin" element={<LoginForm />} />
                    <Route path="/round/:roundID" element={<RoundsData />} />
                    <Route path='/addNewRound' element={<AddNewRound />} />
                    <Route path='/statistics' element={<Statistics />} />
                    {/* <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Authentication />} />
                    <Route path="checkout" element={<Checkout />} />
                  </Route> 
              */}
                  </Route>
                </Routes>
              </StyledComponentsThemeProvider>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </Suspense>
  );
};

export default App;