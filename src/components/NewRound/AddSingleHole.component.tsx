import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetNewRoundHoleTmp, setHoleNumber, setTmpHoleData } from '../../features/hole/holeTmp.slice';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import BoxSingleHoleContainer from '../../styles/box/BosSingleHoleContainer.styles';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '../../styles/box/BoxSingleHoleInternal.styles';
import TextField from '../../styles/textfield/TextField.style';
import CompositeTypography from '../../styles/typography/CompositeTypography.styles';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import PuttsGenerator from './components/PuttsGenerator.component';
import Select from './components/Select.component';

const AddSingleHole = () => {

  const dispatch = useDispatch<any>();

  const { round: { roundPlayingHCP, roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { teeClubs, greenClubs, chipClubs } = useSelector((store: RootState) => store.golfBag);

  const [holeFinished, setHoleFinished] = useState<number>(0);
  const [mtToGreen, setMtToGreen] = useState<boolean>(false);
  const [teeshotDistance, setTeeshotDistance] = useState<boolean>(false);
  const [puttsNumber, setPuttsNumber] = useState<number[]>([]);
  const [puttsLength, setPuttsLength] = useState<number[]>(new Array(tmpHole.putts).fill(null))

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs } as any));
    switch (name) {
      case 'toGreen':
        value !== 'mt.' ? setMtToGreen(true) : setMtToGreen(false);
        break;
      case 'fairway':
        value !== 5 ? setTeeshotDistance(true) : setTeeshotDistance(false);
        break;
      default:
        setMtToGreen(false);
        break;
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
    <BoxGeneralShadow>
      <BoxSingleHoleContainer>
        <BoxSingleHoleInternal side='full'>
          <CompositeTypography string='Hole number' value={holeFinished === 0 ? 1 : holeFinished} />
          <BoxNewHole>
            <Select name='hcp' list={Number(roundHoles) === 18 ? hcpList18 : hcpList9} onChange={handleChange} value={tmpHole.hcp.toString()} />
            <Select name='par' list={parList} onChange={handleChange} value={tmpHole.par.toString()} />
            <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.strokes !== 0 ? tmpHole.strokes : ''} />
            <TextField id="putts" name='putts' label="Putts" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.putts !== 0 ? tmpHole.putts : ''} />
            <Select name='fairway' list={fairwayValues} onChange={(e: any) => handleChange(e)} value={tmpHole.fairway.toString()} par={tmpHole.par} />
            <Select name='teeClub' list={teeClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.teeClub} />
            <TextField id='driveDistance' name='driveDistance' label='Drive distance' variant='filled' type='number' onChange={e => handleChange(e)}
              value={tmpHole.driveDistance !== 0 ? tmpHole.driveDistance : ''} disabled={teeshotDistance} />
          </BoxNewHole>
          <BoxNewHole>
            <Select name='toGreen' list={greenClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.toGreen !== '' ? tmpHole.toGreen : ''} />
            <TextField name='toGreenMeters' label="Meters to green" variant="filled" type='number' onChange={e => handleChange(e)} disabled={mtToGreen} value={tmpHole.toGreenMeters !== 0 ? tmpHole.toGreenMeters : 0} />
            <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChange(e)} value={tmpHole.greenSide !== '' ? tmpHole.greenSide : ''} />
            <Select name='chipClub' label='Chip club' list={chipClubs} onChange={(e: any) => handleChange(e)} value={tmpHole.chipClub !== '' ? tmpHole.chipClub : ''} />

            <TextField id="sand" name='sand' label="Sand" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.sand !== 0 ? tmpHole.sand : ''} />
            <TextField id="water" name='water' label="Water" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.water !== 0 ? tmpHole.water : ''} />
            <TextField id="out" name='out' label="Out" variant="filled" type='number' onChange={e => handleChange(e)} value={tmpHole.out !== 0 ? tmpHole.out : ''} />
          </BoxNewHole>
          {
            puttsNumber.length > 0
              ? <PuttsGenerator puttsNumber={puttsNumber} setPuttDistance={handleChangePutts} />
              : <></>
          }
          <Box>
            {
              holes.length <= roundHoles - 1 ?
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button variant='contained' onClick={saveHole}>
                    Save
                  </Button>
                </Box> :
                null
            }
          </Box>
        </BoxSingleHoleInternal>
      </BoxSingleHoleContainer>
    </BoxGeneralShadow>
  )
}

export default AddSingleHole

