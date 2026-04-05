import { Stack, Typography } from '@mui/material';
import Spinner from '../common/spinner/Spinner.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import { useRoundsStore } from '@/store/zustand';
import { usePlayerStore } from '@/store/zustand';
import { useMemo } from 'react';
import { calculateDisplayableAverages } from '@/utils/calculator/AverageCalculator.utils';

const StatisticsMain = () => {
  const isLoadingRounds = useRoundsStore((state) => state.isLoading);
  const { player } = usePlayerStore();
  const isLoadingPlayer = usePlayerStore((state) => state.isLoading);

  const displayableAverages = useMemo(() => {
    const rawTotalsAvg = player?.totalsRoundsAVG;
    return calculateDisplayableAverages(rawTotalsAvg);
  }, [player?.totalsRoundsAVG]);

  if (isLoadingRounds || isLoadingPlayer) {
    return <Spinner />;
  }

  const noDataAvailable = displayableAverages.score.totals === 0 && displayableAverages.points.totals === 0;

  if (noDataAvailable) {
    return <Typography align="center">No round statistics to display yet.</Typography>;
  }

  return (
    <Stack sx={{ gap: 2 }}>
      <HolebyHoleTotals roundTotals={displayableAverages} dashboard={true} />
    </Stack>
  );
}

export default StatisticsMain;
