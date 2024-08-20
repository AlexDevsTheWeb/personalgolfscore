import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import RoundsDataShotTable from './RoundsDataShotTable.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {
  const params = useParams();

  const { isLoading } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const roundTotals = totals.filter((totals) => totals.roundID === params.roundID)

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', rowGap: 1.175
    }}>
      <RoundsHeadDetails />
      {/* <RoundsDataShotsTotals totals={roundTotals} /> */}
      <RoundsDataShotTable />
    </Box>
  )
}

export default RoundsDataMain
