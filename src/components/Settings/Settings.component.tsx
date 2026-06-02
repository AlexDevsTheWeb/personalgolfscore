import { ThemeMode } from '@/types/user.types';
import { Alert, Box, Card, CardContent, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Spinner from '../common/spinner/Spinner.component';
import { useAppStore } from '@/store/zustand';

// Validation regex: optional minus, integer, optional single-decimal place
const HCP_VALIDATION_REGEX = /^-?\d+(\.\d)?$/;

const validateHCP = (value: string): string | null => {
  if (value === '') {
    return 'Required';
  }
  if (!HCP_VALIDATION_REGEX.test(value)) {
    return 'Enter a number with at most 1 decimal place';
  }
  const num = parseFloat(value);
  if (isNaN(num) || num < 0 || num > 54) {
    return 'Handicap must be between 0 and 54';
  }
  return null;
};

const Settings = () => {

  const { player, isLoadingPlayer: isPlayerLoading } = useAppStore();
  const playerId = player?.uid;
  const currentThemeMode = useAppStore((state) => state.themePreference);
  const updateUserThemePreference = useAppStore((state) => state.updateUserThemePreference);
  const updatePlayerProfile = useAppStore((state) => state.updatePlayerProfile);

  const [hcpValue, setHcpValue] = useState<string>('');
  const [hcpError, setHcpError] = useState<string>('');
  const [isSavingHcp, setIsSavingHcp] = useState<boolean>(false);

  useEffect(() => {
    if (player?.initialHCP != null) {
      setHcpValue(String(player.initialHCP));
    } else {
      setHcpValue('');
    }
  }, [player?.initialHCP]);

  const handleHcpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string and pattern that matches in-progress typing
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setHcpValue(value);
      setHcpError('');
    }
  };

  const handleHcpBlur = async () => {
    if (!playerId) return;
    if (hcpValue === '') {
      setHcpError('Required');
      return;
    }
    const err = validateHCP(hcpValue);
    if (err) {
      setHcpError(err);
      return;
    }
    const numeric = parseFloat(hcpValue);
    // Skip save if value unchanged
    if (numeric === player?.initialHCP) {
      return;
    }
    setIsSavingHcp(true);
    try {
      await updatePlayerProfile({ uid: playerId, data: { initialHCP: numeric } });
    } catch (err) {
      console.error('Failed to save Initial Handicap:', err);
      setHcpError('Failed to save');
    } finally {
      setIsSavingHcp(false);
    }
  };

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

      {player?.isSetupComplete && (
        <Box sx={{ mt: 3, maxWidth: 480 }}>
          <Card>
            <CardContent>
              <Typography variant="title3" gutterBottom>
                Initial Handicap
              </Typography>
              <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
                Enter your exact handicap index. This anchors your Handicap History chart and is the starting point for the WHS calculation as you record rounds.
              </Typography>
              {player?.initialHCP == null && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  You haven't set an Initial Handicap yet. Add it here before recording your next round.
                </Alert>
              )}
              <TextField
                label="Initial Handicap Index"
                type="number"
                value={hcpValue}
                onChange={handleHcpChange}
                onBlur={handleHcpBlur}
                disabled={isSavingHcp}
                error={!!hcpError}
                helperText={hcpError || (isSavingHcp ? 'Saving...' : ' ')}
                fullWidth
                inputProps={{ min: 0, max: 54, step: 0.1 }}
              />
            </CardContent>
          </Card>
        </Box>
      )}

    </Box>

  )
}

export default Settings;
