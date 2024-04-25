import { Box, Button, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoundMainData } from '../features/newRound/newRoundMain.slice';
import { TextField } from '../styles';
import { INewRound } from '../types/round.types';

const AddNewRound = () => {
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

  const setDate = (value: any) => {
    setNewRound(state => ({ ...state, roundDate: dayjs(value).format('DD/MM/YYYY') }))
  }
  const setField = (e: any) => {
    setNewRound(state => ({ ...state, [e.target.name]: e.target.value }));
  }

  const saveNewRound = () => {
    dispatch(setRoundMainData({ newRound }));
  }

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ rowGap: 1 }}>
        <Typography>Add new round</Typography>

        <Stack sx={{ flexWrap: 'wrap', flexDirection: 'row', rowGap: 1, columnGap: 1 }}>

          <DatePicker
            name='roundDate'
            label='Date of round'
            onChange={value => setDate(value)}
          />
          <TextField id="roundCourse" name='roundCourse' label="Course" variant="filled" sx={{ minWidth: '48%' }} onChange={e => setField(e)} />
        </Stack>

        <Stack sx={{ flexWrap: 'wrap', flexDirection: 'row', rowGap: 1, columnGap: 1 }}>
          <TextField id="roundHoles" name='roundHoles' label="Holes" variant="filled" type='number' sx={{ minWidth: 100 }} onChange={e => setField(e)} />

          <TextField id="roundTee" name='roundTee' label="Starting Tee" variant="filled" sx={{ minWidth: 100 }} onChange={e => setField(e)} />

          <TextField id="roundPar" name='roundPar' label="Course Par" variant="filled" type='number' sx={{ minWidth: 100 }} onChange={e => setField(e)} />

          <TextField id="roundPlayingHCP" name='roundPlayingHCP' label="Player HCP" variant="filled" type='number' sx={{ minWidth: 100 }} onChange={e => setField(e)} />

          <TextField id="roundStrokes" name='roundStrokes' label="Strokes" variant="filled" type='number' sx={{ minWidth: 100 }} onChange={e => setField(e)} />
        </Stack>
      </Box>

      <Box>
        <Button onClick={saveNewRound} variant='contained'>Save</Button>
      </Box>
    </LocalizationProvider>
  )
}

export default AddNewRound


