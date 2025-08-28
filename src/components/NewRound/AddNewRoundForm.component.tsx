import {
  setRoundCourse,
  setRoundDate,
  setRoundHoles,
  setRoundMainData,
  setRoundNumber,
  setRoundPar,
  setRoundPlayingHCP,
  setRoundTee
} from '@/features/newRound/newRoundMain.slice';
import { setTotalMainData } from '@/features/newRound/newRoundTotals.slice';
import { AppDispatch, RootState } from '@/store/store';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import { INewRound } from '@/types/round.types';
import {
  Grid,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from './components/Select.component';

const AddNewRoundForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const roundData = useSelector((state: RootState) => state.newRound.newRoundMain.round);
  const setFirstHole = useSelector((state: RootState) => state.newRound.newRoundMain.setFirstHole);
  const roundDateString = useSelector((state: RootState) => state.newRound.newRoundMain.round.roundDate);
  const roundDateValue = roundDateString && dayjs(roundDateString).isValid() ? dayjs(roundDateString) : dayjs(new Date());

  useEffect(() => {
    if (!roundDateString) {
      dispatch(setRoundDate(dayjs(new Date())));
    }
  }, [dispatch, roundDateString]);

  const handleDateChange = (newValue: Dayjs | null) => {
    dispatch(setRoundDate(newValue));
  };

  const handleSubmit = () => {
    const currentRoundData = roundData;
    dispatch(setRoundMainData({}));

    const roundForTotals: INewRound = {
      ...currentRoundData,
      roundDate: currentRoundData.roundDate || '',
    };
    dispatch(setTotalMainData({ round: roundForTotals }));
  };

  const handleCancel = () => {
    dispatch(setRoundMainData({}));
    navigate('/dashboard');
  }

  

  return (
    <Dialog
      open={!setFirstHole}
      title='New round: basic info'
      onClose={handleCancel}
      onSubmit={handleSubmit}
      onClick={handleSubmit}
    >
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <TextField
            name='roundCourse'
            label="Round course"
            variant="outlined"
            fullWidth
            value={roundData.roundCourse || ''}
            onChange={e => dispatch(setRoundCourse(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <DatePicker
            defaultValue={dayjs(new Date())}
            value={roundDateValue}
            onChange={handleDateChange}
            sx={{ width: '100%' }}
            format="DD/MM/YYYY"

          />
        </Grid>
        <Grid size={{ xs: 4, sm: 2, lg: 2 }}>
          <TextField
            name='roundHoles'
            label="Holes"
            variant='outlined'
            type='number'
            fullWidth
            value={roundData.roundHoles || ''}
            onChange={e => dispatch(setRoundHoles(Number(e.target.value)))}
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 2, lg: 2 }}>
          <TextField
            name='roundPar'
            label="Par"
            variant="outlined"
            type='number'
            value={roundData.roundPar || ''}
            onChange={e => dispatch(setRoundPar(Number(e.target.value)))}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 2, lg: 2 }}>
          <TextField
            name='roundPlayingHCP'
            label="HCP"
            variant="outlined"
            fullWidth
            type='number'
            value={roundData.roundPlayingHCP || ''}
            onChange={e => dispatch(setRoundPlayingHCP(Number(e.target.value)))}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, lg: 3 }}>
          <Select
            name='roundTee'
            value={roundData.roundTee || ''}
            label='Tee'
            list={['White', 'Blue', 'Yellow', 'Red', 'Green', 'Orange']}
            onChange={(e: any) => dispatch(setRoundTee(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, lg: 3 }}>
          <TextField
            name='roundNumber'
            label="Round #"
            variant="outlined"
            type='number'
            value={roundData.roundNumber || ''}
            onChange={e => dispatch(setRoundNumber(Number(e.target.value)))}
            fullWidth
          />
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default AddNewRoundForm
