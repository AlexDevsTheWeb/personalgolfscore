import React, { useState } from 'react'
import { BoxNewRound } from '../../styles'
import { Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IShots } from '../../types/roundData.types';
import AddSingleHole from './AddSingleHole.component';

const AddNewRoundHoles = () => {

  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const [h, setH] = useState<any>();

  const handleOnClick = () => {
    setH(<AddSingleHole />);
  }

  return (
    <BoxNewRound>
      <Typography>{`Holes ${roundHoles !== 0 ? roundHoles : ''}`}</Typography>

      {
        shots.length !== 0 &&
        shots.map((shot: IShots, index) => {
          return (
            <Box>
              {`Hole #${index + 1} completed`}
              <Box>{`${shot.holeNumber} ${shot.par}`}</Box>
            </Box>
          )
        })
      }
      {h}
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
