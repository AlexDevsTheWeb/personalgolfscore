import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNewRoundHoleTmp, setHoleNumber, setTmpHoleData } from '../../features/hole/holeTmp.slice';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import { HoleCard, HoleCardContent, HoleCardHeader } from '../../styles';
import BoxSingleHoleContainer from '../../styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '../../styles/box/BoxSingleHoleInternal.styles';
import TextField from '../../styles/textfield/TextField.style';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import PuttsGenerator from './PuttsGenerator.component';
import Select from './Select.component';

const AddSingleHole = () => {

  const dispatch = useDispatch<any>();

  const { round: { roundPlayingHCP, roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { teeClubs, greenClubs, chipClubs } = useSelector((store: RootState) => store.golfBag);

  const [holeFinished, setHoleFinished] = useState<number>(0);
  // const [mtToGreen, setMtToGreen] = useState<boolean>(false);
  // const [teeshotDistance, setTeeshotDistance] = useState<boolean>(false);
  const [puttsNumber, setPuttsNumber] = useState<number[]>([]);
  const [puttsLength, setPuttsLength] = useState<number[]>(new Array(tmpHole.putts).fill(null))
  const [handleSave, setHandleSave] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs } as any));
    if (tmpHole.hcp !== 0 && tmpHole.par !== 0 && tmpHole.strokes !== 0 && tmpHole.putts !== 0) {
      setHandleSave(true);
    }
  }
  const handleChangePutts = (e: any, putts: number) => {
    const updatedPuttsLength = [...puttsLength];
    updatedPuttsLength[putts - 1] = Number(e.target.value);
    setPuttsLength(updatedPuttsLength);
  }
  const saveHole = () => {
    const newHoleNumber = holesCompleted + 1
    dispatch(setHolesCompleted({ newHoleNumber }));
    dispatch(setHoleNumber({ newHoleNumber }));
    setHandleSave(false);
  };

  useEffect(() => {
    if (tmpHole.holeNumber !== 0) {
      setHoleFinished(holesCompleted + 1);
      const holeAdjusted = { ...tmpHole, fairway: Number(tmpHole.fairway) }
      dispatch(setNewHole({ holeAdjusted, roundPlayingHCP, roundHoles, holesCompleted }));
      dispatch(resetNewRoundHoleTmp());
      setPuttsLength([]);
    }
    // eslint-disable-next-line
  }, [holesCompleted, dispatch]);

  useEffect(() => {
    setPuttsNumber(Array.apply(null, Array(tmpHole.putts))
      .map(function (y, i) { return i + 1; }));
  }, [tmpHole.putts]);

  useEffect(() => {
    dispatch(setTmpHoleData({ name: 'puttsLength', value: puttsLength, roundPlayingHCP, roundHoles, chipClubs } as any));
  }, [puttsLength, dispatch, roundPlayingHCP, roundHoles, chipClubs])

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
              <Select name='teeClub' list={teeClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.teeClub} label='Tee club' />
              <Select name='fairway' list={fairwayValues} onChange={(e: any) => handleChange(e)} value={tmpHole.fairway.toString()} par={tmpHole.par} label='Fairway position' />
              <TextField name='driveDistance' label='Teeshot distance' variant='filled' type='number' onChange={e => handleChange(e)}
                value={tmpHole.driveDistance !== 0 ? tmpHole.driveDistance : ''} />
            </HoleCardContent>
          </HoleCard>

          <HoleCard>
            <HoleCardHeader title='Pitch & Chip' />
            <HoleCardContent>
              <TextField name='toGreenMeters' label="Meters to green" type='number' onChange={e => handleChange(e)} value={tmpHole.toGreenMeters !== 0 ? tmpHole.toGreenMeters : ''} />
              <Select name='toGreen' list={greenClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.toGreen !== '' ? tmpHole.toGreen : ''} label='To green club' />
              <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChange(e)} value={tmpHole.greenSide !== '' ? tmpHole.greenSide : ''} label='Green side' />
              <Select name='chipClub' label='Chip club' list={chipClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.chipClub !== '' ? tmpHole.chipClub : ''} />
            </HoleCardContent>
          </HoleCard>


        </BoxNewHole>
        <Box>
          {
            holes.length <= roundHoles - 1 ?
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button variant='contained' onClick={saveHole} disabled={!handleSave}>
                  {'Next hole'}
                </Button>
              </Box> :
              null
          }
        </Box>
      </BoxSingleHoleInternal>
    </BoxSingleHoleContainer>
  )
}

export default AddSingleHole

