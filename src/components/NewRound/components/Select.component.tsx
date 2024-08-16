import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectMui } from '@mui/material';
import _, { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CHIPCONDITION } from '../../../enum/shots.enum';
import { RootState } from '../../../store/store';

interface ISelectProps {
  name: string,
  list: string[],
  onChange: any,
  gir?: boolean,
  par?: number,
  value?: string,
  label?: string,
}

const Select = (props: ISelectProps) => {

  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { name, list, onChange, gir, value, label } = props;
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: SelectChangeEvent) => {
    onChange(e);
  }

  useEffect(() => {
    switch (name) {
      case CHIPCONDITION.GREEN:
      case CHIPCONDITION.CHIP:
        if (!!gir) { setDisabled(true) }
        break;
      case CHIPCONDITION.FAIRWAY:
        if (tmpHole.par === 3) {
          setDisabled(true);
        }
        else {
          setDisabled(false);
        }
        break;
      default:
        setDisabled(false);
    }
  }, [name, gir, tmpHole.par]);



  return (
    <FormControl variant='filled'>
      <InputLabel id="newHole_select">{capitalize(name)}</InputLabel>
      <SelectMui
        value={value !== '0' ? value : ''}
        name={name}
        onChange={(e: SelectChangeEvent) => handleChange(e)}
        sx={{ minWidth: '75px', width: '150px' }}
        disabled={disabled}
        label={label}
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
