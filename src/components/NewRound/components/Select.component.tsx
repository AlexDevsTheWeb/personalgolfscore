import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import _, { capitalize } from 'lodash';
import { useState } from 'react';
import { CHIPCONDITION } from '../../../enum/shots.enum';

interface ISelectProps {
  name: string,
  list: string[],
  onChange: any,
  gir?: boolean,
  value?: string,
}

const Select = (props: ISelectProps) => {
  const { name, list, onChange, gir, value } = props;
  const [selectedValue, setSetlectedValue] = useState<string>();

  const handleChange = (e: SelectChangeEvent) => {
    setSetlectedValue(e.target.value);
    onChange(e);
  }

  return (
    <FormControl variant='filled'>
      <InputLabel id="newHole_select">{capitalize(name)}</InputLabel>
      <SelectMui
        value={value !== '0' ? value : ''}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
        sx={{ minWidth: '75px', width: '150px' }}
        disabled={(name === CHIPCONDITION.GREEN || name === CHIPCONDITION.CHIP) && gir ? true : false}
      >
        {
          list.map((l: string) => {
            return (
              //TODO: custom MenuItem con SelectItem to add hover color to elements in the select
              <MenuItem sx={{}} value={l} key={_.uniqueId(`${name}`)}>{l}</MenuItem>
            )
          })
        }
      </SelectMui>
    </FormControl >
  )
}

export default Select
