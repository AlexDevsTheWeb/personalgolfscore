import { RootState } from '@/store/store';
import { Box, Divider, Paper, Stack, Typography, useTheme } from '@mui/material';
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
  let roundsWithGirData = 0;
  let roundsWithPuttsOnGirData = 0;

  recentRounds.forEach(round => {
    if (round.totals && round.totals.gir) {
      // Assuming 'total' is count of GIRs made and 'possible' is count of opportunities
      actualGirsMade += round.totals.gir.avg || 0;
      actualPossibleGirs += round.totals.gir.totals || 0;
      if (round.totals.gir.totals && round.totals.gir.totals > 0) {
        roundsWithGirData++;
      }
    }
    if (round.totals && round.totals.putts) {
      sumTotalPutts += round.totals.putts.totals || 0;
      sumPuttsOnGir += round.totals.putts.puttsGir || 0; // Assumes puttsOnGir field exists
      if (round.totals.putts.totals !== undefined) roundsWithPuttData++;
      if (round.totals.putts.puttsGir !== undefined && (round.totals.gir?.totals || 0) > 0) roundsWithPuttsOnGirData++;
    }
  });
  if (actualPossibleGirs === 0 && roundsWithPuttData === 0) {
    return (
      <Paper sx={{ p: 2, width: '100%', textAlign: 'center', minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography component="h2" gutterBottom>
          GIR % (Last {recentRounds.length} Rounds)
        </Typography>
        <Typography>No GIR data available for the selected rounds.</Typography>
      </Paper>
    );
  }

  const girPercentage = actualPossibleGirs > 0 ? (actualGirsMade / actualPossibleGirs) * 100 : 0;
  const notGirPercentage = actualPossibleGirs > 0 ? 100 - girPercentage : 0;

  const avgPuttsPerRound = roundsWithPuttData > 0 ? sumTotalPutts / roundsWithPuttData : 0;
  const avgPuttsPerGir = actualGirsMade > 0 && sumPuttsOnGir > 0 ? sumPuttsOnGir / actualGirsMade : 0;

  const pieChartData = [
    { id: 'gir', value: actualGirsMade, label: `GIR (${girPercentage.toFixed(1)}%)`, color: theme.palette.greenDim.main },
    { id: 'notGir', value: actualPossibleGirs - actualGirsMade, label: `Not GIR (${notGirPercentage.toFixed(1)}%)`, color: theme.palette.redDim.main },
  ].filter(item => item.value > 0);

  return (
    <Paper sx={{ p: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        GIR Percentage (Last {recentRounds.length} Rounds)
      </Typography>

      <Stack spacing={0.5} sx={{ my: 1.5, textAlign: 'center' }}>
        {roundsWithPuttData > 0 && (
          <Typography >
            Avg. Putts per Round: <strong>{avgPuttsPerRound.toFixed(2)}</strong>
          </Typography>
        )}
        {actualGirsMade > 0 && roundsWithPuttsOnGirData > 0 && avgPuttsPerGir > 0 ? (
          <Typography >
            Avg. Putts per GIR: <strong>{avgPuttsPerGir.toFixed(2)}</strong>
          </Typography>
        ) : actualGirsMade > 0 && roundsWithPuttsOnGirData === 0 && (
          <Typography color="text.secondary">
            (Avg.Putts per GIR: data not available)
          </Typography>
        )}
      </Stack>

      {
        pieChartData.length > 0 ? (
          <>
            <Divider sx={{ mb: 1 }} />
            <Typography sx={{ textAlign: 'center', mb: -1 }}>GIR Distribution</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 230 }}> {/* Adjusted height */}
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
                height={200} // Adjusted height
                slotProps={{
                  legend: { direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' }, padding: 0 },
                }}
              />
            </Box>
          </>
        ) : roundsWithGirData > 0 ? (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>No GIRs recorded in the selected rounds.</Typography>
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>No GIR data available for pie chart.</Typography>
        )
      }


    </Paper >
  );
};

export default GirPercentageChart;