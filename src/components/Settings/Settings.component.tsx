
import { selectCurrentUserThemePreference, updateUserThemePreference } from '@/features/user/user.slice';
import { AppDispatch, RootState } from '@/store/store';
import { ThemeMode } from '@/types/user.types';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material'; // Import CircularProgress
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/spinner/Spinner.component';
// Remove the context import
// import { useThemeMode } from '../../context/Theme.context';

const Settings = () => {

  // Remove useThemeMode hook
  // const { mode, toggleTheme } = useThemeMode();
  const dispatch = useDispatch<AppDispatch>();
  // Also select isLoading state if available, or check if user object exists
  // Get player ID from the player slice
  const { player, isLoading: isPlayerLoading } = useSelector((state: RootState) => state.player);
  const playerId = player?.uid;
  // Get the current theme from Redux state
  const currentThemeMode = useSelector(selectCurrentUserThemePreference);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode: ThemeMode = event.target.checked ? 'dark' : 'light';

    if (playerId) {
      dispatch(updateUserThemePreference({ playerId, theme: newMode }));
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
    }
  };

  // Optional: Show loading indicator if user data is loading
  // Use player loading state
  if (isPlayerLoading && !playerId) {
    return <Spinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography gutterBottom>Settings</Typography>

      <FormControlLabel
        control={
          // Use Redux state for the checked value
          // Disable if loading OR if playerId is missing after loading finishes
          <Switch checked={currentThemeMode === 'dark'} onChange={handleThemeChange} disabled={isPlayerLoading || !playerId} />
        }
        label={`Theme: ${currentThemeMode === 'dark' ? 'Dark' : 'Light'}`}
      />

    </Box>

  )
}

export default Settings
