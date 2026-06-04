
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Spinner from './components/common/spinner/Spinner.component';
import SignupForm from './components/LoginForm/SignupForm.component';
import AddNewRound from './pages/AddNewRound.page';
import AllRounds from './pages/AllRounds.page';
import AdminRoute from './pages/AdminRoute.page';
import AdminCoursesPage from './pages/AdminCourses.page';
import AdminUsersPage from './pages/AdminUsers.page';
import ClubsPage from "./pages/Clubs.page";
import DashboardPage from "./pages/Dashboard.page";
import Error from './pages/Error.page';
import LoginPage from './pages/Login.page';
import ProtectedRoute from './pages/ProtectedRoute.page';
import RoundsData from './pages/RoundsData.page';
import SettingsPage from './pages/Settings.page';
import SharedLayout from './pages/SharedLayout.page';
import SimulatorPage from './pages/Simulator.page';
import HistoryPage from './pages/History.page';
import ImportRoundsPage from './pages/ImportRounds.page';
import Statistics from './pages/Statistics.page';
import ThemeSetup from './styles/ThemeSetup.styles';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <ThemeSetup>
          <Routes>
            {["/login"].map((path) => (
              <Route path={path} element={<LoginPage />} />
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
              <Route path="/all-rounds" element={<AllRounds />} />
              <Route path="/round/:roundID" element={<RoundsData />} />
              <Route path='/addNewRound' element={<AddNewRound />} />
              <Route path='/statistics' element={<Statistics />} />
              <Route path='/simulator' element={<SimulatorPage />} />
              <Route path='/history' element={<HistoryPage />} />
              <Route path='/import-rounds' element={<ImportRoundsPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path="/admin/courses" element={<AdminRoute><AdminCoursesPage /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
            </Route>
            <Route path="*" element={<Error />} />
            <Route path="/error" element={<Error />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </ThemeSetup>
      </LocalizationProvider>
    </Suspense>
  );
};



export default App;