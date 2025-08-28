import { IPuttsProps } from '@/types/props.types';
import { Grid, TextField } from "@mui/material";

const PuttsGenerator = ({
  puttsNumber,
  puttLengths, // New prop to receive current putt lengths
  setPuttDistance
}: IPuttsProps) => {
  return (
    // <Box sx={{ gap: 1, display: 'flex' }}>

    <Grid container spacing={1} columns={{ xs: 1, sm: 3 }} sx={{ mt: 1 }}>
      {
        puttsNumber.slice(0, 3).map((puttValue: number, index: number) => {
          return (
            <Grid size={{ xs: 12, sm: 1 }}>
              <TextField
                key={index} // Use index for key if puttValue can repeat, or puttValue if unique
                id={`putt${index}`}
                label={`Putt ${puttValue}`} // Display 1-based putt number
                variant="filled"
                type='number'
                onChange={e => setPuttDistance(e, index)} // Pass 0-based index
                value={puttLengths && puttLengths[index] !== undefined ? (puttLengths[index] === 0 ? '' : puttLengths[index]) : ''} // Pre-fill value
                sx={{ width: '100%' }}
              />
            </Grid>
          );
        })
      }
    </Grid>
    // </Box>
  )
}

export default PuttsGenerator
