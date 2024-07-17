import React, { useEffect, useState } from 'react'
import { BoxNewRound } from '../../styles'
import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IShots } from '../../types/roundData.types';
import AddSingleHole from './AddSingleHole.component';
import { getClubsNames } from '../../utils/round/round.utils';

const AddNewRoundHoles = () => {

  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { clubs } = useSelector((store: RootState) => store.golfBag);

  const [holeForm, setHoleForm] = useState<any>();
  const [teeClubs, setTeeClubs] = useState<string[]>([]);

  useEffect(() => {
    setTeeClubs(getClubsNames(clubs));
  }, [clubs]);

  const handleOnClick = () => {
    console.log(teeClubs)
    setHoleForm(<AddSingleHole teeClubs={teeClubs} />);
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
              {/* <Box sx={{ fontWeight: "bold", fontSize: "20px" }}>{`POINTS: ${shots[index].points}`}</Box> */}
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

