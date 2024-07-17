import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import { TextField } from '../../styles';
import { IShots } from '../../types/roundData.types';
import { hcpList18, hcpList9, parList } from '../../utils/constant.utils';
import { checkSingleHoleValid } from '../../utils/round/round.utils';
import { calculateStablefordPoints } from '../../utils/shots/shots.utils';
import Select from './components/Select.component';

interface Props {
  teeClubs: string[];
}

const AddSingleHole = (props: Props) => {
  const { roundHoles, roundPlayingHCP } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const [holeFinished, setHoleFinished] = useState(0);
  const [holePoints, setHolePoints] = useState<number>(0);
  const dispatch = useDispatch<any>();
  const [error, setError] = useState<boolean>(false);
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
    putts: 0,
    sand: 0,
    water: 0,
    out: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setHole(state => ({ ...state, [name]: name === 'teeClub' ? value : Number(value) }));
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
      <Box flexDirection={'row'} sx={{ border: '1px solid #000' }} >
        <TextField
          id="distance"
          name='distance'
          label="Distance"
          variant="filled"
          type='number'
          error={error}
          onChange={e => handleChange(e)}
        />
        <Select name='par' list={parList} onChange={handleChange} />
        <Select name='hcp' list={Number(roundHoles) === 18 ? hcpList18 : hcpList9} onChange={handleChange} />
        <Select name='teeClub' list={props.teeClubs} onChange={handleChange} />
      </Box>
      <Box>

      </Box>



      <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      {/* TODO: removed point input since is automatically calculated */}


      <TextField id="fir" name='fir' label="FIR" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="gir" name='gir' label="GIR" variant="filled" type='text' error={error} onChange={e => handleChange(e)} />
      <TextField id="putts" name='putts' label="Putts" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="sand" name='sand' label="Sand" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="water" name='water' label="Water" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="out" name='out' label="Out" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />

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


