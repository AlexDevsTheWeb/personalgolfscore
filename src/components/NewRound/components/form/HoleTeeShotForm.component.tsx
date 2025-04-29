import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import { IShots } from '@/types/roundData.types';
import { SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import Select from '../Select.component';

interface HoleTeeShotFormProps {
  holeData: Pick<IShots, 'teeClub' | 'fairway' | 'driveDistance' | 'par' | 'distance'>;
  teeClubs: string[];
  fairwayValues: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}
const HoleTeeShotForm: React.FC<HoleTeeShotFormProps> = ({ holeData, teeClubs, fairwayValues, onChange }) => {
  const isPar3 = holeData.par === 3;
  const driveDistanceValue = holeData.driveDistance !== 0 ? holeData.driveDistance : '';


  return (
    <HoleCard>
      <HoleCardHeader title='Tee shot' />
      <HoleCardContent>
        <Select
          name='teeClub'
          list={teeClubs}
          onChange={onChange}
          value={holeData.teeClub ? holeData.teeClub.toString() : ''}
          label='Tee club'
        />
        <Select
          name='fairway'
          list={fairwayValues}
          onChange={onChange}
          value={holeData.fairway.toString()}
          par={holeData.par as number}
          label='Fairway position'
          disabled={isPar3}
        />
        <TextField
          name='driveDistance'
          label='Distance'
          variant='filled'
          type='number'
          onChange={onChange}
          value={driveDistanceValue}
          // Disable drive distance on par 3 directly here
          disabled={isPar3}
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleTeeShotForm
