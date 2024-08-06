import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

interface ISelectProps {
  name: string,
  list: string[],
  onChange: any,
  gir?: string,
}

const Select = ({ name, list, onChange, gir }: ISelectProps) => {
  const [selectedPar, setSelectedPar] = useState<string>('...');
  const [newList] = useState<string[]>(['...', ...list]);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedPar(e.target.value);
    onChange(e);
  }

  useEffect(() => {
    if (gir === 'Yes') {
      if (name === 'greenSide' || name === 'chipClub') {
        setDisabled(true);
      }
      else {
        setDisabled(false);
      }
    }
    else {
      setDisabled(false);
    }
  }, [gir, name]);

  return (
    <FormControl variant='filled'>
      <InputLabel id="demo-simple-select-label">{capitalize(name)}</InputLabel>
      <SelectMui
        value={selectedPar}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
        sx={{ minWidth: '100px', width: '150px' }}
        disabled={disabled}
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