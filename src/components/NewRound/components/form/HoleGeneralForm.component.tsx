import { HoleCard, HoleCardContent } from '@/styles/index';
import { IHoleGeneralInfoFormProps } from '@/types/props.types';
import { Autocomplete, TextField } from '@mui/material'; // Import Autocomplete
import React from 'react';
import PuttsGenerator from '../../PuttsGenerator.component';

const HoleGeneralForm: React.FC<IHoleGeneralInfoFormProps> = ({
  holeData,
  hcpList,
  parList,
  puttsNumber,
  currentHoleNumber,
  onChange,
  onChangePutts,
}) => {

  const distanceValue = holeData.distance !== 0 ? holeData.distance : '';
  const strokesValue = holeData.strokes !== 0 ? holeData.strokes : '';
  const puttsValue = holeData.putts !== 0 ? holeData.putts : '';


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

        {puttsNumber.length > 0 && (
          <PuttsGenerator puttsNumber={puttsNumber} setPuttDistance={onChangePutts} />
        )}
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleGeneralForm;
