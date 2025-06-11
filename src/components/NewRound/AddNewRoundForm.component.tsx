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
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { AppDispatch, RootState } from '@/store/store';
import { INewRound } from '@/types/round.types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header/Header.component';

const AddNewRoundForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const roundData = useSelector((state: RootState) => state.newRound.newRoundMain.round);
  const setFirstHole = useSelector((state: RootState) => state.newRound.newRoundMain.setFirstHole);
  const roundDateString = useSelector((state: RootState) => state.newRound.newRoundMain.round.roundDate);
  const roundDateValue = roundDateString && dayjs(roundDateString).isValid() ? dayjs(roundDateString) : null;

  const handleDateChange = (newValue: Dayjs | null) => {
    dispatch(setRoundDate(newValue));
  };

  const isMobile = useDeviceDetection().isMobile;

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

  if (setFirstHole) {
    return null;
  }

  return (
    <Dialog
      open={!setFirstHole}
      fullWidth
      maxWidth="sm"
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
      }}
    >

      <DialogTitle sx={{ height: 'auto', padding: '0px' }}>
        <Header title='New round: basic info' />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
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
              value={roundDateValue}
              onChange={handleDateChange}
              sx={{ width: '100%' }}
              format="DD/MM/YYYY"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
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
            <TextField
              name='roundTee'
              label="Tee"
              variant="outlined"
              value={roundData.roundTee || ''}
              onChange={e => dispatch(setRoundTee(e.target.value))}
              fullWidth
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
      </DialogContent>
      <DialogActions
        sx={{
          padding: '0px',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          '& > :not(style)': {
            m: isMobile ? 0.5 : 1,
            width: isMobile ? 'calc(100% - 16px)' : 'auto',
          },
          pb: isMobile ? 1 : 0,
        }}
      >

        <Button
          variant='outlined'
          onClick={handleCancel}
          sx={{ textAlign: 'center' }}
        >
          CANCEL
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddNewRoundForm
