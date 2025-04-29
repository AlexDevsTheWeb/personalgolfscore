import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import TextField from '@/styles/textfield/TextField.style';
import { IShots } from '@/types/roundData.types';
import { SelectChangeEvent } from '@mui/material';
import React from 'react';

interface HolePenaltiesFormProps {
  holeData: Pick<IShots, 'water' | 'out'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

const HolePenaltiesForm: React.FC<HolePenaltiesFormProps> = ({
  holeData,
  onChange,
}) => {

  const waterValue = holeData.water !== 0 ? holeData.water : '';
  const outValue = holeData.out !== 0 ? holeData.out : '';

  return (
    <HoleCard>
      <HoleCardHeader title='Penalties' />
      <HoleCardContent>
        <TextField
          name='water'
          label="Water"
          type='number'
          onChange={onChange}
          value={waterValue}
          width={80}
        />
        <TextField
          name='out'
          label="Out"
          type='number'
          onChange={onChange}
          value={outValue}
          width={80}
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HolePenaltiesForm;

