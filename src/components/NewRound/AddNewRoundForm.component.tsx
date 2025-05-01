import {
  setRoundCourse,
  setRoundDate,
  setRoundHoles,
  setRoundMainData, // Keep if needed, e.g., for setting setFirstHole flag
  setRoundNumber,
  setRoundPar,
  setRoundPlayingHCP,
  setRoundTee
} from '@/features/newRound/newRoundMain.slice';
import { setTotalMainData } from '@/features/newRound/newRoundTotals.slice';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { AppDispatch, RootState } from '@/store/store';
import BoxGeneralShadow from '@/styles/box/BoxGeneralShadow.styles';
import DatePicker from '@/styles/datepicker/DatePicker.styles';
import TextField from '@/styles/textfield/TextField.style';
import { INewRound } from '@/types/round.types';
import { Box, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import DistancesButton from './components/DistancesButton.component';

const AddNewRoundForm = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  // Select individual properties from the store
  const roundData = useSelector((state: RootState) => state.newRound.newRoundMain.round);
  const roundDateString = useSelector((state: RootState) => state.newRound.newRoundMain.round.roundDate);
  const { showDistances } = useSelector((store: RootState) => store.controls);
  const roundDateValue = roundDateString && dayjs(roundDateString).isValid() ? dayjs(roundDateString) : null;

  const handleDateChange = (newValue: Dayjs | null) => {
    dispatch(setRoundDate(newValue));
  };

  const isMobile = useDeviceDetection().isMobile;

  const handleSubmit = () => {
    // Data is already in Redux store, read it from there
    const currentRoundData = roundData; // Use the selector result

    // Dispatch action to set the flag indicating the main form is submitted
    // You could potentially pass the whole object if setRoundMainData still needs it
    // Or just dispatch an action specifically for the flag if setRoundMainData isn't needed elsewhere
    dispatch(setRoundMainData({})); // Assuming this sets the setFirstHole flag internally

    // Dispatch action to update totals slice with the main data
    // Ensure INewRound type matches the structure in Redux state
    const roundForTotals: INewRound = {
      ...currentRoundData,
      // Ensure roundDate is a string if needed by setTotalMainData
      roundDate: currentRoundData.roundDate || '', // Use the string from store
    };
    dispatch(setTotalMainData({ round: roundForTotals }));
  };


  return (

    <BoxGeneralShadow direction={'column'} sx={{ flexDirection: 'row !important', alignItems: 'center', flexWrap: 'wrap' }}>

      <Box sx={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '5px', padding: '0px !important', alignContent: 'stretch',
        alignItems: 'center'
      }}>

        {/* TODO: Maybe we can use Autocomplete in some cases instead of TextField? */}
        <TextField
          name='roundCourse'
          label="Round course"
          variant="filled"
          value={roundData.roundCourse || ''} // Read from store
          onChange={e => dispatch(setRoundCourse(e.target.value))} // Dispatch action
        />
        <DatePicker
          label='Round Date' // Corrected label
          value={roundDateValue}
          onChange={handleDateChange} // Use the existing handler
        />

        <TextField
          name='roundHoles'
          label="Holes"
          variant="filled"
          type='number'
          value={roundData.roundHoles || ''} // Read from store
          onChange={e => dispatch(setRoundHoles(Number(e.target.value)))} // Dispatch action
          width={65} />
        <TextField
          name='roundPar'
          label="Par"
          variant="filled"
          type='number'
          value={roundData.roundPar || ''} // Read from store
          onChange={e => dispatch(setRoundPar(Number(e.target.value)))} // Dispatch action
          width={65} />
        <TextField
          name='roundPlayingHCP'
          label="HCP"
          variant="filled"
          type='number'
          value={roundData.roundPlayingHCP || ''} // Read from store
          onChange={e => dispatch(setRoundPlayingHCP(Number(e.target.value)))} // Dispatch action
          width={65} />

        <TextField name='roundTee' label="Tee" variant="filled" value={roundData.roundTee || ''} onChange={e => dispatch(setRoundTee(e.target.value))} width={80} />
        <TextField name='roundNumber' label="Round #" variant="filled" type='number' value={roundData.roundNumber || ''} onChange={e => dispatch(setRoundNumber(Number(e.target.value)))} width={65} />
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
