import React from 'react'
import { BoxNewRound } from '../../styles'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AddNewRoundHoles = () => {

  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);

  return (
    <BoxNewRound>
      <Typography>{`Holes ${roundHoles !== 0 ? roundHoles : ''}`}</Typography>
      {

      }
    </BoxNewRound>
  )
}

export default AddNewRoundHoles
