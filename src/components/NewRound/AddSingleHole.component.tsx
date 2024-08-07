import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { teeClubs, greenClubs } = useSelector((store: RootState) => store.golfBag);

  const [holeFinished, setHoleFinished] = useState(0);
  const [holePoints, setHolePoints] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [gir, setGir] = useState<string>('');
  const [girBogey, setGirBogey] = useState<string>('');
  const [ud, setUD] = useState<string>('');
  const [hole, setHole] = useState<IShots>({
    holeNumber: holesCompleted + 1,
    distance: 0,
    hcp: 0,
    par: 0,
    strokes: 0,
    points: 0,
    teeClub: '',
    fir: 0,
    gir: false,
    girBogey: false,
    putts: 0,
    sand: 0,
    water: 0,
    out: 0,
  });

  const handleChangeTeeClub = (e: any) => {
    const { name, value } = e.target;
    setHole(state => ({ ...state, [name]: value }));
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHole(state => ({ ...state, [name]: Number(value) }));
  }

  const handleGirCalculation = (e: any) => {
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
    const udValue = calculateUDValue({ girValue, chipClub: 'B', parValue: hole.par, strokesValue: hole.strokes });
    setHolePoints(holePoints as number);
    setGir(girValue === 1 ? 'yes' : 'no');
    setGirBogey(girBogeyValue === 1 ? 'yes' : 'no');
    setUD(udValue === 'x' ? 'yes' : ud === 'n' ? 'no' : '-');
  }

  const saveHole = () => {
    if (!!checkSingleHoleValid(hole)) {
      setHole(state => ({ ...state, points: holePoints, holeNumber: holeFinished + 1 }))
      dispatch(setHolesCompleted())
      setError(false)
      dispatch(setNewHole({ hole, roundPlayingHCP, roundHoles }));
    } else {
      setError(true);
    }
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
          <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} onBlur={(e: any) => handleGirCalculation(e)} />
          <TextField id="putts" name='putts' label="Putts" variant="filled" type='number' error={error} onChange={e => handleChange(e)} onBlur={(e: any) => handleGirCalculation(e)} />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='fairways' list={fairwayValues} onChange={(e: any) => handleChangeTeeClub(e)} />
          <Select name='teeClub' list={teeClubs} onChange={(e: any) => handleChangeTeeClub(e)} />
          <TextField id='driveDistance' name='driveDistance' label='Drive distance' variant='filled' type='number' error={error} onChange={e => handleChange(e)} />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='toGreen' list={greenClubs} onChange={(e: any) => handleChangeTeeClub(e)} />
          <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChangeTeeClub(e)} gir={gir} />
          <Select name='chipClub' list={greenClubs} onChange={(e: any) => handleChangeTeeClub(e)} gir={gir} />
        </BoxNewHole>
        <BoxNewHole>
          <TextField id="putt1" name='firstPutt' label="First putt" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="putt2" name='secondPutt' label="Second putt" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="putt3" name='thirdPutt' label="Third putt" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
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
            <CompositeTypography string='Green in regulation' value={gir !== '' ? gir.toUpperCase() : '-'} />
            <CompositeTypography string='Green in regulation (bogey)' value={girBogey !== '' ? girBogey.toUpperCase() : '-'} />
            <CompositeTypography string='Up&Down' value={ud.toUpperCase()} />
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


