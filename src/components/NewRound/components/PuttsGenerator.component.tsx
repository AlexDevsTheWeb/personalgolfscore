import { Box } from "@mui/material";
import TextField from '../../../styles/textfield/TextField.style';

interface IPuttsProps {
  puttsNumber: number[],
  setPuttDistance: any,
}

const PuttsGenerator = ({ puttsNumber, setPuttDistance }: IPuttsProps) => {
  return (
    <Box sx={{ gap: 1, display: 'flex' }}>
      {puttsNumber.slice(0, 3).map((putt: number) => {
        return (
          <TextField
            key={putt}
            id={`putt${putt}`}
            label={`Putt ${putt}`}
            variant="filled"
            type='number'
            onChange={e => setPuttDistance(e, putt)}
          />
        );
      })}
    </Box>
  )
}

export default PuttsGenerator
