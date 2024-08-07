import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeeGreenClubs } from '../../features/golfBag/golfBag.slice';
import { RootState } from '../../store/store';
import { BoxNewRound } from '../../styles';
import { IShots } from '../../types/roundData.types';
import { getClubsNames, getGreenClubs } from '../../utils/round/round.utils';
import AddSingleHole from './AddSingleHole.component';

const AddNewRoundHoles = () => {
  const dispatch = useDispatch<any>();
  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { clubs } = useSelector((store: RootState) => store.golfBag);

  const [holeForm, setHoleForm] = useState<any>();

  useEffect(() => {
    const updatedTeeClubs = getClubsNames(clubs);
    const updatedGreenClubs = getGreenClubs(updatedTeeClubs);
    dispatch(updateTeeGreenClubs({ updatedTeeClubs, type: 'tee' }));
    dispatch(updateTeeGreenClubs({ updatedGreenClubs, type: 'green' }));
  }, [clubs, dispatch]);

  const handleOnClick = () => {
    setHoleForm(<AddSingleHole />);
  }

  return (
    <BoxNewRound>
      <Typography>
        {`Holes ${roundHoles !== 0 ? roundHoles : ''} TOTAL POINTS: ${shots.reduce(
          (acc, curr) => acc + curr.points,
          0)}`}</Typography>
      {
        shots.length !== 0 &&
        shots.map((shot: IShots, index: number) => {
          return (
            <Box key={index}>
              {`Hole #: ${shot.holeNumber} Par: ${shot.par} `}
              {`Strokes: ${shots[index].strokes} POINTS: ${shots[index].points}`}
            </Box>
          )
        })
      }
      {holeForm}
      {
        shots.length === 0 ?
          <Box>
            <Button variant='contained' onClick={() => handleOnClick()}>Add first hole</Button>
          </Box>
          : shots.length <= roundHoles - 1 ?
            null
            : <Box>
              <Button variant='contained'>Save holes</Button>
            </Box>
      }
    </BoxNewRound >
  )
}

export default AddNewRoundHoles

