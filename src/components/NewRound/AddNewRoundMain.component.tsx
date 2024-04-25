import { Box, Button, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoundMainData } from '../../features/newRound/newRoundMain.slice';
import { BoxNewRound, TextField } from '../../styles';
import { INewRound } from '../../types/round.types';
import { checkMainRoundDataValid } from '../../utils/round/round.utils';

const AddNewRoundMain = () => {
  const dispatch = useDispatch();
  const [newRound, setNewRound] = useState<INewRound>({
    roundID: '',
    roundDate: '',
    roundCourse: '',
    roundHoles: 0,
    roundTee: '',
    roundPar: 0,
    roundPlayingHCP: 0,
    roundStrokes: 0,
  });
  const [error, setError] = useState<boolean>(false);

  const setDate = (value: any) => {
    setNewRound(state => ({ ...state, roundDate: dayjs(value).format('DD/MM/YYYY') }))
  }
  const setField = (e: any) => {
    setNewRound(state => ({ ...state, [e.target.name]: e.target.value }));
  }

  const saveNewRound = () => {

    if (!!checkMainRoundDataValid(newRound)) {
      setError(false);
      dispatch(setRoundMainData({ newRound }));
    }
    else {
      setError(true);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BoxNewRound sx={{ rowGap: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography>Add new round</Typography>

        <Stack sx={{ flexWrap: 'wrap', flexDirection: 'row', rowGap: 1, columnGap: 1, justifyContent: 'space-between' }}>

          <DatePicker
            name='roundDate'
            label='Date of round'
            onChange={value => setDate(value)}
          />
          <TextField
            id="roundCourse"
            name='roundCourse'
            label="Course"
            variant="filled"
            sx={{ width: '100%', minWidth: '68%' }}
            error={error}
            onChange={e => setField(e)}
          />
        </Stack>

        <Stack sx={{ flexWrap: 'noWrap', flexDirection: 'row', rowGap: 10, columnGap: 1 }}>
          <TextField id="roundHoles" name='roundHoles' label="Holes" variant="filled" type='number' sx={{ maxWidth: 50 }} onChange={e => setField(e)} error={error}
          />

          <TextField id="roundTee" name='roundTee' label="Starting Tee" variant="filled" sx={{ maxWidth: 50 }} onChange={e => setField(e)} error={error}
          />

          <TextField id="roundPar" name='roundPar' label="Course Par" variant="filled" type='number' sx={{ maxWidth: 50 }} onChange={e => setField(e)} error={error}
          />

          <TextField id="roundPlayingHCP" name='roundPlayingHCP' label="Player HCP" variant="filled" type='number' sx={{ maxWidth: 50 }} onChange={e => setField(e)} error={error}
          />

          <TextField id="roundStrokes" name='roundStrokes' label="Strokes" variant="filled" type='number' sx={{ maxWidth: 50 }} onChange={e => setField(e)} error={error}
          />
        </Stack>

        <Stack direction={'row'} columnGap={1} alignItems={'center'}>
          <Button onClick={saveNewRound} variant='contained'>Save</Button>
          {!!error && <Typography variant='action' sx={{ color: '#902727' }}>Missin fields</Typography>}
        </Stack>
      </BoxNewRound>
    </LocalizationProvider>
  )
}

export default AddNewRoundMain
