import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { CssBaseline as MuiCssBaseline } from '@mui/material';
import { deepmerge } from '@mui/utils';

import LoginForm from "./components/LoginForm/LoginForm.component";
import SignupForm from "./components/LoginForm/SignupForm.component";
import Spinner from "./components/spinner/Spinner.component";
import ClubsPage from "./pages/Clubs.page";
import Dashboard from "./pages/Dashboard.page";
import SharedLayout from "./pages/SharedLayout.page";
import { store } from "./store/store";
import { theme } from './styles/theme/ThemeStyle.theme';
import { themeSystem } from './styles/theme/ThemeSystem.theme';
import RoundsData from './pages/RoundsData.page';
import AddNewRound from './pages/AddNewRound.page';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={deepmerge(themeSystem, theme)}>
            <MuiCssBaseline />
            <StyledComponentsThemeProvider theme={theme}>
              <Routes>
                <Route element={<SharedLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/clubs" element={<ClubsPage />} />
                  <Route path="/signup" element={<SignupForm />} />
                  <Route path="/signin" element={<LoginForm />} />
                  <Route path="/round/:roundID" element={<RoundsData />} />
                  <Route path='/addNewRound' element={<AddNewRound />} />
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
    </Suspense>
  );
};

export default App;