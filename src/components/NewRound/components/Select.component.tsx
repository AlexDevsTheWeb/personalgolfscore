import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import _, { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CHIPCONDITION } from '../../../enum/shots.enum';
import { RootState } from '../../../store/store';
import { newRoundDisabledSelect } from '../../../utils/round/round.utils';

interface ISelectProps {
  name: string,
  list: string[],
  onChange: any,
  par?: number,
  value?: string,
  label?: string,
}

const Select = (props: ISelectProps) => {

  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { name, list, onChange, value, label } = props;
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: SelectChangeEvent) => {
    onChange(e);
  }

  useEffect(() => {
    setDisabled(newRoundDisabledSelect(name, tmpHole));
  }, [name, tmpHole]);

  return (
    <FormControl variant='filled'>
      <InputLabel id="newHole_select">{capitalize(name)}</InputLabel>
      <SelectMui
        value={value !== '0' ? value : ''}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
        sx={{ minWidth: '75px', width: '202px' }}
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
