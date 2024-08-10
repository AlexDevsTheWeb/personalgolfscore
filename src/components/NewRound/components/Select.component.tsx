import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { CHIPCONDITION } from '../../../enum/shots.enum';

interface ISelectProps {
  name: string,
  list: string[],
  onChange: any,
  gir?: boolean,
}

const Select = ({ name, list, onChange, gir }: ISelectProps) => {
  const [selectedPar, setSelectedPar] = useState<string>('...');
  const [newList] = useState<string[]>(['...', ...list]);

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedPar(e.target.value);
    onChange(e);
  }

  return (
    <FormControl variant='filled'>
      <InputLabel id="demo-simple-select-label">{capitalize(name)}</InputLabel>
      <SelectMui
        value={selectedPar}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
        sx={{ minWidth: '100px', width: '150px' }}
        disabled={(name === CHIPCONDITION.GREEN || name === CHIPCONDITION.CHIP) && gir ? true : false}
      >
        {
          newList.map((l: string) => {
            return (
              //TODO: custom MenuItem con SelectItem to add hover color to elements in the select
              <MenuItem sx={{}} value={l} key={l}>{l}</MenuItem>
            )
          })
        }
      </SelectMui>
    </FormControl>
  )
}

export default Select
