import { ThemeMode } from '@/types/user.types';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import { useAppStore } from '@/store/zustand';

const ThemeSwitcher: React.FC = () => {
  const theme = useTheme();
  const currentThemeMode = useAppStore((state) => state.themePreference);
  const setThemePreference = useAppStore((state) => state.setThemePreference);
  const updateUserThemePreference = useAppStore((state) => state.updateUserThemePreference);
  const player = useAppStore((state) => state.player);
  const playerId = player?.uid;

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode: ThemeMode = event.target.checked ? 'dark' : 'light';
    updateTheme(newMode);
    if (playerId) {
      updateUserThemePreference(playerId, newMode);
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
    }
  };

  const handleToggleTheme = () => {
    const newMode: ThemeMode = currentThemeMode === 'light' ? 'dark' : 'light';
    updateTheme(newMode);
  };

  const updateTheme = (newMode: ThemeMode) => {
    setThemePreference(newMode);
    if (playerId) {
      updateUserThemePreference(playerId, newMode);
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit', ml: 1 }}>
      {currentThemeMode === 'light'
        ? <Button onClick={handleToggleTheme} color="inherit" sx={{ minWidth: 'auto', p: 0.5 }}>
          <LightModeOutlinedIcon sx={{ mr: 0.5 }} />
        </Button>
        : <Button onClick={handleToggleTheme} color="inherit" sx={{ minWidth: 'auto', p: 0.5 }}>
          <DarkModeOutlinedIcon sx={{ mr: 0.5 }} />
        </Button>
      }
    </Box>
  );
};

export default ThemeSwitcher;