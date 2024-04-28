import { Typography } from '@mui/material'
import { BoxNewRound } from '../../styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import RoundsDataShotsTotals from '../RoundsData/RoundsDataShotsTotals.component';

const AddNewRoundTotals = () => {

  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { totals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  let newTotals = [];
  newTotals.push(totals);

  return (
    <BoxNewRound>
      <Typography>{`Totals ${roundHoles !== 0 ? roundHoles : ''}`}</Typography>
      <RoundsDataShotsTotals totals={newTotals} />
    </BoxNewRound>
  )
}

export default AddNewRoundTotals
