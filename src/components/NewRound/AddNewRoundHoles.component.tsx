import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeeGreenClubs } from '../../features/golfBag/golfBag.slice';
import { resetSetFirstHole } from '../../features/newRound/newRoundMain.slice';
import { RootState } from '../../store/store';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import { IShots } from '../../types/roundData.types';
import { getChipClubs, getClubsNames, getGreenClubs } from '../../utils/round/round.utils';
import RoundsDataShotTable from '../RoundsData/RoundsDataShotTable.component';
import AddSingleHole from './AddSingleHole.component';

const AddNewRoundHoles = () => {
  const dispatch = useDispatch<any>();
  const { setFirstHole } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { clubs } = useSelector((store: RootState) => store.golfBag);

  const [holeForm, setHoleForm] = useState<any>();

  useEffect(() => {
    const updatedTeeClubs = getClubsNames(clubs);
    const updatedGreenClubs = getGreenClubs(updatedTeeClubs);
    const updatedChipClubs = getChipClubs(updatedTeeClubs);
    dispatch(updateTeeGreenClubs({ updatedTeeClubs, type: 'tee' }));
    dispatch(updateTeeGreenClubs({ updatedGreenClubs, type: 'green' }));
    dispatch(updateTeeGreenClubs({ updatedChipClubs, type: 'chip' }));
  }, [clubs, dispatch]);

  useEffect(() => {
    if (!!setFirstHole) {
      setHoleForm(<AddSingleHole />);
      dispatch(resetSetFirstHole());
    }
  }, [setFirstHole, dispatch])

  return (
    <BoxGeneralShadow direction='column'>
      {
        shots.length > 0 &&
        <RoundsDataShotTable />
      }

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
        shots.length <= roundHoles - 1 ?
          null
          : <Box>
            <Button variant='contained'>Save holes</Button>
          </Box>
      }
    </BoxGeneralShadow >
  )
}

export default AddNewRoundHoles

