import { RootState } from '@/store/store';
import Paper from '@/styles/paper/ChartPaper.styles';
import { Box, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
import { useSelector } from 'react-redux';

const GirPercentageChart: React.FC = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();

  const recentRounds = rounds.slice(-5);

  if (recentRounds.length === 0) {
    return null;
  }

  let actualGirsMade = 0;
  let actualPossibleGirs = 0;
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
      actualGirsMade += round.totals.gir.avg || 0;
      actualPossibleGirs += round.totals.gir.totals || 0;
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

  if (actualPossibleGirs === 0 && totalRecordedPutts === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          GIR (Last {recentRounds.length} Rounds)
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>No GIR or Putting data available for the selected rounds.</Typography>
      </Paper>
    );
  }

  const girPercentage = actualPossibleGirs > 0 ? (actualGirsMade / actualPossibleGirs) * 100 : 0;
  const notGirPercentage = actualPossibleGirs > 0 ? 100 - girPercentage : 0;

  const girPieData = [
    { id: 'gir', value: actualGirsMade, label: `GIR (${girPercentage.toFixed(1)}%)`, color: theme.palette.greenDim.main },
    { id: 'notGir', value: actualPossibleGirs - actualGirsMade, label: `Not GIR (${notGirPercentage.toFixed(1)}%)`, color: theme.palette.redDim.main },
  ].filter(item => item.value > 0);

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        GIR (Last {recentRounds.length} Rounds)
      </Typography>
      <Typography component="h2" variant="subheadline2" gutterBottom sx={{ textAlign: 'center' }}>
        {`${girPercentage.toFixed(2)}%`}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, width: '100%' }}>
        <PieChart
          series={[
            {
              data: girPieData,
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
              position:
                { vertical: 'bottom', horizontal: 'center' },

            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default GirPercentageChart;