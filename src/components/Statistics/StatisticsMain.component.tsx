import { RootState } from '@/store/store';
import { IRoundTotals } from '@/types/roundTotals.types';
import { allRoundsCalculator } from '@/utils/calculator/AllRoundsCalculator.utils';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../common/spinner/Spinner.component';
import DistancesTotals from '../Totals/HolebyHole/DistancesTotals.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';

const StatisticsMain = () => {
  const { rounds, isLoading: isLoadingRounds } = useSelector((store: RootState) => store.rounds);
  const [calculatedAverages, setCalculatedAverages] = useState<IRoundTotals>(initialStateRoundTotals);

  useEffect(() => {
    if (!isLoadingRounds && rounds.length > 0) {
      const lastTotals: IRoundTotals[] = rounds.map(round => round.totals);
      setCalculatedAverages(allRoundsCalculator(lastTotals));
    }
    else if (!isLoadingRounds /* && !isLoadingTotals */) {
      setCalculatedAverages(initialStateRoundTotals);
      console.log("Resetting averages, no data available.");
    }
  }, [rounds, isLoadingRounds]);

  if (isLoadingRounds) {
    return <Spinner />;
  }

  const noDataAvailable = rounds.length === 0
  if (noDataAvailable) {
    <Typography align="center">No round statistics to display yet.</Typography>;
    return null;
  }

  return (
    <Stack sx={{ gap: 2 }}>
      <DistancesTotals />
      <HolebyHoleTotals roundTotals={calculatedAverages} dashboard={true} />
    </Stack>

  );
}

export default StatisticsMain;
