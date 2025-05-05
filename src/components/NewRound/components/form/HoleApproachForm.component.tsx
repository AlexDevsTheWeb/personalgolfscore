import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import TextField from '@/styles/textfield/TextField.style';
import { IHoleApproachFormProps } from '@/types/props.types';
import { Autocomplete } from '@mui/material'; // Import Autocomplete
import React from 'react';
// Removed Select import
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
          size="small" // Match size if needed
          name='toGreenMeters'
          label="Mts. to green"
          type='number'
          onChange={onChange}
          value={toGreenMetersDisplayValue}
          disabled={isPar3}
          slotProps={{ input: { readOnly: !isPar3 } }}
        />
        <Autocomplete
          options={greenClubs}
          value={approachClubValue}
          // Explicitly convert option to string for label
          getOptionLabel={(option) => String(option)}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'toGreen', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Approach club"
              name="toGreen"
              variant="filled"
            />
          )}
          disabled={isPar3}
          sx={{ width: 150 }} // Adjust width as needed
          size="small" // Match size if needed
        />
        <Autocomplete
          options={greenSideValues}
          value={holeData.greenSide ?? ''}
          // Explicitly convert option to string for label
          getOptionLabel={(option) => String(option)}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'greenSide', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Green side miss"
              name="greenSide"
              variant="filled"
            />
          )}
          disabled={disableChipFields}
          sx={{ width: 150 }} // Adjust width as needed
          size="small" // Match size if needed
        />
        <Autocomplete
          options={chipClubs}
          value={holeData.chipClub ?? ''}
          // Explicitly convert option to string for label
          getOptionLabel={(option) => String(option)}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'chipClub', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Chip club" name="chipClub" variant="filled" />
          )}
          disabled={disableChipFields}
          sx={{ width: 150 }} // Adjust width as needed
          size="small" // Match size if needed
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleApproachForm;
