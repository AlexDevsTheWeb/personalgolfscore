import { Typography } from '@mui/material'
import { BoxNewRound } from '../../styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AddNewRoundTotals = () => {

  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);

  return (
    <BoxNewRound>
      <Typography>{`Totals ${roundHoles !== 0 ? roundHoles : ''}`}</Typography>
    </BoxNewRound>
  )
}

export default AddNewRoundTotals
