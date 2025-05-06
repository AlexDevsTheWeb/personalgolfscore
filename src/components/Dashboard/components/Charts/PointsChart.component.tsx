import { RootState } from '@/store/store';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart'; // Using LineChart with area prop
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

// Define a type for the payload attached to each series for tooltip information
interface TooltipPayload {
  points: number;
  date: string;
  course: string | undefined;
}

// Define a more specific type for your chart series objects
interface CustomChartSeries {
  id: string;
  type?: 'line'; // Optional, as LineChart is default
  data: (number | null)[];
  label?: string; // For legend, if used
  valueFormatter?: (value: number | null) => string;
  _tooltipData: TooltipPayload;
  area?: boolean; // To make it an area chart
  showMark?: boolean; // Optionally show marks on data points
  color?: string;
}

// Custom Tooltip Component
const CustomTooltipContent: React.FC<any> = (props) => {
  const { series, itemData } = props;
  const tooltipData = (series as unknown as CustomChartSeries)._tooltipData;

  if (!tooltipData || itemData == null) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 1.5, minWidth: '150px' }}>
      <Typography display="block" sx={{ fontWeight: 'bold' }}>{tooltipData.date || 'N/A'}</Typography>
      <Typography variant="caption" display="block">Course: {tooltipData.course || 'Unknown Course'}</Typography>
      <Typography display="block" sx={{ fontWeight: 'bold', mt: 0.5 }}>Points: {tooltipData.points}</Typography>
    </Paper>
  );
};

const PointsChart: React.FC = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();

  const recentRounds = rounds
    .slice(-5)
    .map(round => ({
      points: Number(round.totals.points.totals),
      date: dayjs(round.roundDate).format('DD/MM/YYYY'),
      course: round.roundCourse,
    }));

  // Reverse the rounds to display in reverse chronological order (newest first on chart)
  const displayableRecentRounds = [...recentRounds].reverse();

  if (displayableRecentRounds.length === 0) {
    return null;
  }

  const chartData = displayableRecentRounds.map(r => r.points);
  const xAxisLabels = displayableRecentRounds.map(r => r.date);

  const series: CustomChartSeries[] = [{
    id: 'pointsSeries',
    data: chartData,
    _tooltipData: { points: 0, date: '', course: '' }, // This is a placeholder for the series-level _tooltipData
    area: true,
    showMark: true,
    color: theme.palette.secondary.main, // Or another color
    valueFormatter: (value) => (value !== null ? `${value} pts` : ''),
  }];

  return (
    <Paper sx={{ p: 1, width: '100%' }}>
      <Typography component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        Last {displayableRecentRounds.length} Rounds Points
      </Typography>
      <Box sx={{ mt: 1, width: '100%' }}>
        <LineChart
          xAxis={[{ data: xAxisLabels, scaleType: 'point' }]}
          series={series.map(s => ({ // Map to ensure _tooltipData is correctly structured for each point
            ...s,
            data: s.data.map((pointValue, index) => pointValue), // Pass data as is
            // Attach tooltip data to the series for the custom tooltip to pick up contextually
            _tooltipData: (index: number) => ({ // Function to provide specific tooltip data per point
              points: displayableRecentRounds[index]?.points ?? 0,
              date: displayableRecentRounds[index]?.date ?? '',
              course: displayableRecentRounds[index]?.course,
            }),
          }))}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          // slots={{ itemTooltip: CustomTooltipContent }}
          slotProps={{ legend: { hidden: true } }} // Hide legend for single series area chart
        />
      </Box>
    </Paper>
  );
};

export default PointsChart;