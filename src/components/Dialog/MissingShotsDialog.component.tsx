import { IMissingShotsDialogProps } from '@/types/props.types';
import { IIntermediateShot } from '@/types/roundData.types';
import { fairwayValues as defaultFairwayValues } from '@/utils/constant.utils';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MissingShotsDialog: React.FC<IMissingShotsDialogProps> = ({
  open,
  numberOfShots,
  allClubs,
  fairwayValues = defaultFairwayValues,
  onClose,
  onSubmit,
}) => {
  const [intermediateShotsData, setIntermediateShotsData] = useState<IIntermediateShot[]>([]);

  useEffect(() => {
    if (open) {
      setIntermediateShotsData(
        Array(numberOfShots)
          .fill(null)
          .map(() => ({ club: '', distance: 0, fairway: 0 }))
      );
    }
  }, [open, numberOfShots]);

  const handleChange = (index: number, field: keyof IIntermediateShot, value: string | number) => {
    const updatedShots = [...intermediateShotsData];
    if (field === 'distance') {
      updatedShots[index] = { ...updatedShots[index], [field]: Number(value) };
    } else {
      updatedShots[index] = { ...updatedShots[index], [field]: value };
    }
    setIntermediateShotsData(updatedShots);
  };

  const handleSubmit = () => {
    for (const shot of intermediateShotsData) {
      if (!shot.club || shot.distance <= 0) {
        alert('Please fill in all club and distance (must be > 0) for each missing shot.');
        return;
      }
    }
    onSubmit(intermediateShotsData);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Missing Shot Details</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Your score indicates there are {numberOfShots} additional shot(s) to account for. Please provide details:
        </Typography>
        {intermediateShotsData.map((shot, index) => (
          <Grid container spacing={2} key={index} sx={{ marginTop: 1, marginBottom: 2, border: '1px solid #eee', p: 1 }}>
            <Typography variant="subheadline2" gutterBottom sx={{ width: '100%', pl: 2 }}>Shot {index + 1}</Typography>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id={`club-label-${index}`}>Club</InputLabel>
                <Select
                  labelId={`club-label-${index}`}
                  value={shot.club}
                  onChange={(e) => handleChange(index, 'club', e.target.value)}
                  label="Club"
                >
                  {allClubs.map((clubName) => (
                    <MenuItem key={clubName} value={clubName}>
                      {clubName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Distance (meters)"
                type="number"
                variant="outlined"
                fullWidth
                value={shot.distance || ''}
                onChange={(e) => handleChange(index, 'distance', e.target.value)}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id={`fairway-label-${index}`}>Fairway</InputLabel>
                <Select
                  labelId={`fairway-label-${index}`}
                  value={shot.fairway}
                  onChange={(e) => handleChange(index, 'fairway', Number(e.target.value))}
                  label="Fairway"
                >
                  <MenuItem value={0}><em>None/Other</em></MenuItem>
                  {fairwayValues.map((fw) => (
                    <MenuItem key={fw.value} value={fw.value}>
                      {fw.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Missing Shots</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissingShotsDialog;