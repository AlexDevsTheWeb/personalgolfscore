import { IPuttsProps } from '@/types/props.types';
import { Box, TextField } from "@mui/material";

const PuttsGenerator = ({ puttsNumber, setPuttDistance }: IPuttsProps) => {
  return (
    <Box sx={{ gap: 1, display: 'flex' }}>
      {puttsNumber.slice(0, 3).map((puttValue: number, index: number) => {
        return (
          <TextField
            key={index} // Use index for key if puttValue can repeat, or puttValue if unique
            id={`putt${index}`}
            label={`Putt ${puttValue}`} // Display 1-based putt number
            variant="filled"
            type='number'
            onChange={e => setPuttDistance(e, index)} // Pass 0-based index
            sx={{ width: 130 }}
          />
        );
      })}
    </Box>
  )
}

export default PuttsGenerator
