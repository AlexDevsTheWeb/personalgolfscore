import { selectDisplayableOverallTotals } from '@/features/player/player.selectors';
import { RootState } from '@/store/store';
import { Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Spinner from '../common/spinner/Spinner.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';

const StatisticsMain = () => {
  const { isLoading: isLoadingRounds } = useSelector((store: RootState) => store.rounds);
  const displayableAverages = useSelector(selectDisplayableOverallTotals);
  const { isLoading: isLoadingPlayer, player } = useSelector((store: RootState) => store.player);

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
