import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTmpHoleData } from '../../features/hole/holeTmp.slice';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import { TextField } from '../../styles';
import BoxSingleHoleContainer from '../../styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '../../styles/box/BoxSingleHoleInternal.styles';
import { default as CompositeTypography } from '../../styles/typography/CompositeTypography.styles';
import { IShots } from '../../types/roundData.types';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import { checkSingleHoleValid } from '../../utils/round/round.utils';
import { calculateGirBogeyValue, calculateGirValue, calculateStablefordPoints, calculateUDValue } from '../../utils/shots/shots.utils';
import Select from './components/Select.component';

const AddSingleHole = () => {
  const dispatch = useDispatch<any>();

  const { roundHoles, roundPlayingHCP } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { teeClubs, greenClubs, chipClubs } = useSelector((store: RootState) => store.golfBag);

  const [holeFinished, setHoleFinished] = useState(0);
  const [holePoints, setHolePoints] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [gir, setGir] = useState<boolean>(false);
  const [girBogey, setGirBogey] = useState<boolean>(false);
  const [ud, setUD] = useState<boolean>(false);
  const [mtToGreen, setMtToGreen] = useState<boolean>(false);
  const [hole, setHole] = useState<IShots>({
    holeNumber: holesCompleted + 1,
    chipClub: '',
    distance: 0,
    driveDistance: 0,
    fairway: '',
    fir: 0,
    firstPutt: 0,
    gir: false,
    girBogey: false,
    greenSide: '',
    hcp: 0,
    out: 0,
    par: 0,
    points: 0,
    putts: 0,
    sand: 0,
    secondPutt: 0,
    strokes: 0,
    teeClub: '',
    toGreen: '',
    toGreenMeters: 0,
    upDown: false,
    water: 0
  });

  const handleChangeTeeClub = (e: any) => {
    const { name, value } = e.target;
    if (name === 'toGreen') {
      if (value === 'mt.') {
        setMtToGreen(true);
      } else {
        setMtToGreen(false)
      }
    }
    dispatch(setTmpHoleData({ name, value } as any));
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHole(state => ({ ...state, [name]: Number(value) }));
    dispatch(setTmpHoleData({ name, value } as any));
  }

  const handleOnBlurCalculation = (e: any) => {
    const pointCalc = {
      hcp: hole.hcp,
      par: hole.par,
      strokes: hole.strokes,
      finalPlayerHCP: roundPlayingHCP,
      totalHoles: roundHoles
    };
    const girCalc = {
      par: hole.par,
      putts: hole.putts,
      strokes: hole.strokes
    };
    const holePoints = calculateStablefordPoints(pointCalc);
    const girValue = calculateGirValue(girCalc);
    const girBogeyValue = calculateGirBogeyValue(girCalc);
    const udValue = calculateUDValue({ girValue, chipClub: 'Bunker', parValue: hole.par, strokesValue: hole.strokes, chipClubs });
    setHolePoints(holePoints as number);
    setGir(girValue === 1 ? true : false);
    setGirBogey(girBogeyValue === 1 ? true : false);
    setUD(udValue === 'x' ? true : false);
  }

  const saveHole = () => {
    const pointCalc = {
      hcp: hole.hcp,
      par: hole.par,
      strokes: hole.strokes,
      finalPlayerHCP: roundPlayingHCP,
      totalHoles: roundHoles
    };
    const holePoint2 = calculateStablefordPoints(pointCalc);
    console.log(holePoint2);
    if (!!checkSingleHoleValid(hole)) {
      setHole(state => (
        {
          ...state,
          points: holePoints,
          holeNumber: holeFinished + 1,
          gir: gir,
          girBogey: girBogey,
          upDown: ud,
        }
      ));
      console.log("---> : ", hole);
      dispatch(setHolesCompleted());
      setError(false);
      dispatch(setNewHole({ hole, roundPlayingHCP, roundHoles }));
    } else {
      setError(true);
    }
    setHole(state => (
      {
        ...state,
        points: holePoint2 as number,
        holeNumber: holeFinished + 1,
        gir: gir,
        girBogey: girBogey,
        upDown: ud,
      }
    ));
    console.log("---> : ", hole);
    dispatch(setHolesCompleted());
    setError(false);
    dispatch(setNewHole({ hole, roundPlayingHCP, roundHoles }));
  };

  useEffect(() => {
    setHoleFinished(holesCompleted + 1);
  }, [holesCompleted]);

  return (
    <BoxSingleHoleContainer>
      <BoxSingleHoleInternal width={70}>
        <BoxNewHole>
          <Select name='hcp' list={Number(roundHoles) === 18 ? hcpList18 : hcpList9} onChange={handleChange} />
          <Select name='par' list={parList} onChange={handleChange} />
          <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} onBlur={(e: any) => handleOnBlurCalculation(e)} />
          <TextField id="putts" name='putts' label="Putts" variant="filled" type='number' error={error} onChange={e => handleChange(e)} onBlur={(e: any) => handleOnBlurCalculation(e)} />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='fairway' list={fairwayValues} onChange={(e: any) => handleChangeTeeClub(e)} />
          <Select name='teeClub' list={teeClubs} onChange={(e: any) => handleChangeTeeClub(e)} />
          <TextField id='driveDistance' name='driveDistance' label='Drive distance' variant='filled' type='number' error={error} onChange={e => handleChange(e)} />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='toGreen' list={greenClubs} onChange={(e: any) => handleChangeTeeClub(e)} />
          {!!mtToGreen ? <TextField id="mtToGreen" name='toGreenMeters' label="Meters to green" variant="filled" type='number' error={error} onChange={e => handleChange(e)} /> : null}
          <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChangeTeeClub(e)} gir={gir} />
          <Select name='chipClub' list={chipClubs} onChange={(e: any) => handleChangeTeeClub(e)} gir={gir} />
        </BoxNewHole>
        <BoxNewHole>
          <TextField id="putt1" name='firstPutt' label="First putt" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="putt2" name='secondPutt' label="Second putt" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="sand" name='sand' label="Sand" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="water" name='water' label="Water" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="out" name='out' label="Out" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
        </BoxNewHole>
      </BoxSingleHoleInternal>
      <BoxSingleHoleInternal width={30} paddingTop={1.25}>
        <Stack direction='column' justifyContent='space-between'>
          <Stack>
            <CompositeTypography string='Hole number' value={holeFinished} />
            <CompositeTypography string='Hole points' value={holePoints} />
            <CompositeTypography string='Green in regulation' value={!!gir ? 'YES' : 'NO'} />
            <CompositeTypography string='Green in regulation (bogey)' value={!!girBogey ? 'YES' : 'NO'} />
            <CompositeTypography string='Up&Down' value={!!ud ? 'YES' : 'NO'} />
          </Stack>
          {
            shots.length <= roundHoles - 1 ?
              <Box>
                <Button variant='contained' onClick={saveHole}>
                  Save
                </Button>
              </Box> :
              null
          }

        </Stack>
      </BoxSingleHoleInternal>


    </BoxSingleHoleContainer>
  )
}

export default AddSingleHole

