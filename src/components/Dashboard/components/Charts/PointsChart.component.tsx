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
  // _tooltipData: TooltipPayload; // This custom prop will be removed
  area?: boolean; // To make it an area chart
  showMark?: boolean; // Optionally show marks on data points
  color?: string;
}

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

  // Data for the chart, reversed for chronological display (e.g., newest data point to the right if using default axis direction)
  // This array will also be used by the custom tooltip if enabled.
  const chartOrderedRounds = [...recentRounds].reverse();

  if (chartOrderedRounds.length === 0) {
    return null;
  }

  const chartData = chartOrderedRounds.map(r => r.points);
  const xAxisLabels = chartOrderedRounds.map(r => r.date);

  // Define CustomTooltipContent within PointsChart to close over chartOrderedRounds.
  // This avoids global variables and ensures data encapsulation.
  const CustomTooltipContentInternal: React.FC<{ series: { id: string }, itemData: { dataIndex: number } }> = (props) => {
    const { series: activeSeries, itemData } = props;

    if (!activeSeries || itemData?.dataIndex === undefined) {
      return null;
    }

    // Access data from chartOrderedRounds using the dataIndex provided by the chart
    const roundInfo = chartOrderedRounds[itemData.dataIndex];

    if (!roundInfo) {
      return null;
    }

    return (
      <Paper elevation={3} sx={{ p: 1.5, minWidth: '150px' }}>
        <Typography display="block" sx={{ fontWeight: 'bold' }}>{roundInfo.date || 'N/A'}</Typography>
        <Typography variant="caption" display="block">Course: {roundInfo.course || 'Unknown Course'}</Typography>
        <Typography display="block" sx={{ fontWeight: 'bold', mt: 0.5 }}>Points: {roundInfo.points}</Typography>
      </Paper>
    );
  };


  const lineChartSeriesConfig: CustomChartSeries[] = [{ // Use CustomChartSeries directly
    id: 'pointsSeries',
    type: 'line', // Explicitly set type to 'line'
    data: chartData,
    area: true,
    showMark: true,
    color: theme.palette.secondary.main, // Or another color
    valueFormatter: (value) => (value !== null ? `${value} pts` : ''),
  }];

  return (
    <Paper sx={{ p: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        Points (last {recentRounds.length} rounds)
      </Typography>
      <Box sx={{ mt: 1, width: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LineChart
          // @ts-ignore - The 'xAxis' prop is standard for LineChart.
          // This directive is used because TypeScript is currently not recognizing it.
          // Investigate @mui/x-charts version, type definitions, or potential conflicts
          // in the project's TypeScript setup that might be causing this.
          xAxis={[{ data: xAxisLabels, scaleType: 'point' }]}
          series={lineChartSeriesConfig} // Pass the simplified series
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          // slots={{ itemTooltip: CustomTooltipContentInternal }} // Enable custom tooltip using the internal component
          slotProps={{
            // The 'as any' here also suggests potential type definition issues for LineChart's slotProps.
            legend: {
              hidden: true,
            } as any, // Add 'as any' to bypass TS error if types are incorrect
          }} // Hide legend for single series
        />
      </Box>
    </Paper>
  );
};

export default PointsChart;