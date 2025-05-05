
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
import SettingsPage from './pages/Settings.page';
import SharedLayout from './pages/SharedLayout.page';
import Statistics from './pages/Statistics.page';
import { persistor, store } from './store/store';
import ThemeSetup from './styles/ThemeSetup.styles';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
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
                  <Route index element={<DashboardPage />} />
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
          </PersistGate>
        </Provider>
      </LocalizationProvider>
    </Suspense>
  );
};



export default App;