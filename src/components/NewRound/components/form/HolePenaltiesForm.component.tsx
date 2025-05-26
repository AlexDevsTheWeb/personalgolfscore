import { HoleCard, HoleCardContent } from '@/styles/index';
import { IHolePenaltiesFormProps } from '@/types/props.types';
import { TextField } from "@mui/material";
import React from 'react';

const HolePenaltiesForm: React.FC<IHolePenaltiesFormProps> = ({
  holeData,
  onChange,
}) => {

  const waterValue = holeData.water !== 0 ? holeData.water : '';
  const outValue = holeData.out !== 0 ? holeData.out : '';

  return (
    <HoleCard>
      {/* <HoleCardHeader title='Penalties' /> */}
      <HoleCardContent>
        <TextField
          name='water'
          label="Water"
          type='number'
          variant='filled'
          onChange={onChange}
          value={waterValue}
          sx={{ width: 100 }}
        />
        <TextField
          name='out'
          label="Out"
          type='number'
          variant='filled'
          onChange={onChange}
          value={outValue}
          sx={{ width: 100 }}
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HolePenaltiesForm;

