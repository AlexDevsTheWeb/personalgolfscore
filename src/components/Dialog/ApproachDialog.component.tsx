import { IShots } from '@/types/roundData.types';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface ApproachDetailsDialogProps {
  open: boolean;
  initialHoleData: Pick<
    IShots,
    'par' | 'distance' | 'driveDistance' | 'toGreenMeters' | 'teeClub' |
    'toGreen' | 'greenSide' | 'chipClub' | 'strokes' | 'putts' | 'gir'
  >;
  chipClubs: string[];
  greenSideValues: string[];
  onClose: () => void;
  onSubmit: (details: {
    toGreenMeters?: number;
    toGreen?: string;
    greenSide?: string;
    chipClub?: string;
  }) => void;
}

const ApproachDetailsDialog: React.FC<ApproachDetailsDialogProps> = ({
  open,
  initialHoleData,
  chipClubs,
  greenSideValues,
  onClose,
  onSubmit,
}) => {
  const [toGreenMeters, setToGreenMeters] = useState(initialHoleData.toGreenMeters || 0);
  const [greenSide, setGreenSide] = useState(initialHoleData.greenSide || '');
  const [chipClub, setChipClub] = useState(initialHoleData.chipClub || '');

  const [toGreenMetersManuallySet, setToGreenMetersManuallySet] = useState(false);

  const { par, distance, driveDistance, teeClub, strokes, putts, gir } = initialHoleData;
  const isPar3 = par === 3;
  const girHappened = gir;

  let calculatedSuggestion: number | null = null;
  if (isPar3) {
    if (distance > 0) calculatedSuggestion = distance;
  } else {
    if (distance > 0 && driveDistance > 0) {
      const result = distance - driveDistance;
      calculatedSuggestion = result >= 0 ? result : 0;
    }
  }

  const disableToGreenMetersField =
    (typeof strokes === 'number' && strokes > 0 && typeof putts === 'number' && putts >= 0) &&
    (strokes - (putts + 1)) <= 1;

  useEffect(() => {
    if (open) {
      setToGreenMeters(initialHoleData.toGreenMeters || 0);
      setGreenSide(initialHoleData.greenSide || '');
      setChipClub(initialHoleData.chipClub || '');
      setToGreenMetersManuallySet(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && !toGreenMetersManuallySet) {
      if (calculatedSuggestion !== null && calculatedSuggestion > 0) {
        if (calculatedSuggestion !== toGreenMeters) {
          setToGreenMeters(calculatedSuggestion);
        }
      } else if (toGreenMeters > 0 && !isPar3 && driveDistance === 0 && calculatedSuggestion === null) {
        setToGreenMeters(0);
      }
    }
  }, [open, calculatedSuggestion, toGreenMeters, toGreenMetersManuallySet, isPar3, driveDistance]);

  const handleToGreenMetersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToGreenMeters(Number(e.target.value) || 0);
    setToGreenMetersManuallySet(true);
  };

  const handleSubmit = () => {
    onSubmit({
      toGreenMeters: toGreenMeters > 0 ? toGreenMeters : undefined,
      greenSide: greenSide || undefined,
      chipClub: chipClub || undefined,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Approach & Green Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              name='toGreenMeters' label="Mts. to green" type='number'
              value={toGreenMeters || ''} onChange={handleToGreenMetersChange}
              disabled={isPar3 || disableToGreenMetersField}
              variant='outlined' fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={greenSideValues} value={greenSide}
              getOptionLabel={(option) => String(option)}
              onChange={(event, newValue) => setGreenSide(newValue || '')}
              renderInput={(params) => <TextField {...params} label="Green side miss" variant="outlined" />}
              disabled={girHappened} fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={chipClubs} value={chipClub}
              getOptionLabel={(option) => String(option)}
              onChange={(event, newValue) => setChipClub(newValue || '')}
              renderInput={(params) => <TextField {...params} label="Chip club" variant="outlined" />}
              disabled={girHappened} fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Approach Details</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApproachDetailsDialog;