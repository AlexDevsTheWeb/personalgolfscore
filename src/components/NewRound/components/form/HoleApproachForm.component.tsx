import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import TextField from '@/styles/textfield/TextField.style';
import { IHoleApproachFormProps } from '@/types/props.types';
import React from 'react';
import Select from '../Select.component';

const HoleApproachForm: React.FC<IHoleApproachFormProps> = ({ holeData, greenClubs, chipClubs, greenSideValues, onChange }) => {

  const isPar3 = holeData.par === 3;
  const disableChipFields = holeData.gir;

  let calculatedToGreenMeters: number | null = null;
  if (isPar3) {
    if (holeData.distance > 0) {
      calculatedToGreenMeters = holeData.distance;
    }
  } else {
    if (holeData.distance > 0 && holeData.driveDistance > 0) {
      const result = holeData.distance - holeData.driveDistance;
      calculatedToGreenMeters = result >= 0 ? result : 0; // Ensure it's not negative
    }
  }
  let toGreenMetersDisplayValue: string | number = '';
  if (calculatedToGreenMeters !== null) {
    toGreenMetersDisplayValue = calculatedToGreenMeters === 0 ? '' : calculatedToGreenMeters;
  } else {
    toGreenMetersDisplayValue = holeData.toGreenMeters > 0 ? holeData.toGreenMeters : '';
  }

  const approachClubValue = isPar3 ? (holeData.teeClub ?? '') : (holeData.toGreen ?? '');


  return (
    <HoleCard>
      <HoleCardHeader title='Approach & Short Game' />
      <HoleCardContent>
        <TextField
          name='toGreenMeters'
          label="Mts. to green"
          type='number'
          onChange={onChange}
          value={toGreenMetersDisplayValue}
          disabled={isPar3}
          slotProps={{ input: { readOnly: !isPar3 } }}
        />
        <Select
          name='toGreen'
          list={greenClubs}
          onChange={onChange}
          value={approachClubValue}
          label='Approach club'
          disabled={isPar3}
        />
        <Select
          name='greenSide'
          list={greenSideValues}
          onChange={onChange}
          value={holeData.greenSide ?? ''}
          label='Green side miss'
          disabled={disableChipFields}
        />
        <Select
          name='chipClub'
          label='Chip club'
          list={chipClubs}
          onChange={onChange}
          value={holeData.chipClub ?? ''}
          disabled={disableChipFields}
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleApproachForm;
