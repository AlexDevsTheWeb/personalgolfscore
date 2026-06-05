import Paper from '@/styles/paper/ChartPaper.styles';
import { IRoundsCharts } from '@/types/charts.types';
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';
import React from 'react';

const ScoreCharts: React.FC<IRoundsCharts> = ({ rounds }) => {
  // const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();

  const recentRoundsRaw = rounds
    .filter(round =>
      round.totals?.score?.totals !== undefined &&
      round.totals?.score?.vsPar !== undefined &&
      round.roundPar !== undefined
    )
    .slice(0, 5)
    .reverse();

  if (recentRoundsRaw.length === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          Player Score Chart
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>
          Not enough round data with scores and par information to display the chart.
        </Typography>
      </Paper>
    );
  }

  const processedRounds = recentRoundsRaw.map(round => {
  const grossScore = round.totals!.score!.totals;
  const roundPar = Number(round.roundPar!);
  const playingHCP = round.roundPlayingHCP ? Number(round.roundPlayingHCP) : null;

  // Compute vsPar at read time: imported rounds leave totals.score.vsPar at 0
  // because the import path skips the TotalsCalculator, but the raw values needed
  // (gross score and par) are always present.
  const grossVsParValue = grossScore - roundPar;

    let netScoreValue: number | null = null;
    let netVsParValue: number | null = null;

    if (playingHCP !== null) {
      netScoreValue = grossScore - playingHCP;
      netVsParValue = netScoreValue - roundPar;
    }

    return {
      date: dayjs(round.roundDate).format('DD/MM/YYYY'),
      course: round.roundCourse,
      grossScore,
      grossVsPar: grossVsParValue,
      netVsPar: netVsParValue,
    };
  });

  const scoresData = processedRounds.map(r => r.grossScore);
  const netVsParData = processedRounds.map(r => r.netVsPar);
  const grossVsParData = processedRounds.map(r => r.grossVsPar);
  const xLabels = processedRounds.map(r => `${r.date} \n ${r.course}`);

  const allDeltas = [...grossVsParData, ...netVsParData].filter((v): v is number => v !== null);
  const maxScore = Math.max(...scoresData, 0);
  const maxDelta = allDeltas.length > 0 ? Math.max(...allDeltas, 0) : 0;
  const minDelta = allDeltas.length > 0 ? Math.min(...allDeltas, 0) : 0;
  const yAxisMaxScore = maxScore + 10;
  const yAxisMaxDelta = Math.max(maxDelta + 5, 5);
  const yAxisMinDelta = minDelta < 0 ? minDelta - 5 : 0;

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Score Analysis (Last {processedRounds.length} Rounds)
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: { xs: 0.5, sm: 1 }, mt: 1, minHeight: 380 }}>
        <BarChart
          series={[
            { data: scoresData, label: 'Gross Score', id: 'grossScore', color: theme.palette.primary.main, yAxisId: 'score' },
            { data: netVsParData, label: 'Net vs Par', id: 'netVsPar', color: theme.palette.redDim.main, yAxisId: 'vsPar' },
            { data: grossVsParData, label: 'Gross vs Par', id: 'grossVsPar', color: theme.palette.greenDim.main, yAxisId: 'vsPar' },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
          yAxis={[
            { id: 'score', label: 'Strokes', min: 0, max: yAxisMaxScore },
            { id: 'vsPar', label: 'vs Par', position: 'right', min: yAxisMinDelta, max: yAxisMaxDelta },
          ]}
          height={340}
          margin={{ top: 0, right: 70, bottom: 50, left: 10 }}
          grid={{ vertical: true, horizontal: true }}
          slotProps={{
            legend: {
              direction: 'horizontal',
              position: { vertical: 'top', horizontal: 'center' },
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default ScoreCharts;