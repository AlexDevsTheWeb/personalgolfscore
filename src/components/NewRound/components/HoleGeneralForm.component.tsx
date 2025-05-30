import { HoleCard, HoleCardContent } from '@/styles/index';
import { IHoleGeneralInfoFormProps } from '@/types/props.types';
import { Autocomplete, TextField } from '@mui/material'; // Import Autocomplete
import React from 'react';
import DistancesButton from './DistancesButton.component';

const HoleGeneralForm: React.FC<IHoleGeneralInfoFormProps> = ({
  holeData,
  hcpList,
  parList,
  currentHoleNumber,
  teeClubs = [],
  greenClubs = [], // Add greenClubs prop
  fairwayValues = [],
  onChange,
}) => {

  const distanceValue = holeData.distance !== 0 ? holeData.distance : '';
  const strokesValue = holeData.strokes !== 0 ? holeData.strokes : '';
  // holeData.toGreen is used directly in Autocomplete value
  const puttsValue = holeData.putts !== 0 ? holeData.putts : '';

  const waterValue = holeData.water !== 0 ? holeData.water : '';
  const outValue = holeData.out !== 0 ? holeData.out : '';

  return (
    <HoleCard>
      {/* <HoleCardHeader title={`Hole number: ${currentHoleNumber} - General Info`} /> */}
      <HoleCardContent>
        <Autocomplete
          options={hcpList}
          value={holeData.hcp ? holeData.hcp.toString() : null}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'hcp', value: newValue ? Number(newValue) : 0 } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Hole HCP"
              name="hcp"
              variant="filled"
            />
          )}
          sx={{ width: 130 }}
        />
        <Autocomplete
          options={parList}
          value={holeData.par ? holeData.par.toString() : null} // Use null for no selection
          onChange={(event, newValue) => {
            // Convert back to number for the original onChange handler
            onChange({ target: { name: 'par', value: newValue ? Number(newValue) : 0 } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Hole Par"
              name="par"
              variant="filled"
            />
          )}
          sx={{ width: 130 }} // Adjust width as needed
        />
        <TextField
          name='distance'
          label="Length"
          type='number'
          onChange={onChange}
          value={distanceValue}
          variant='filled'
          sx={{ width: 130 }}
        />
        <TextField
          name='strokes'
          label="Score"
          type='number'
          onChange={onChange}
          value={strokesValue}
          variant='filled'
          sx={{ width: 130 }}
        />
        <TextField
          name='putts'
          label="# of putts"
          type='number'
          onChange={onChange}
          value={puttsValue}
          variant='filled'
          sx={{ width: 130 }}
        />

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
          sx={{ width: 200 }}
        />
        <Autocomplete
          options={greenClubs} // Use greenClubs for options
          value={holeData.toGreen || null} // Bind to holeData.toGreen
          onChange={(event, newValue) => {
            onChange({ target: { name: 'toGreen', value: newValue || '' } } as any);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Approach club"
              name="toGreen" // Ensure name matches the state key
              variant="filled"
            />
          )}
          disabled={holeData.par === 3} // Disable if Par 3
          sx={{ width: 200 }}
        />
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
        <DistancesButton />
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleGeneralForm;
