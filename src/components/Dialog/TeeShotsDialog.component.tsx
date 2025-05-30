import { IHoleTeeShotFormProps } from '@/types/props.types';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface TeeShotDetailsDialogProps {
  open: boolean;
  isPar3: boolean;
  initialFairwayValue: number;
  initialDistanceValue: number;
  fairwayValues: IHoleTeeShotFormProps['fairwayValues']; // Use the same type from props
  onClose: () => void;
  onSubmit: (details: { fairway: number; distance: number }) => void;
}

const TeeShotDetailsDialog: React.FC<TeeShotDetailsDialogProps> = ({
  open,
  isPar3,
  initialFairwayValue,
  initialDistanceValue,
  fairwayValues,
  onClose,
  onSubmit,
}) => {
  const [fairway, setFairway] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (open) {
      setFairway(initialFairwayValue);
      setDistance(initialDistanceValue);
    }
  }, [open, initialFairwayValue, initialDistanceValue]);

  const handleFairwayChange = (event: any, newValue: { label: string; value: number } | null) => {
    setFairway(newValue?.value ?? 0);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value) || 0);
  };

  const handleSubmit = () => {
    // For non-Par 3, distance is required if fairway is selected, or fairway is required if distance is entered.
    // Or simply, if it's not a Par 3, both should ideally be provided if one is.
    // For this example, we'll allow submitting even if one is missing for non-par3,
    // but you might want stricter validation.
    if (!isPar3 && distance <= 0 && fairway !== 0) {
      // alert('For non-Par 3 holes, please enter a valid distance if a fairway position is selected.');
      // return;
    }
    if (!isPar3 && distance > 0 && fairway === 0) {
      // alert('For non-Par 3 holes, please select a fairway position if a distance is entered.');
      // return;
    }
    onSubmit({ fairway, distance });
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Tee Shot Details</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          {isPar3
            ? "For Par 3s, distance is usually the hole length. Fairway position is not applicable."
            : "Please enter the fairway position and distance for your tee shot."}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <Autocomplete
              options={fairwayValues}
              getOptionLabel={(option) => option.label || ''}
              value={fairwayValues.find(fv => fv.value === fairway) || null}
              onChange={handleFairwayChange}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Fairway Position"
                  variant="outlined"
                  fullWidth
                />
              )}
              disabled={isPar3}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Distance (meters)"
              type="number"
              variant="outlined"
              fullWidth
              value={distance || ''}
              onChange={handleDistanceChange}
              disabled={isPar3}
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Details</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeeShotDetailsDialog;