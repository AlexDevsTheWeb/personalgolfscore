import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { capitalize } from 'lodash';
import { useState } from 'react';

const NumberSelect = ({ name, list, onChange }: { name: string, list: string[], onChange: any }) => {
  const [selectedPar, setSelectedPar] = useState<string>('...');
  const [newList] = useState<string[]>(['...', ...list]);

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedPar(e.target.value);
    onChange(e);
  }

  return (
    <FormControl variant='filled'>
      <InputLabel id="demo-simple-select-label">{capitalize(name)}</InputLabel>
      <Select
        value={selectedPar}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
      >
        {
          newList.map((l: string) => {
            return (
              //TODO: custom MenuItem con SelectItem to add hover color to elements in the select
              <MenuItem sx={{}} value={l} key={l}>{l}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  )
}

export default NumberSelect
