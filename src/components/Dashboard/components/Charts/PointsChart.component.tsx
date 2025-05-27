import { RootState } from '@/store/store';
import Paper from '@/styles/paper/ChartPaper.styles';
import { Box, Paper as MuiPaper, Typography, useTheme } from '@mui/material'; // Import MuiPaper for tooltip
import { LineChart } from '@mui/x-charts/LineChart'; // Using LineChart with area prop
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

const PointsChart: React.FC = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();
  const recentRounds = rounds
    .slice(-5)
    .map(round => ({
      points: round.totals.points.totals !== undefined ? Number(round.totals.points.totals) : null,
      date: dayjs(round.roundDate).format('DD/MM/YYYY'),
      course: round.roundCourse,
    }));

  const chartOrderedRounds = [...recentRounds].reverse();

  if (chartOrderedRounds.length === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          Points Trend
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>
          Not enough round data to display points trend.
        </Typography>
      </Paper>
    );
  }

  const chartData = chartOrderedRounds.map(r => r.points);
  const xAxisLabels = chartOrderedRounds.map(r => dayjs(r.date, 'DD/MM/YYYY').format('DD/MM'));

  const CustomTooltipContent: React.FC<{
    series?: Array<{ id: string; color: string; label?: string }>; // series prop from LineChart
    itemData?: { dataIndex: number }; // itemData prop from LineChart
  }> = (tooltipProps) => {
    const { series: activeSeriesInfo, itemData } = tooltipProps;

    if (!activeSeriesInfo || !itemData || itemData.dataIndex === undefined) {
      return null;
    }

    const roundInfo = chartOrderedRounds[itemData.dataIndex];
    if (!roundInfo) {
      return null;
    }

    return (
      <MuiPaper sx={{ p: 1.5, boxShadow: theme.shadows[4], minWidth: '180px' }}>
        <Typography variant="subheadline2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {roundInfo.date}
        </Typography>
        {roundInfo.course && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            Course: {roundInfo.course}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body" sx={{ flexGrow: 1 }}>
            Points:
          </Typography>
          <Typography variant="headline6" sx={{ fontWeight: 'medium' }}>
            {roundInfo.points !== null ? `${roundInfo.points} pts` : 'N/A'}
          </Typography>
        </Box>
      </MuiPaper>
    );
  };

  const lineChartSeriesConfig = [{
    id: 'pointsSeries',
    data: chartData,
    label: 'Points', // For potential future legend use
    area: true,
    showMark: true,
    color: theme.palette.secondary.light, // Using a lighter shade for area, or choose another
    valueFormatter: (value: number | null) => (value !== null ? `${value} pts` : 'N/A'),
  }];

  return (
    <Paper>
      <Typography component="h2" variant='headline6' gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Points (last {recentRounds.length} rounds)
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: 1 }}>
        <LineChart
          // xAxis={[{ data: xAxisLabels, scaleType: 'point' }]}
          series={lineChartSeriesConfig}
          // height={300}
          // margin={{ top: 20, right: 25, bottom: 50, left: 45 }}
          grid={{ vertical: true, horizontal: true }}
        // slots={{
        //   itemTooltip: CustomTooltipContent,
        // }}
        // slotProps={{
        //   legend: {
        //     hidden: true,
        //   }, // Hide legend for single series, or configure if needed
        // }}
        />
      </Box>
    </Paper>
  );
};

export default PointsChart; 