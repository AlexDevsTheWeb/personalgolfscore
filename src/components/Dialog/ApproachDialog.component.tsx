import { RootState } from '@/store/store';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import TextField from '@/styles/textfield/TextField.style';
import { ApproachDetailsDialogProps } from '@/types/props.types';
import { greenSideValues } from '@/utils/constant.utils';
import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from '../NewRound/components/Select.component';

const ApproachDetailsDialog: React.FC<ApproachDetailsDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { greenClubs, chipClubs } = useSelector((store: RootState) => store.newRound.newRoundClubs);

  const [toGreenMeters, setToGreenMeters] = useState(tmpHole.toGreenMeters || 0);
  const [greenSide, setGreenSide] = useState(tmpHole.greenSide || '');
  const [chipClub, setChipClub] = useState(tmpHole.chipClub || '');
  const [toGreen, setToGreen] = useState(tmpHole.toGreen || '');

  const [toGreenMetersManuallySet, setToGreenMetersManuallySet] = useState(false);

  const { par, distance, driveDistance, strokes, putts, gir } = tmpHole;
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'toGreen':
        setToGreen(e.target.value);
        break;
      case 'toGreenMeters':
        setToGreenMeters(Number(e.target.value));
        setToGreenMetersManuallySet(true);
        break;
      case 'greenSide':
        setGreenSide(e.target.value);
        break;
      case 'chipClub':
        setChipClub(e.target.value);
        break;
    }
  }

  const handleSubmit = () => {
    onSubmit(toGreenMeters, toGreen, greenSide, chipClub);
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onClick={handleSubmit}
      onSubmit={handleSubmit}
      title='Approach & Green details'
    >
      <Typography>
        Please insert approach to green clubs, meters, green side and chip club.
      </Typography>
      <Grid container spacing={1} columns={{ xs: 1, sm: 4 }} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 1 }}>
          <Select
            name='toGreen'
            list={greenClubs}
            onChange={handleValueChange}
            label='Approach club'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 1 }}>
          <TextField
            name='toGreenMeters' label="Mts. to green" type='number'
            value={toGreenMeters || ''} onChange={handleValueChange}
            disabled={isPar3 || disableToGreenMetersField}
            variant='outlined'
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 1 }}>
          <Select
            value={greenSide}
            label="Green side miss"
            disabled={girHappened}
            name='greenSide'
            list={greenSideValues}
            onChange={handleValueChange}
          />

        </Grid>
        <Grid size={{ xs: 12, sm: 1 }}>
          <Select
            value={chipClub}
            label="Chip club"
            disabled={girHappened}
            name='chipClub'
            list={chipClubs}
            onChange={handleValueChange}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ApproachDetailsDialog;