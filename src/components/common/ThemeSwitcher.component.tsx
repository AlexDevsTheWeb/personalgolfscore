import { selectCurrentUserThemePreference, updateUserThemePreference } from '@/features/user/user.slice';
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

  // Handler for the Switch component
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode: ThemeMode = event.target.checked ? 'dark' : 'light';
    updateTheme(newMode);

    if (playerId) {
      dispatch(updateUserThemePreference({ playerId, theme: newMode }));
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
      // Optionally dispatch a local-only theme change action if needed
    }
  };

  // Handler for the Button clicks
  const handleToggleTheme = () => {
    const newMode: ThemeMode = currentThemeMode === 'light' ? 'dark' : 'light';
    updateTheme(newMode);
  };

  // Helper function to dispatch the theme update
  const updateTheme = (newMode: ThemeMode) => {
    if (playerId) {
      dispatch(updateUserThemePreference({ playerId, theme: newMode }));
    } else {
      console.warn("Player ID not found, couldn't save theme preference to Firestore.");
      // Optionally dispatch a local-only theme change action if needed
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit', ml: 1 }}>
      {currentThemeMode === 'light'
        ? <Button onClick={handleToggleTheme} color="inherit" sx={{ minWidth: 'auto', p: 0.5 }}> {/* Use onClick and inherit color */}
          <LightModeOutlinedIcon sx={{ mr: 0.5 }} />
        </Button>
        : <Button onClick={handleToggleTheme} color="inherit" sx={{ minWidth: 'auto', p: 0.5 }}> {/* Use onClick and inherit color */}
          <DarkModeOutlinedIcon sx={{ mr: 0.5 }} />
        </Button>
      }
    </Box>
  );
};

export default ThemeSwitcher;