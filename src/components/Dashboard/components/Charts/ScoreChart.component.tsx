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

    const grossVsParValue = round.totals!.score!.vsPar;

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

  const maxScore = Math.max(...scoresData, 0);
  const maxPositiveVsPar = Math.max(...grossVsParData.map(v => v ?? 0), ...netVsParData.map(v => v ?? 0), 0);
  const yAxisMax = Math.max(maxScore + 10, maxPositiveVsPar + 5, 20);

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Score Analysis (Last {processedRounds.length} Rounds)
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: { xs: 0.5, sm: 1 }, mt: 1, minHeight: 380 }}>
        <BarChart
          series={[
            { data: scoresData, label: 'Gross Score', id: 'grossScore', color: theme.palette.primary.main },
            { data: netVsParData, label: 'Net vs Par', id: 'netVsPar', color: theme.palette.redDim.main },
            { data: grossVsParData, label: 'Gross vs Par', id: 'grossVsPar', color: theme.palette.greenDim.main },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
          yAxis={[{ max: yAxisMax }]}
          height={340}
          margin={{ top: 0, right: 20, bottom: 50, left: 10 }}
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