import { Box, Button, Select, Typography } from '@mui/material'
import { TextField } from '../../styles'
import { IShots } from '../../types/roundData.types';
import { useEffect, useState } from 'react';
import { checkSingleHoleValid } from '../../utils/round/round.utils';
import { useDispatch, useSelector } from 'react-redux';
import { setHolesCompleted, setNewHole } from '../../features/newRound/newRoundHoles.slice';
import { RootState } from '../../store/store';
import { calculateStablefordPoints } from '../../utils/shots/shots.utils';

const AddSingleHole = () => {
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
  const [selectedPar, setSelectedPar] = useState<string>('3');

  const [parList] = useState<string[]>(['3', '4', '5']);

  const handleChange = (e: any) => {
    setHole(state => ({ ...state, [e.target.name]: e.target.value }));
    if (e.target.name === 'strokes' && hole.par && hole.hcp) {
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
  const handleChangePar = (e: any) => {
    setSelectedPar(e.target.innerText);
  };

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

  console.log("par: ", selectedPar)
  return (
    <Box>
      <Typography>{`Hole number: ${holeFinished}`}</Typography>
      <TextField id="distance" name='distance' label="Distance" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      <TextField id="hcp" name='hcp' label="HCP" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />

      {/* FIXME: select doesn't work with default values? */}
      <Select
        variant='filled'
        name='par'
        // defaultValue={3}
        // value={parList.map((p: number) => {
        //   console.log(p);
        //   return (p)
        // })}
        value={selectedPar}
        defaultValue={selectedPar}
        onClick={(e: any) => handleChangePar(e)}
      >
        {parList.map((p: string) => {
          return <Typography key={p}>{p}</Typography>;
        })}

      </Select>

      {/* <TextField id="par" name='par' label="Par" variant="filled" type='number' error={error} onChange={e => handleChange(e)} /> */}
      <TextField id="strokes" name='strokes' label="Strokes" variant="filled" type='number' error={error} onChange={e => handleChange(e)} />
      {/* TODO: removed point input since is automatically calculated */}
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
