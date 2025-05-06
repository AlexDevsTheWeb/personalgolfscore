import { RootState } from '@/store/store';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
import { useSelector } from 'react-redux';

const FairwayHitsChart: React.FC = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();

  const recentRounds = rounds.slice(-5);

  if (recentRounds.length === 0) {
    return null;
  }

  let totalCenterHits = 0;
  let totalLeftHits = 0;
  let totalRightHits = 0;
  let totalFairwayHitsCategorized = 0;

  recentRounds.forEach(round => {
    if (round.totals && round.totals.fairway) {
      totalCenterHits += round.totals.fairway.fairwayCenter || 0;
      totalLeftHits += round.totals.fairway.fairwayLeft || 0;
      totalRightHits += round.totals.fairway.fairwayRight || 0;
      totalFairwayHitsCategorized += round.totals.fairway.total || 0; // This is sum of center, left, right hits
    }
  });

  if (totalFairwayHitsCategorized === 0) {
    return (
      <Paper sx={{ p: 2, width: '100%', height: '100%', textAlign: 'center', minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography component="h2" gutterBottom>
          Fairway Hits (Last {recentRounds.length} Rounds)
        </Typography>
        <Typography>No fairway hit data available for the selected rounds.</Typography>
      </Paper>
    );
  }

  const pieChartData = [
    { id: 'center', value: totalCenterHits, label: `Center (${((totalCenterHits / totalFairwayHitsCategorized) * 100).toFixed(1)}%)`, color: theme.palette.greenDim.main },
    { id: 'left', value: totalLeftHits, label: `Left (${((totalLeftHits / totalFairwayHitsCategorized) * 100).toFixed(1)}%)`, color: theme.palette.yellowDim.main },
    { id: 'right', value: totalRightHits, label: `Right (${((totalRightHits / totalFairwayHitsCategorized) * 100).toFixed(1)}%)`, color: theme.palette.redDim.main },
  ].filter(item => item.value > 0); // Filter out slices with zero value

  return (
    <Paper sx={{ p: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        Fairway hits distribution (last {recentRounds.length} rounds)
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
        <PieChart
          series={[
            {
              data: pieChartData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              innerRadius: 40, // Donut chart
              outerRadius: 100,
            },
          ]}
          height={250}
          slotProps={{
            legend: { direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' }, padding: 0 },
          }}
        />
      </Box>
    </Paper>
  );
};

export default FairwayHitsChart;