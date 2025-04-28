import { resetNewRoundHoleTmp, setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { addTeeShotDistance } from '@/features/newRound/newRoundDistances.slice';
import { setNewHole } from '@/features/newRound/newRoundHoles.slice';
import { RootState } from '@/store/store';
import BoxSingleHoleContainer from '@/styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '@/styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '@/styles/box/BoxSingleHoleInternal.styles';
import TextField from '@/styles/textfield/TextField.style';
import { IAddSingleHoleProps } from '@/types/clubs.types';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HoleCard, HoleCardContent, HoleCardHeader } from '../../styles';
import PuttsGenerator from './PuttsGenerator.component';
import Select from './Select.component';
import SaveRoundButton from './components/SaveRoundButton.component';

const AddSingleHole = ({ derivedClubs }: IAddSingleHoleProps) => {
  const dispatch = useDispatch<any>();

  const { round: { roundPlayingHCP, roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { isLoading } = useSelector((store: RootState) => store.roundSaver);

  const [puttsLength, setPuttsLength] = useState<number[]>([]);
  const [puttsNumber, setPuttsNumber] = useState<number[]>([]);
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(1);

  useEffect(() => {
    setCurrentHoleNumber(holesCompleted + 1);
  }, [holesCompleted]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs: derivedClubs.chipClubs } as any));
  };

  const handleChangePutts = (e: any, puttIndex: number) => {
    const currentLength = puttsLength.length;
    const requiredLength = Math.max(currentLength, puttIndex + 1);
    const newPuttsLength = [...puttsLength];
    while (newPuttsLength.length < requiredLength) {
      newPuttsLength.push(0);
    }
    newPuttsLength[puttIndex] = e.target.value === '' ? 0 : Number(e.target.value);
    setPuttsLength(newPuttsLength);
  };

  useEffect(() => {
    const numPutts = tmpHole.putts || 0;
    setPuttsNumber(Array.from({ length: numPutts }, (_, i) => i + 1));
    setPuttsLength(currentLengths => {
      const newLengths = new Array(numPutts).fill(0);
      for (let i = 0; i < Math.min(currentLengths.length, numPutts); i++) {
        newLengths[i] = currentLengths[i] ?? 0;
      }
      return newLengths;
    });
  }, [tmpHole.putts]);

  // useEffect(() => {
  //   dispatch(setTmpHoleData({
  //     name: 'puttsLength',
  //     value: puttsLength,
  //     roundPlayingHCP,
  //     roundHoles,
  //     chipClubs: derivedClubs.chipClubs
  //   } as any));
  // }, [puttsLength, dispatch, roundPlayingHCP, roundHoles, derivedClubs.chipClubs]);

  const handleSaveHole = () => {

    const { teeClub, driveDistance, distance, par, fairway } = tmpHole;
    let actualTeeDistance = 0;
    if (par === 3) {
      actualTeeDistance = distance;
    } else {
      actualTeeDistance = driveDistance > 0 ? driveDistance : 0;
    }
    if (teeClub && actualTeeDistance > 0) {
      dispatch(addTeeShotDistance({ club: teeClub, distance: actualTeeDistance }));
    }
    const holeAdjusted = {
      ...tmpHole,
      holeNumber: holesCompleted + 1,
      fairway: Number(fairway) || 0,
      puttsLength: [...puttsLength]
    };
    dispatch(setNewHole({ holeAdjusted, roundPlayingHCP, roundHoles, holesCompleted }));
    dispatch(resetNewRoundHoleTmp());
    setPuttsLength([]);
    setPuttsNumber([]);
  };

  const isSaveDisabled = () => {
    return tmpHole.hcp === 0 || tmpHole.par === 0 || tmpHole.strokes === 0;
  };

  return (
    <BoxSingleHoleContainer>
      <BoxSingleHoleInternal side='full'>
        <BoxNewHole>
          <HoleCard>
            <HoleCardHeader title={`Hole number: ${currentHoleNumber} - General Info`} />
            <HoleCardContent>
              <Select name='hcp' list={Number(roundHoles) === 18 ? hcpList18 : hcpList9} onChange={handleChange} value={tmpHole.hcp.toString()} label='Hole HCP' />
              <Select name='par' list={parList} onChange={handleChange} value={tmpHole.par.toString()} label='Hole Par' />
              <TextField name='distance' label="Length" type='number' onChange={e => handleChange(e)} value={tmpHole.distance !== 0 ? tmpHole.distance : ''} />
              <TextField name='strokes' label="Score" type='number' onChange={e => handleChange(e)} value={tmpHole.strokes !== 0 ? tmpHole.strokes : ''} />
              <TextField name='putts' label="# of putts" type='number' onChange={e => handleChange(e)} value={tmpHole.putts !== 0 ? tmpHole.putts : ''} />
              {
                puttsNumber.length > 0
                  ? <PuttsGenerator puttsNumber={puttsNumber} setPuttDistance={handleChangePutts} />
                  : <></>
              }
            </HoleCardContent>
          </HoleCard>
          <HoleCard>
            <HoleCardHeader title='Penalties' />
            <HoleCardContent>
              <TextField name='water' label="Water" type='number' onChange={e => handleChange(e)} value={tmpHole.water !== 0 ? tmpHole.water : ''} width={80} />
              <TextField name='out' label="Out" type='number' onChange={e => handleChange(e)} value={tmpHole.out !== 0 ? tmpHole.out : ''} width={80} />
            </HoleCardContent>
          </HoleCard>
        </BoxNewHole>

        <BoxNewHole>
          <HoleCard>
            <HoleCardHeader title='Tee shot' />
            <HoleCardContent>
              <Select name='teeClub' list={derivedClubs.teeClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.teeClub ?? ''} label='Tee club' />

              <Select name='fairway' list={fairwayValues} onChange={(e: any) => handleChange(e)} value={tmpHole.fairway.toString()} par={tmpHole.par} label='Fairway position' />
              <TextField name='driveDistance' label='Distance' variant='filled' type='number' onChange={e => handleChange(e)}
                value={
                  tmpHole.driveDistance !== 0
                    ? tmpHole.driveDistance
                    : (tmpHole.par === 3 && tmpHole.distance !== 0)
                      ? tmpHole.distance
                      : ''
                }
                disabled={tmpHole.par === 3 && tmpHole.distance !== 0}
              />
            </HoleCardContent>
          </HoleCard>

          <HoleCard>
            <HoleCardHeader title='Pitch & Chip' />
            <HoleCardContent>
              <TextField name='toGreenMeters' label="Mts. to green" type='number' onChange={e => handleChange(e)}
                // value={tmpHole.driveDistance !== 0
                //   ? tmpHole.distance - tmpHole.driveDistance
                //   : (tmpHole.par === 3 && tmpHole.distance !== 0)
                //     ? tmpHole.distance
                //     : 0}
                disabled={tmpHole.par === 3 && tmpHole.distance !== 0}
              />
              <Select name='toGreen' list={derivedClubs.greenClubs} onChange={(e: any) => handleChange(e)}
                value={tmpHole.toGreen !== '' ? tmpHole.toGreen : ''}
                //   value={tmpHole.chipClub !== ''
                //     ? tmpHole.chipClub
                //     : (tmpHole.par === 3 && tmpHole.teeClub !== '')
                //       ? tmpHole.teeClub
                //       : ''
                // }
                label='To green club' />
              <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChange(e)} value={tmpHole.greenSide !== '' ? tmpHole.greenSide : ''} label='Green side' />
              <Select
                name='chipClub'
                label='Chip club'
                list={derivedClubs.chipClubs}
                onChange={(e: any) => handleChange(e)}
                value={tmpHole.chipClub ?? ''}
                disabled={tmpHole.gir}
              />
            </HoleCardContent>
          </HoleCard>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>

            <SaveRoundButton onSave={handleSaveHole} disabled={isSaveDisabled()} />
          </Box>
        </BoxNewHole>

      </BoxSingleHoleInternal>
    </BoxSingleHoleContainer>
  )
}

export default AddSingleHole

