import Paper from '@/styles/paper/ChartPaper.styles';
import { IRoundsCharts } from '@/types/charts.types';
import { Box, Typography, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import React from 'react';

interface IProcessedRoundPointsData {
  date: string;
  fullDate: string;
  course?: string;
  points: number | null;
}

const PointsChart: React.FC<IRoundsCharts> = ({ rounds }) => {
  const theme = useTheme();

  const recentRoundsRaw = rounds
    .filter(round => round.totals?.points?.totals !== undefined)
    .slice(-5)
    .reverse();

  if (recentRoundsRaw.length < 1) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          Points Trend
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>
          Not enough round data with points to display trends.
        </Typography>
      </Paper>
    );
  }

  const processedRoundsData: IProcessedRoundPointsData[] = recentRoundsRaw.map(round => ({
    date: dayjs(round.roundDate).format('DD/MM/YYYY'),
    fullDate: dayjs(round.roundDate).format('DD/MM/YYYY'),
    course: round.roundCourse,
    points: round.totals!.points!.totals,
  }));

  const pointsData = processedRoundsData.map(r => r.points);
  const xAxisLabels = processedRoundsData.map(r => `${r.date} \n ${r.course}`);

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Points Scored (Last {processedRoundsData.length} Rounds)
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: { xs: 0.5, sm: 1 }, mt: 1, minHeight: 280 }}>
        <LineChart
          series={[{ data: pointsData, label: 'Points', id: 'pointsId', color: theme.palette.primary.main, showMark: true }]}
          xAxis={[{ scaleType: 'point', data: xAxisLabels }]}
          yAxis={[{}]}
          height={270}
          margin={{ top: 10, right: 40, bottom: 0, left: 10 }}
          grid={{ horizontal: true, vertical: true }}
          slotProps={{
            legend: {
              direction: 'horizontal',
              position: {
                vertical: 'top',
                horizontal: 'center',
              }
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default PointsChart; 