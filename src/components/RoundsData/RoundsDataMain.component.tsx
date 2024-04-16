import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import RoundsDataShotTable from './RoundsDataShotTable.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {
  const { isLoading } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  if (!!isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box>
      <RoundsHeadDetails />
      <RoundsDataShotTable />
    </Box>
  )
}

export default RoundsDataMain
