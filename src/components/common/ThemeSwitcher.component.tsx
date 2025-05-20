import { selectCurrentUserThemePreference, setThemePreference, updateUserThemePreference } from '@/features/user/user.slice';
import { AppDispatch, RootState } from '@/store/store';
import { ThemeMode } from '@/types/user.types';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const currentThemeMode = useSelector(selectCurrentUserThemePreference);
  const { player } = useSelector((state: RootState) => state.player);
  const playerId = player?.uid;

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode: ThemeMode = event.target.checked ? 'dark' : 'light';
    updateTheme(newMode);
    if (playerId) {
      dispatch(updateUserThemePreference({ playerId, theme: newMode }));
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
    }
  };

  const handleToggleTheme = () => {
    const newMode: ThemeMode = currentThemeMode === 'light' ? 'dark' : 'light';
    updateTheme(newMode);
  };

  const updateTheme = (newMode: ThemeMode) => {
    dispatch(setThemePreference(newMode));
    if (playerId) {
      dispatch(updateUserThemePreference({ playerId, theme: newMode }));
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