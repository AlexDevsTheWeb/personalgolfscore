import { Box, Button, Typography } from '@mui/material'
import { TextField } from '../../styles'
import { IShots } from '../../types/roundData.types';
import { useState } from 'react';
import { checkSingleHoleValid } from '../../utils/round/round.utils';
import { useDispatch, useSelector } from 'react-redux';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';

const AddSingleHole = () => {
  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const dispatch = useDispatch<any>();
  const [error, setError] = useState<boolean>(false);

  console.log("holes completed----> ", holesCompleted);
  console.log("rounds length ----> ", shots.length);
  console.log("round holes ----> ", roundHoles)
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
    setHole(state => ({ ...state, [e.target.name]: e.target.value }));
  }
  const saveHole = () => {
    if (!!checkSingleHoleValid(hole)) {
      setError(false)
      setHole(state => ({ ...state, holeNumber: holesCompleted + 1 }));
      dispatch(setNewHole({ hole }));
      dispatch(setHolesCompleted())
    } else {
      setError(true);
    }
  };

  return (
    <Box>
      <Typography>{holesCompleted + 1}</Typography>
      <TextField id="distance" name='distance' label="Distance" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="hcp" name='hcp' label="HCP" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="par" name='par' label="Par" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="points" name='points' label="Points" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="teeClub" name='teeClub' label="Tee club" variant="filled" type='text' error={error} onChange={e => handleChange(e)} />
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

    </Box>
  )
}

export default AddSingleHole
