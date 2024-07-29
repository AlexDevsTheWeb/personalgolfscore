import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import { TextField } from '../../styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import LabelsTypography from '../../styles/typography/LabelsTypography.styles';
import { ITeeClubProps } from '../../types/clubs.types';
import { IShots } from '../../types/roundData.types';
import { hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import { checkSingleHoleValid } from '../../utils/round/round.utils';
import { calculateGirBogeyValue, calculateGirValue, calculateStablefordPoints } from '../../utils/shots/shots.utils';
import Select from './components/Select.component';

const AddSingleHole = (props: ITeeClubProps) => {
  const dispatch = useDispatch<any>();

  const { roundHoles, roundPlayingHCP } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const [holeFinished, setHoleFinished] = useState(0);
  const [holePoints, setHolePoints] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [gir, setGir] = useState<string>('');
  const [girBogey, setGirBogey] = useState<string>('');
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

    if (name === 'strokes' && hole.par && hole.hcp) {
      const pointCalc = {
        hcp: hole.hcp,
        par: hole.par,
        strokes: hole.strokes,
        finalPlayerHCP: roundPlayingHCP,
        totalHoles: roundHoles
      };
      const holePoints = calculateStablefordPoints(pointCalc);
      setHolePoints(holePoints as number);
    }
    if (name === 'putts' && hole.putts && hole.strokes && hole.par) {
      const girCalc = {
        par: hole.par,
        putts: hole.putts,
        strokes: hole.strokes
      };
      const girValue = calculateGirValue(girCalc);
      const girBogeyValue = calculateGirBogeyValue(girCalc);
      setGir(girValue === 1 ? 'Yes' : 'No');
      setGirBogey(girBogeyValue === 1 ? 'Yes' : 'No');
    }
  }

  const handleGirCalculation = (e: any) => {
    const girCalc = {
      par: hole.par,
      putts: hole.putts,
      strokes: hole.strokes
    };
    const girValue = calculateGirValue(girCalc);
    const girBogeyValue = calculateGirBogeyValue(girCalc);
    setGir(girValue === 1 ? 'Yes' : 'No');
    setGirBogey(girBogeyValue === 1 ? 'Yes' : 'No');
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
    <Box>
      <Typography>{`Hole number: ${holeFinished}`}</Typography>
      <BoxNewHole>
        <TextField
          id="distance"
          name='distance'
          label="Distance"
          variant="filled"
          type='number'
          error={error}
          onChange={e => handleChange(e)}
          sx={{ maxWidth: '150px' }}
        />
        <Select name='par' width={100} list={parList} onChange={handleChange} />
        <Select name='hcp' width={100} list={Number(roundHoles) === 18 ? hcpList18 : hcpList9} onChange={handleChange} />
        <Select name='teeClub' width={150} list={props.teeClubs} onChange={(e: any) => handleChangeTeeClub(e)} />
        <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} onBlur={(e: any) => handleGirCalculation(e)} />
      </BoxNewHole>
      <BoxNewHole>
        <TextField id="fir" name='fir' label="FIR" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
        <TextField id="putts" name='putts' label="Putts" variant="filled" type='number' error={error} onChange={e => handleChange(e)} onBlur={(e: any) => handleGirCalculation(e)} />

        <Stack>
          <LabelsTypography string='Green in regulation:' value={gir !== '' ? gir.toUpperCase() : '-'}></LabelsTypography>
          <LabelsTypography string='Green in regulation (bogey):' value={girBogey !== '' ? girBogey.toUpperCase() : '-'}></LabelsTypography>

        </Stack>

      </BoxNewHole>
      <BoxNewHole>
        <TextField id="sand" name='sand' label="Sand" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
        <TextField id="water" name='water' label="Water" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
        <TextField id="out" name='out' label="Out" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      </BoxNewHole>

      {
        shots.length <= roundHoles - 1 ?
          <Box>
            <Button variant='contained' onClick={saveHole}>
              Save
            </Button>
          </Box> :
          null
      }

    </Box >
  )
}

export default AddSingleHole


