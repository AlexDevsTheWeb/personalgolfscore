import { RootState } from '@/store/store';
import { allRoundsCalculator } from '@/utils/calculator/AllRoundsCalculator.utils';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import TotalsStatistics from '../Totals/AllRounds/TotalsStatistics.component';

const StatisticsMain = () => {

  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals.roundTotals);
  const newTotals = allRoundsCalculator(totals);

  console.log("new totals ---> ", newTotals)

  return (
    <Box>
      <Typography>Statistics Main</Typography>
      <TotalsStatistics newTotals={newTotals} />
    </Box>
  )
}

export default StatisticsMain