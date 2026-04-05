import { Dialog } from '@/styles/dialog/Dialog.styles';
import { INewRound } from '@/types/round.types';
import {
  Grid,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from './components/Select.component';
import { useNewRoundStore } from '@/store/zustand';

const AddNewRoundForm = () => {
  const navigate = useNavigate();
  const roundData = useNewRoundStore((state) => state.main.round);
  const setFirstHole = useNewRoundStore((state) => state.main.setFirstHole);
  const setRoundDate = useNewRoundStore((state) => state.setRoundDate);
  const setRoundMainData = useNewRoundStore((state) => state.setRoundMainData);
  const setTotalsByHole = useNewRoundStore((state) => state.setTotalsByHole);
  const holes = useNewRoundStore((state) => state.holes.holes);
  
  const roundDateString = roundData.roundDate;
  const roundDateValue = roundDateString && dayjs(roundDateString).isValid() ? dayjs(roundDateString) : dayjs(new Date());

  useEffect(() => {
    if (!roundDateString) {
      setRoundDate(dayjs(new Date()));
    }
  }, [roundDateString, setRoundDate]);

  const handleDateChange = (newValue: Dayjs | null) => {
    setRoundDate(newValue);
  };

  const handleSubmit = () => {
    const currentRoundData = roundData;
    setRoundMainData({});

    const roundForTotals: INewRound = {
      ...currentRoundData,
      roundDate: currentRoundData.roundDate || '',
    };
    setTotalsByHole(holes);
  };

  const handleCancel = () => {
    setRoundMainData({});
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
      <Grid container spacing={1} sx={{ mt: 1 }} columns={{ xs: 12, sm: 12, lg: 12 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <TextField
            name='roundCourse'
            label="Round course"
            variant="outlined"
            fullWidth
            value={roundData.roundCourse || ''}
            onChange={e => useNewRoundStore.getState().setRoundCourse(e.target.value)}
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
            onChange={e => useNewRoundStore.getState().setRoundHoles(Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 4, sm: 2, lg: 2 }}>
          <TextField
            name='roundPar'
            label="Par"
            variant="outlined"
            type='number'
            value={roundData.roundPar || ''}
            onChange={e => useNewRoundStore.getState().setRoundPar(Number(e.target.value))}
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
            onChange={e => useNewRoundStore.getState().setRoundPlayingHCP(Number(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, lg: 3 }}>
          <Select
            name='roundTee'
            value={roundData.roundTee || ''}
            label='Tee'
            list={['White', 'Blue', 'Yellow', 'Red', 'Green', 'Orange']}
            onChange={(e: any) => useNewRoundStore.getState().setRoundTee(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3, lg: 3 }}>
          <TextField
            name='roundNumber'
            label="Round #"
            variant="outlined"
            type='number'
            value={roundData.roundNumber || ''}
            onChange={e => useNewRoundStore.getState().setRoundNumber(Number(e.target.value))}
            fullWidth
          />
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default AddNewRoundForm
