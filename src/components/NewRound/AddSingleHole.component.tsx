import { resetNewRoundHoleTmp, setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { setNewHole } from '@/features/newRound/newRoundHoles.slice';
import { RootState } from '@/store/store';
import BoxSingleHoleContainer from '@/styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '@/styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '@/styles/box/BoxSingleHoleInternal.styles';
import TextField from '@/styles/textfield/TextField.style';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HoleCard, HoleCardContent, HoleCardHeader } from '../../styles';
import Spinner from '../common/spinner/Spinner.component';
import PuttsGenerator from './PuttsGenerator.component';
import Select from './Select.component';
import SaveRoundButton from './components/SaveRoundButton.component';

interface AddSingleHoleProps {
  derivedClubs: {
    teeClubs: string[];
    distanceClubs: string[];
    greenClubs: string[];
    chipClubs: string[];
  }
}

const AddSingleHole = ({ derivedClubs }: AddSingleHoleProps) => {

  const dispatch = useDispatch<any>();

  const { round: { roundPlayingHCP, roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { roundId, success, isLoading } = useSelector((store: RootState) => store.roundSaver);

  const [holeFinished, setHoleFinished] = useState<number>(0);
  const [puttsNumber, setPuttsNumber] = useState<number[]>([]);
  const [puttsLength, setPuttsLength] = useState<number[]>(() =>
    Array.isArray(tmpHole.puttsLength) ? tmpHole.puttsLength : new Array(tmpHole.putts || 0).fill(null)
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs: derivedClubs.chipClubs } as any));
  }

  const handleChangePutts = (e: any, puttIndex: number) => {
    const updatedPuttsLength = [...puttsLength];
    while (updatedPuttsLength.length < puttIndex + 1) {
      updatedPuttsLength.push(null as any);
    }
    updatedPuttsLength[puttIndex] = e.target.value === '' ? 0 : Number(e.target.value);
    setPuttsLength(updatedPuttsLength);
  }

  useEffect(() => {
    setHoleFinished(holesCompleted + 1);
  }, [holesCompleted]);

  useEffect(() => {
    const numPutts = tmpHole.putts || 0;
    setPuttsNumber(Array.from({ length: numPutts }, (_, i) => i + 1));
    setPuttsLength(currentLengths => {
      const newLengths = new Array(numPutts).fill(null);
      for (let i = 0; i < Math.min(currentLengths.length, numPutts); i++) {
        newLengths[i] = currentLengths[i];
      }
      return newLengths;
    });
  }, [tmpHole.putts]);

  useEffect(() => {
    dispatch(setTmpHoleData({
      name: 'puttsLength',
      value: puttsLength,
      roundPlayingHCP,
      roundHoles,
      chipClubs: derivedClubs.chipClubs
    } as any));
  }, [puttsLength]);

  // FIXME: This effect seems intended to save the hole and reset state AFTER a hole is completed.
  // It shouldn't run on initial render. Consider if tmpHole.holeNumber is the right trigger.
  // Maybe trigger this from the SaveRoundButton click handler instead?
  // Keeping it for now, but review its logic.
  useEffect(() => {
    if (tmpHole.holeNumber !== 0) { // This condition might need adjustment
      console.log("Dispatching setNewHole for hole number:", tmpHole.holeNumber);
      // Ensure fairway is a number if your type expects it
      const holeAdjusted = { ...tmpHole, fairway: Number(tmpHole.fairway) };
      dispatch(setNewHole({ holeAdjusted, roundPlayingHCP, roundHoles, holesCompleted }));
      dispatch(resetNewRoundHoleTmp());
      // Reset local state for the next hole
      setPuttsLength([]);
      setPuttsNumber([]);
      setHoleFinished(holesCompleted + 2); // Anticipate next hole number
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holesCompleted]); // Trigger based on holesCompleted changing seems more logical

  if (!!isLoading) {
    return <Spinner />
  }
  if (roundId && success && holesCompleted >= roundHoles) {
    return (
      <Typography>All holes saved succesfully!</Typography>
    )
  }

  return (
    <BoxSingleHoleContainer>
      <BoxSingleHoleInternal side='full'>
        <BoxNewHole>
          <HoleCard>
            <HoleCardHeader title={`Hole number: ${holeFinished === 0 ? 1 : holeFinished} - General Info`} />
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
              <Select name='chipClub' label='Chip club' list={derivedClubs.chipClubs} onChange={(e: any) => handleChange(e)}
                value={
                  tmpHole.chipClub !== ''
                    ? tmpHole.chipClub
                    : ''
                }
              />
            </HoleCardContent>
          </HoleCard>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}>

            <SaveRoundButton />
          </Box>
        </BoxNewHole>

      </BoxSingleHoleInternal>
    </BoxSingleHoleContainer>
  )
}

export default AddSingleHole

