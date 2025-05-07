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
import { INewRound } from '@/types/round.types';
import { Button, Grid, TextField } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

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
    <Grid container spacing={1}>
      <Grid size={{ lg: 3.5 }} sx={{ border: '1px solid #ff9900' }}>
        <StaticDatePicker
          orientation="landscape" // Corrected label
          value={roundDateValue}
          onChange={handleDateChange}
          slotProps={{
            actionBar: {
              actions: ['today'],
            },
          }}

        />
      </Grid>
      <Grid size={{ lg: 8.5 }} sx={{ border: '1px solid #0099ff', justifyContent: 'space-between', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
        <Grid container spacing={3}>
          <Grid size={6}>
            <TextField
              name='roundCourse'
              label="Round course"
              variant="filled"
              fullWidth
              value={roundData.roundCourse || ''} // Read from store
              onChange={e => dispatch(setRoundCourse(e.target.value))} // Dispatch action
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='roundHoles'
              label="Holes"
              variant="filled"
              type='number'
              fullWidth
              value={roundData.roundHoles || ''} // Read from store
              onChange={e => dispatch(setRoundHoles(Number(e.target.value)))}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='roundPar'
              label="Par"
              variant="filled"
              type='number'
              value={roundData.roundPar || ''} // Read from store
              onChange={e => dispatch(setRoundPar(Number(e.target.value)))}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='roundPlayingHCP'
              label="HCP"
              variant="filled"
              fullWidth
              type='number'
              value={roundData.roundPlayingHCP || ''} // Read from store
              onChange={e => dispatch(setRoundPlayingHCP(Number(e.target.value)))}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='roundTee'
              label="Tee"
              variant="filled"
              value={roundData.roundTee || ''}
              onChange={e => dispatch(setRoundTee(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid size={6}>
            <TextField
              name='roundNumber'
              label="Round #"
              variant="filled"
              type='number'
              value={roundData.roundNumber || ''}
              onChange={e => dispatch(setRoundNumber(Number(e.target.value)))}
              fullWidth
            />
          </Grid>






        </Grid>
        <Grid size={{ lg: 2 }} sx={{
          border: '1px solid #99ff00', justifyContent: 'end', alignItems: 'end', display: 'flex', flexDirection: 'column'
        }}>
          < Button fullWidth={isMobile ? true : false} variant='contained' onClick={handleSubmit} sx={{ marginTop: '0px' }}>SUBMIT</Button>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default AddNewRoundForm
