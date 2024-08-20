import { TextField } from "@mui/material";
import BoxNewHole from "../../../styles/box/BoxNewHole.styles";

interface IPuttsProps {
  puttsNumber: number[],
  setPuttDistance: any,
}

const PuttsGenerator = ({ puttsNumber, setPuttDistance }: IPuttsProps) => {
  return (
    <BoxNewHole>
      {puttsNumber.map((putt: number) => {
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
    </BoxNewHole>
  )
}

export default PuttsGenerator
