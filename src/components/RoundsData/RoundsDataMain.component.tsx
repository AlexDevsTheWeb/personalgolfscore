import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import RoundsDataShotsTotals from './RoundsDataShotsTotals.component';
import RoundsDataShotTable from './RoundsDataShotTable.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {
  const params = useParams();
  const { isLoading } = useSelector((store: RootState) => store.roundsNumber.roundsData);
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const roundTotals = totals.filter((total) => Number(total.roundID) === Number(params.roundID))
  const { shots } = useSelector((store: RootState) => store.roundsNumber.roundsData);
  const { round: { roundPar } } = useSelector((store: RootState) => store.newRound.newRoundMain);

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', rowGap: 1.175
    }}>
      <RoundsHeadDetails />
      <RoundsDataShotsTotals totals={roundTotals[0]} shots={shots} coursePar={roundPar} />
      <RoundsDataShotTable shots={shots} />
    </Box>
  )
}

export default RoundsDataMain
