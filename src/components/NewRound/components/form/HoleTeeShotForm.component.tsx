import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import CustomTextField from '@/styles/textfield/TextField.style'; // Import your custom TextField
import { IHoleTeeShotFormProps } from '@/types/props.types';
import { Autocomplete } from "@mui/material"; // Import Autocomplete
import React from "react";
// Removed Select import as it's no longer used here

const HoleTeeShotForm: React.FC<IHoleTeeShotFormProps> = ({ holeData, teeClubs = [], fairwayValues = [], onChange }) => {
  const isPar3 = holeData.par === 3;
  const driveDistanceValue = holeData.driveDistance !== 0 ? holeData.driveDistance : '';

  return (
    <HoleCard>
      <HoleCardHeader title='Tee shot' />
      <HoleCardContent>
        <Autocomplete
          options={teeClubs}
          value={holeData.teeClub || null} // Autocomplete expects null for no selection
          onChange={(event, newValue) => {
            // Create a synthetic event object for the original onChange handler
            onChange({ target: { name: 'teeClub', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              label="Tee club"
              name="teeClub" // Ensure name is passed for potential form handling
              variant="filled" // Match styling if needed
            />
          )}
          sx={{ width: 150 }} // Adjust width as needed
          size="small" // Match size if needed
        />
        <Autocomplete
          options={fairwayValues}
          getOptionLabel={(option) => option.label || ''}
          // Find the object in fairwayValues that matches holeData.fairway
          value={fairwayValues.find(fv => fv.value === holeData.fairway) || null}
          onChange={(event, newValue) => {
            // Pass the numeric value to the original onChange handler
            onChange({ target: { name: 'fairway', value: newValue?.value ?? 0 } } as any); // Default to 0 if null
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              label="Fairway position"
              name="fairway"
              variant="filled"
            />
          )}
          disabled={isPar3}
          sx={{ width: 150 }} // Adjust width as needed
          size="small" // Match size if needed
        />
        {/* Use your CustomTextField here too for consistency */}
        <CustomTextField
          width={100} // Use width prop if your custom TextField supports it
          size="small" // Match size if needed
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
