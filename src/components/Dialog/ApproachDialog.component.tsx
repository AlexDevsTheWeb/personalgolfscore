import { RootState } from '@/store/store';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import TextField from '@/styles/textfield/TextField.style';
import { greenSideValues } from '@/utils/constant.utils';
import { getChipClubs, getClubsNames, getDistanceClubs, getGreenClubs } from '@/utils/round/round.utils';
import { Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from '../NewRound/components/Select.component';

interface ApproachDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (toGreenMeters: number, toGreen: string, greenSide: string, chipClub: string,
  ) => void;
}

const ApproachDetailsDialog: React.FC<ApproachDetailsDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { player, isLoading: isPlayerLoading } = useSelector((store: RootState) => store.player);

  const [toGreenMeters, setToGreenMeters] = useState(tmpHole.toGreenMeters || 0);
  const [greenSide, setGreenSide] = useState(tmpHole.greenSide || '');
  const [chipClub, setChipClub] = useState(tmpHole.chipClub || '');
  const [toGreen, setToGreen] = useState(tmpHole.toGreen || '');

  const [toGreenMetersManuallySet, setToGreenMetersManuallySet] = useState(false);

  const { par, distance, driveDistance, teeClub, strokes, putts, gir } = tmpHole;
  const isPar3 = par === 3;
  const girHappened = gir;
  const golfBag = player?.golfBag;

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

  const derivedClubs = useMemo(() => {

    if (!golfBag || golfBag.length === 0) {
      return { teeClubs: [], distanceClubs: [], greenClubs: [], chipClubs: [] };
    }
    const teeClubNames = getClubsNames(golfBag);
    const distanceClubs = getDistanceClubs(teeClubNames);
    const greenClubs = getGreenClubs(teeClubNames);
    const chipClubs = getChipClubs(teeClubNames);

    return { teeClubs: teeClubNames, distanceClubs, greenClubs, chipClubs };
  }, [golfBag]);
  useEffect(() => {
    if (open) {
      setToGreenMeters(tmpHole.toGreenMeters || 0);
      setGreenSide(tmpHole.greenSide || '');
      setChipClub(tmpHole.chipClub || '');
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'toGreen':
        setToGreen(e.target.value);
        break;
      case 'toGreenMeters':
        setToGreenMeters(Number(e.target.value));
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
      <Grid container spacing={1} columns={{ xs: 1, sm: 4 }}>
        <Grid size={{ xs: 12, sm: 1 }}>
          <Select
            name='toGreen'
            list={derivedClubs.greenClubs}
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
            list={derivedClubs.chipClubs}
            onChange={handleValueChange}
          />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ApproachDetailsDialog;