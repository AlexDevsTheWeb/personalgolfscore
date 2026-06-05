import Paper from '@/styles/paper/ChartPaper.styles';
import { IRoundsCharts } from '@/types/charts.types';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

const FairwayHitsChart: React.FC<IRoundsCharts> = ({ rounds }) => {
  const theme = useTheme();

  const recentRounds = rounds.slice(0, 5);

  let totalFairwayCenter = 0;
  let totalFairwayLeft = 0;
  let totalFairwayRight = 0;
  let totalAttempts = 0;

  recentRounds.forEach((round: any) => {
    if (round.totals && round.totals.fairway) {
      const { fairwayCenter = 0, fairwayLeft = 0, fairwayRight = 0 } = round.totals.fairway;
      totalFairwayCenter += fairwayCenter;
      totalFairwayLeft += fairwayLeft;
      totalFairwayRight += fairwayRight;
      totalAttempts += fairwayCenter + fairwayLeft + fairwayRight;
    }
  });

  if (totalAttempts === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          Fairway
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>
          No fairway data available for the last {recentRounds.length} rounds.
        </Typography>
      </Paper>
    );
  }

  const pieChartData = [
    { id: 'center', value: totalFairwayCenter, label: `Hit (${((totalFairwayCenter / totalAttempts) * 100).toFixed(2)}%)`, color: theme.palette.greenDim.main },
    { id: 'left', value: totalFairwayLeft, label: `Left (${((totalFairwayLeft / totalAttempts) * 100).toFixed(2)}%)`, color: theme.palette.redDim.main },
    { id: 'right', value: totalFairwayRight, label: `Right (${((totalFairwayRight / totalAttempts) * 100).toFixed(2)}%)`, color: theme.palette.red2Dim.main },
  ].filter(item => item.value > 0);

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Fairway Hits (Last {recentRounds.length} Rounds): {`${((totalFairwayCenter / totalAttempts) * 100).toFixed(2)}%`}
      </Typography>
      <Typography component="h2" variant="subheadline2" gutterBottom sx={{ textAlign: 'center' }}>

      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: '100%' }}>
        <PieChart
          series={[
            {
              data: pieChartData,
              innerRadius: 80,
              outerRadius: 120,
              paddingAngle: 2,
              cornerRadius: 5,
              faded: {
                innerRadius: 100,
                additionalRadius: -50,
                color: 'gray'
              },
            },
          ]}
          height={250}
          slotProps={{
            legend: {
              direction: 'horizontal',
              position: { vertical: 'bottom', horizontal: 'center' },
            }
          }}
        />
      </Box>

    </Paper>
  )
};


export default FairwayHitsChart;