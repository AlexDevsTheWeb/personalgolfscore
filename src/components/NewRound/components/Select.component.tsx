import { CHIPCONDITION } from '@/enum/shots.enum';
import { ISelectProps } from '@/types/props.types';
import { newRoundDisabledSelect } from '@/utils/round/round.utils';
import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/zustand';

const Select = (props: ISelectProps) => {

  const holeTmp = useAppStore((state) => state.newRoundHoleTmp);
  const { name, list, onChange, value, label } = props;
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: SelectChangeEvent) => {
    onChange(e);
  }

  useEffect(() => {
    setDisabled(newRoundDisabledSelect(name, holeTmp));
  }, [name, holeTmp]);

  return (
    <FormControl variant='filled' sx={{ width: '100%' }}>
      <InputLabel id="newHole_select">{label}</InputLabel>
      <SelectMui
        value={value !== '0' ? value : ''}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}

        disabled={disabled}
        label={label}
      >
        {
          list.map((l: string) => {

            return (
              name === CHIPCONDITION.FAIRWAY
                ? <MenuItem sx={{}} value={(Number(l.substring(0, 1)))} key={_.uniqueId(`${name}`)}>{l}</MenuItem>
                : <MenuItem sx={{}} value={l} key={_.uniqueId(`${name}`)}>{l}</MenuItem>

            )
          })
        }
      </SelectMui>
    </FormControl>
  )
}

export default Select
