
import { setThemePreference, updateUserThemePreference } from '@/features/user/user.slice';
import { AppDispatch, RootState } from '@/store/store'; // Adjust path if needed, import AppDispatch
import { ThemeMode } from '@/types/user.types';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useThemeMode } from '../../context/Theme.context';

const Settings = () => {

  const { mode, toggleTheme } = useThemeMode();
  const dispatch = useDispatch<AppDispatch>();
  const playerId = useSelector((state: RootState) => state.user.user?.uid);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode: ThemeMode = event.target.checked ? 'dark' : 'light';

    toggleTheme();
    dispatch(setThemePreference(newMode));

    if (playerId) {
      dispatch(updateUserThemePreference({ playerId, theme: newMode }));
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography gutterBottom>Settings</Typography>


      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={handleThemeChange} />}
        label={`Theme: ${mode === 'dark' ? 'Dark' : 'Light'}`}
      />

    </Box>

  )
}

export default Settings
