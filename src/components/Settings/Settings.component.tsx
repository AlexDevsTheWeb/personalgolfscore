import { ThemeMode } from '@/types/user.types';
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React from 'react';
import Spinner from '../common/spinner/Spinner.component';
import { usePlayerStore } from '@/store/zustand';
import { useUserStore } from '@/store/zustand';

const Settings = () => {

  const { player, isLoading: isPlayerLoading } = usePlayerStore();
  const playerId = player?.uid;
  const currentThemeMode = useUserStore((state) => state.themePreference);
  const updateUserThemePreference = useUserStore((state) => state.updateUserThemePreference);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode: ThemeMode = event.target.checked ? 'dark' : 'light';

    if (playerId) {
      updateUserThemePreference(playerId, newMode);
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
    }
  };

  if (isPlayerLoading && !playerId) {
    return <Spinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography gutterBottom>Settings</Typography>

      <FormControlLabel
        control={
          <Switch checked={currentThemeMode === 'dark'} onChange={handleThemeChange} disabled={isPlayerLoading || !playerId} />
        }
        label={`Theme: ${currentThemeMode === 'dark' ? 'Dark' : 'Light'}`}
      />

    </Box>

  )
}

export default Settings;
