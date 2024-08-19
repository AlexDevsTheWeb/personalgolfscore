import {
  Button,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoundMainData } from '../../features/newRound/newRoundMain.slice';
import { TextField } from '../../styles';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import BoxInternal from '../../styles/box/BoxInternal.styles';
import { INewRound } from '../../types/round.types';
import { checkMainRoundDataValid } from '../../utils/round/round.utils';

const AddNewRoundMain = () => {
  const dispatch = useDispatch();

  // FIXME: this are fixed value to speed up test fase. TO BE REMOVED!
  const [newRound, setNewRound] = useState<INewRound>({
    roundID: '',
    roundDate: dayjs(),
    roundCourse: 'test',
    roundHoles: 18,
    roundTee: 'Yellow',
    roundPar: 72,
    roundPlayingHCP: 29,
    roundStrokes: 103,
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
      <BoxGeneralShadow direction={'column'}>
        <Typography>Add new round</Typography>
        <BoxInternal>
          <BoxInternal>
            <TextField
              id="roundCourse"
              name='roundCourse'
              label="Course"
              variant="filled"
              error={error}
              onChange={e => setField(e)}
              value={newRound.roundCourse}
            />
            <DatePicker
              name='roundDate'
              label='Date of round'
              onChange={value => setDate(value)}
              value={newRound.roundDate}
            />
            <TextField
              id="roundTee"
              name='roundTee'
              label="Starting Tee"
              variant="filled"
              onChange={e => setField(e)}
              error={error}
              value={newRound.roundTee}
            />
            <TextField
              id="roundHoles"
              name='roundHoles'
              label="Holes"
              variant="filled"
              type='number'
              onChange={e => setField(e)}
              error={error}
              value={newRound.roundHoles}
            />
            <TextField
              id="roundPar"
              name='roundPar'
              label="Course Par"
              variant="filled"
              type='number'
              onChange={e => setField(e)}
              error={error}
              value={newRound.roundPar}
            />

            <TextField
              id="roundPlayingHCP"
              name='roundPlayingHCP'
              label="Player HCP"
              variant="filled"
              type='number'
              onChange={e => setField(e)}
              error={error}
              value={newRound.roundPlayingHCP}
            />

            <TextField
              id="roundStrokes"
              name='roundStrokes'
              label="Strokes"
              variant="filled"
              type='number'
              onChange={e => setField(e)}
              error={error}
              value={newRound.roundStrokes}
            />
          </BoxInternal>

          <Button onClick={saveNewRound} variant='contained'>Save</Button>
        </BoxInternal>
      </BoxGeneralShadow>
    </LocalizationProvider>
  )
}

export default AddNewRoundMain
