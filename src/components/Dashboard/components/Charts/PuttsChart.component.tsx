import Paper from '@/styles/paper/ChartPaper.styles';
import { IRoundsCharts } from '@/types/charts.types';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';

const PuttsChart: React.FC<IRoundsCharts> = ({ rounds }) => {
  const theme = useTheme();

  const recentRounds = rounds.slice(0, 5);

  let sumTotalPutts = 0;
  let sumPuttsOnGir = 0;
  let roundsWithPuttData = 0;
  let roundsWithPuttsOnGirData = 0;
  let roundsWithGirData = 0;
  let total1Putts = 0;
  let total2Putts = 0;
  let total3PlusPutts = 0;
  let totalRecordedPutts = 0;

  recentRounds.forEach(round => {
    let roundHasGirData = false;
    if (round.totals && round.totals.gir) {
      if (round.totals.gir.totals && round.totals.gir.totals > 0) {
        roundsWithGirData++;
      }
      if (round.totals.gir.totals !== undefined && round.totals.gir.totals > 0) {
        roundHasGirData = true;
      }
    }
    if (round.totals && round.totals.putts) {
      sumTotalPutts += round.totals.putts.totals || 0;
      sumPuttsOnGir += round.totals.putts.puttsGir || 0;
      if (round.totals.putts.totals !== undefined) roundsWithPuttData++;
      if (round.totals.putts.puttsGir !== undefined && roundHasGirData) roundsWithPuttsOnGirData++;

      total1Putts += round.totals.putts.putts1 || 0;
      total2Putts += round.totals.putts.putts2 || 0;
      total3PlusPutts += round.totals.putts.putts3More || 0;
    }
  });

  totalRecordedPutts = total1Putts + total2Putts + total3PlusPutts;

  const avgPuttsPerRound = sumTotalPutts / recentRounds.length;


  if (totalRecordedPutts === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          GIR & Putting (Last {recentRounds.length} Rounds)
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>No Putting data available for the selected rounds.</Typography>
      </Paper>
    );
  }

  const puttDistributionPieData = [
    { id: '1putt', value: total1Putts, label: `1 Putt (${totalRecordedPutts > 0 ? ((total1Putts / totalRecordedPutts) * 100).toFixed(1) : 0}%)`, color: theme.palette.greenDim.main },
    { id: '2putt', value: total2Putts, label: `2 Putts (${totalRecordedPutts > 0 ? ((total2Putts / totalRecordedPutts) * 100).toFixed(1) : 0}%)`, color: theme.palette.yellowDim.main },
    { id: '3putt', value: total3PlusPutts, label: `3+ Putts (${totalRecordedPutts > 0 ? ((total3PlusPutts / totalRecordedPutts) * 100).toFixed(1) : 0}%)`, color: theme.palette.redDim.main },
  ].filter(item => item.value > 0);

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Putting (Last {recentRounds.length} Rounds): {avgPuttsPerRound.toFixed(2)}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: '100%' }}>
        <PieChart
          series={[
            {
              data: puttDistributionPieData,
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
              position: {
                vertical: 'bottom',
                horizontal: 'center'
              }
            },
          }}
        />
      </Box>

    </Paper >
  );
};


export default PuttsChart;