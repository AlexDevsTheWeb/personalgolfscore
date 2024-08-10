import { Box, Button, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHoleCompleted, setTmpHoleData } from '../../features/hole/holeTmp.slice';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import BoxSingleHoleContainer from '../../styles/box/BosSingleHoleContainer.styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import BoxSingleHoleInternal from '../../styles/box/BoxSingleHoleInternal.styles';
import { default as CompositeTypography } from '../../styles/typography/CompositeTypography.styles';
import { IShots } from '../../types/roundData.types';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import { checkSingleHoleValid } from '../../utils/round/round.utils';
import Select from './components/Select.component';

const AddSingleHole = () => {
  const dispatch = useDispatch<any>();
  const { round: { roundPlayingHCP, roundHoles }
  } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { shots, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { teeClubs, greenClubs, chipClubs } = useSelector((store: RootState) => store.golfBag);

  const [holeFinished, setHoleFinished] = useState(0);
  const [error, setError] = useState<boolean>(false);
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
    upDown: '',
    water: 0
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHole(state => ({ ...state, [name]: Number(value) }));
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs } as any));
  }

  const saveHole = () => {
    dispatch(setHolesCompleted());
    dispatch(setHoleCompleted(holesCompleted as any));
    dispatch(setNewHole({ tmpHole, roundPlayingHCP, roundHoles }));
    if (!!checkSingleHoleValid(hole)) {
      // setHole(state => (
      //   {
      //     ...state,
      //     points: holePoints,
      //     holeNumber: holeFinished + 1,
      //     gir: gir,
      //     girBogey: girBogey,
      //     upDown: ud,
      //   }
      // ));
      // console.log("---> : ", hole);
      // dispatch(setHolesCompleted());
      // setError(false);
      // dispatch(setNewHole({ hole, roundPlayingHCP, roundHoles }));
    } else {
      setError(true);
    }
    // setHole(state => (
    //   {
    //     ...state,
    //     points: holePoint2 as number,
    //     holeNumber: holeFinished + 1,
    //     gir: gir,
    //     girBogey: girBogey,
    //     upDown: ud,
    //   }
    // ));
    // console.log("---> : ", hole);
    // dispatch(setHolesCompleted());
    // setError(false);
    // dispatch(setNewHole({ hole, roundPlayingHCP, roundHoles }));
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
          <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
          <TextField id="putts" name='putts' label="Putts" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='fairway' list={fairwayValues} onChange={(e: any) => handleChange(e)} />
          <Select name='teeClub' list={teeClubs} onChange={(e: any) => handleChange(e)} />
          <TextField id='driveDistance' name='driveDistance' label='Drive distance' variant='filled' type='number' error={error} onChange={e => handleChange(e)} />
        </BoxNewHole>
        <BoxNewHole>
          <Select name='toGreen' list={greenClubs} onChange={(e: any) => handleChange(e)} />
          {!!mtToGreen ? <TextField id="mtToGreen" name='toGreenMeters' label="Meters to green" variant="filled" type='number' error={error} onChange={e => handleChange(e)} /> : null}
          <Select name='greenSide' list={greenSideValues} onChange={(e: any) => handleChange(e)} gir={tmpHole.gir} />
          <Select name='chipClub' list={chipClubs} onChange={(e: any) => handleChange(e)} gir={tmpHole.gir} />
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
            <CompositeTypography string='Hole points' value={tmpHole.points} />
            <CompositeTypography string='Green in regulation' value={!!tmpHole.gir ? 'YES' : 'NO'} />
            <CompositeTypography string='Green in regulation (bogey)' value={!!tmpHole.girBogey ? 'YES' : 'NO'} />
            <CompositeTypography string='Up&Down' value={!!tmpHole.upDown ? 'YES' : 'NO'} />
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

