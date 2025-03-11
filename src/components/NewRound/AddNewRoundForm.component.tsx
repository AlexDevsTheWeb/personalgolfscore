import { setRoundMainData } from '@/features/newRound/newRoundMain.slice';
import { setTotalMainData } from '@/features/newRound/newRoundTotals.slice';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import BoxGeneralShadow from '@/styles/box/BoxGeneralShadow.styles';
import DatePicker from '@/styles/datepicker/DatePicker.styles';
import TextField from '@/styles/textfield/TextField.style';
import { INewRound } from '@/types/round.types';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import DistancesButton from './components/DistancesButton.component';

const AddNewRoundForm = () => {
  const dispatch = useDispatch();
  const { showDistances } = useSelector((store: RootState) => store.controls);

  const [data, setData] = useState({ roundDate: '', roundCourse: '', roundHoles: 0, roundTee: '', roundPar: 0, roundPlayingHCP: 0, roundNumber: 0 })
  const isMobile = useDeviceDetection().isMobile;
  const handleSubmit = () => {
    const { roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundNumber } = data;
    dispatch(setRoundMainData({
      newRound: {
        roundDate: roundDate,
        roundCourse: roundCourse,
        roundHoles: roundHoles,
        roundTee: roundTee,
        roundPar: roundPar,
        roundPlayingHCP: roundPlayingHCP,
        roundNumber: roundNumber,
      }
    }));
    const round: INewRound = {
      roundCourse: roundCourse,
      roundDate: roundDate,
      roundNumber: roundNumber,
      roundTee: roundTee,
      roundPar: roundPar,
      roundPlayingHCP: roundPlayingHCP,
      roundHoles: roundHoles,
    }
    dispatch(setTotalMainData({ round }))
  }

  const handleChange = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  const handleChangeDate = (e: any) => {
    setData((prevData) => ({
      ...prevData,
      roundDate: dayjs(e).format('YYYY-MM-DD'),
    }));
  }

  return (

    <BoxGeneralShadow direction={'column'} sx={{ flexDirection: 'row !important', alignItems: 'center', flexWrap: 'wrap' }}>

      <Box sx={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '5px', padding: '0px !important', alignContent: 'stretch',
        alignItems: 'center'
      }}>

        {/* TODO: Maybe we can use Autocomplete in some cases instead of TextField? */}
        <TextField name='roundCourse' label="Round course" variant="filled" onChange={e => handleChange(e)} />
        <DatePicker onChange={e => handleChangeDate(e)} />

        <TextField name='roundHoles' label="Holes" variant="filled" type='number' onChange={e => handleChange(e)} width={65} />
        <TextField name='roundPar' label="Par" variant="filled" type='number' onChange={e => handleChange(e)} width={65} />
        <TextField name='roundPlayingHCP' label="HCP" variant="filled" type='number' onChange={e => handleChange(e)} width={65} />

        <TextField name='roundTee' label="Tee" variant="filled" onChange={e => handleChange(e)} width={80} />
        <TextField name='roundNumber' label="Round #" variant="filled" type='number' onChange={e => handleChange(e)} width={65} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', width: isMobile ? '100%' : 'auto', gap: '10px' }}>
        {
          !!showDistances &&
          <ClubDistanceDialog open={showDistances} />
        }
        <DistancesButton />
        <Button fullWidth={isMobile ? true : false} variant='contained' onClick={handleSubmit} sx={{ marginTop: '0px' }}>SUBMIT</Button>
      </Box>
    </BoxGeneralShadow>

  )
}

export default AddNewRoundForm
