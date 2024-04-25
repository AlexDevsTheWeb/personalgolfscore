import { Box, Stack, Typography } from '@mui/material'
import { TextField } from '../styles'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const AddNewRound = () => {
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ rowGap: 1 }}>
        <Typography>Add new round</Typography>

        <Stack sx={{ flexWrap: 'wrap', flexDirection: 'row', rowGap: 1, columnGap: 1 }}>

          <DatePicker />
          <TextField id="roundDate" name='roundDate' label="Date" variant="filled" sx={{ minWidth: '48%' }} />
          <TextField id="roundCourse" name='roundCourse' label="Course" variant="filled" sx={{ minWidth: '48%' }} />
        </Stack>

        <Stack sx={{ flexWrap: 'wrap', flexDirection: 'row', rowGap: 1, columnGap: 1 }}>



          <TextField id="roundHoles" name='roundHoles' label="Holes" variant="filled" type='number' sx={{ minWidth: 100 }} />

          <TextField id="roundTee" name='roundTee' label="Starting Tee" variant="filled" sx={{ minWidth: 100 }} />

          <TextField id="roundPar" name='roundPar' label="Course Par" variant="filled" type='number' sx={{ minWidth: 100 }} />

          <TextField id="roundPlayingHCP" name='roundPlayingHCP' label="Player HCP" variant="filled" type='number' sx={{ minWidth: 100 }} />

          <TextField id="roundStrokes" name='roundStrokes' label="Strokes" variant="filled" type='number' sx={{ minWidth: 100 }} />
        </Stack>
      </Box>
    </LocalizationProvider>
  )
}

export default AddNewRound
