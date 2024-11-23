import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRoundMainData } from '../../features/newRound/newRoundMain.slice';
import { setTotalMainData } from '../../features/newRound/newRoundTotals.slice';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import DatePicker from '../../styles/datepicker/DatePicker.styles';
import TextField from '../../styles/textfield/TextField.style';
import { INewRound } from '../../types/round.types';

const AddNewRoundForm = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({ roundDate: '', roundCourse: '', roundHoles: 0, roundTee: '', roundPar: 0, roundPlayingHCP: 0, roundNumber: 0 })
  const isMobile = useDeviceDetection().isMobile;
  const handleSubmit = () => {
    const { roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundNumber } = data;
    dispatch(setRoundMainData({
      newRound: {
        roundID: '',
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
      roundID: '',
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
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px', padding: '0px !important', alignContent: 'stretch',
        alignItems: 'center'
      }}>

        <TextField name='roundCourse' label="Round course" variant="filled" onChange={e => handleChange(e)} />
        <DatePicker onChange={e => handleChangeDate(e)} />

        <TextField name='roundHoles' label="Holes" variant="filled" type='number' onChange={e => handleChange(e)} width={80} />
        <TextField name='roundPar' label="Par" variant="filled" type='number' onChange={e => handleChange(e)} width={80} />
        <TextField name='roundPlayingHCP' label="HCP" variant="filled" type='number' onChange={e => handleChange(e)} width={80} />

        <TextField name='roundTee' label="Tee" variant="filled" onChange={e => handleChange(e)} width={80} />
        <TextField name='roundNumber' label="Round #" variant="filled" type='number' onChange={e => handleChange(e)} width={80} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
        <Button fullWidth={isMobile ? true : false} variant='contained' onClick={handleSubmit} sx={{ marginTop: '0px' }}>SUBMIT</Button>
      </Box>
    </BoxGeneralShadow >
  )
}

export default AddNewRoundForm
