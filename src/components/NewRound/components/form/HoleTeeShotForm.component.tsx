import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import { IHoleTeeShotFormProps } from '@/types/props.types';
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const HoleTeeShotForm: React.FC<IHoleTeeShotFormProps> = ({ holeData, teeClubs = [], fairwayValues = [], onChange }) => {
  const isPar3 = holeData.par === 3;
  const driveDistanceValue = holeData.driveDistance !== 0 ? holeData.driveDistance : '';

  return (
    <HoleCard>
      <HoleCardHeader title='Tee shot' />
      <HoleCardContent>
        <Autocomplete
          options={teeClubs}
          value={holeData.teeClub || null} onChange={(event, newValue) => {
            onChange({ target: { name: 'teeClub', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tee club"
              name="teeClub"
              variant="filled"
            />
          )}
          sx={{ width: 150 }}
        />
        <Autocomplete
          options={fairwayValues}
          sx={{ width: 150 }}
          getOptionLabel={(option) => option.label || ''}
          value={fairwayValues.find(fv => fv.value === holeData.fairway) || null}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'fairway', value: newValue?.value ?? 0 } } as any);
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Position"
              name="fairway"
              variant="filled"
            />
          )}
          disabled={isPar3}
        />
        <TextField
          sx={{ width: 150 }}
          name='driveDistance'
          label='Distance'
          variant='filled'
          type='number'
          onChange={onChange}
          value={driveDistanceValue}
          disabled={isPar3}
        />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleTeeShotForm
