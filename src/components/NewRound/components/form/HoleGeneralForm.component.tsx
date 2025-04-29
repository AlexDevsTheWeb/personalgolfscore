import { HoleCard, HoleCardContent, HoleCardHeader } from '@/styles/index';
import TextField from '@/styles/textfield/TextField.style';
import { IShots } from '@/types/roundData.types';
import { SelectChangeEvent } from '@mui/material';
import React from 'react';
import PuttsGenerator from '../../PuttsGenerator.component';
import Select from '../Select.component';

interface HoleGeneralInfoFormProps {
  holeData: Pick<IShots, 'hcp' | 'par' | 'distance' | 'strokes' | 'putts'>;
  hcpList: string[];
  parList: string[];
  puttsNumber: number[];
  currentHoleNumber: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
  onChangePutts: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, puttIndex: number) => void;
}

const HoleGeneralForm: React.FC<HoleGeneralInfoFormProps> = ({
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
      <HoleCardHeader title={`Hole number: ${currentHoleNumber} - General Info`} />
      <HoleCardContent>
        <Select
          name='hcp'
          list={hcpList}
          onChange={onChange}
          value={holeData.hcp.toString()}
          label='Hole HCP'
        />
        <Select
          name='par'
          list={parList}
          onChange={onChange}
          value={holeData.par.toString()}
          label='Hole Par'
        />
        <TextField
          name='distance'
          label="Length"
          type='number'
          onChange={onChange}
          value={distanceValue}
        />
        <TextField
          name='strokes'
          label="Score"
          type='number'
          onChange={onChange}
          value={strokesValue}
        />
        <TextField
          name='putts'
          label="# of putts"
          type='number'
          onChange={onChange}
          value={puttsValue}
        />

        {puttsNumber.length > 0 && (
          <PuttsGenerator puttsNumber={puttsNumber} setPuttDistance={onChangePutts} />
        )}
      </HoleCardContent>
    </HoleCard>
  )
}

export default HoleGeneralForm;
