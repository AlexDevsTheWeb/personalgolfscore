import { CHIPCONDITION } from '@/enum/shots.enum';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import { newRoundDisabledSelect } from '@/utils/round/round.utils';
import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
    <FormControl variant='filled' sx={{ width: useDeviceDetection().isMobile ? '48%' : '170px' }}>
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
    </FormControl >
  )
}

export default Select
