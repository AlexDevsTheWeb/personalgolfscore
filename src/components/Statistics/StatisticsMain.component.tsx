import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGenerateStatistics } from '../../hooks/useNewRoundTotals.hook';
import { RootState } from '../../store/store';

const StatisticsMain = () => {
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);

  const x = useGenerateStatistics();
  return (
    <Box>
      <Typography>Statistics Main</Typography>
    </Box>
  )
}

export default StatisticsMain