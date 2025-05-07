import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import { IHoleApproachFormProps } from '@/types/props.types';
import { Autocomplete, TextField } from '@mui/material'; // Import Autocomplete
import React from 'react';
// Removed Select import
const HoleApproachForm: React.FC<IHoleApproachFormProps> = ({ holeData, greenClubs, chipClubs, greenSideValues, onChange }) => {

  const isPar3 = holeData.par === 3;
  const girHappened = holeData.gir; // Renamed for clarity, assuming holeData.gir means Green In Regulation

  // Determine the display value for 'Mts. to green'
  // It should prioritize an existing holeData.toGreenMeters value (e.g., from user input).
  // If holeData.toGreenMeters is not set or is zero, it suggests a calculated value.
  let toGreenMetersDisplayValue: string | number;
  const existingToGreenMeters = holeData.toGreenMeters;

  if (typeof existingToGreenMeters === 'number' && existingToGreenMeters > 0) {
    toGreenMetersDisplayValue = existingToGreenMeters;
  } else {
    let calculatedSuggestion: number | null = null;
    if (isPar3) {
      if (holeData.distance > 0) {
        calculatedSuggestion = holeData.distance;
      }
    } else { // Not Par 3
      if (holeData.distance > 0 && holeData.driveDistance > 0) {
        const result = holeData.distance - holeData.driveDistance;
        calculatedSuggestion = result >= 0 ? result : 0; // Ensure it's not negative
      }
    }
    toGreenMetersDisplayValue = (calculatedSuggestion !== null && calculatedSuggestion > 0) ? calculatedSuggestion : '';
  }

  const approachClubValue = isPar3 ? (holeData.teeClub ?? '') : (holeData.toGreen ?? '');

  // New condition to disable the 'Mts. to green' field
  const disableToGreenMetersField =
    (typeof holeData.strokes === 'number' && holeData.strokes > 0 &&
      typeof holeData.putts === 'number' && holeData.putts >= 0) &&
    (holeData.strokes - (holeData.putts + 1)) <= 1;

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
          disabled={disableToGreenMetersField}
          InputProps={{ readOnly: !isPar3 && disableToGreenMetersField }} // Field is readOnly if !isPar3 AND not disabled by the new rule
          sx={{ width: 130 }}
          variant='filled'
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
          disabled={girHappened}
          sx={{ width: 150 }}
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
          disabled={girHappened}
          sx={{ width: 150 }} // Adjust width as needed
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleApproachForm;
