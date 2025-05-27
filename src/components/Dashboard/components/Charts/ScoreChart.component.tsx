import { RootState } from '@/store/store';
import Paper from '@/styles/paper/ChartPaper.styles';
import { IRecentRoundData } from '@/types/charts.types';
import { Box, Paper as MuiPaper, Typography, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';

const ScoreCharts: React.FC = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const theme = useTheme();

  // 1. Data Preparation (similar to before, ensuring robustness)
  const recentRoundsData: IRecentRoundData[] = rounds
    .slice(-5) // Take the last 5 rounds
    .map(round => {
      // Robust parsing for scores, par, and HCP
      const parseNumeric = (val: any): number | null => {
        if (val === undefined || val === null || String(val).trim() === "") return null;
        const num = Number(val);
        return isNaN(num) ? null : num;
      };

      const totalScore = parseNumeric(round.totals.score.totals);
      const par = parseNumeric(round.roundPar);
      const playingHCP = parseNumeric(round.roundPlayingHCP);

      let netScore: number | null = null;
      let grossScore: number | null = null;

      if (totalScore !== null && par !== null) {
        netScore = totalScore - par;
        if (playingHCP !== null) {
          grossScore = totalScore - (par + playingHCP);
        }
      }

      return {
        score: totalScore,
        netScore: netScore,
        grossScore: grossScore,
        date: dayjs(round.roundDate).format('DD/MM/YYYY'), // Full date for tooltip
        course: round.roundCourse,
      };
    });

  // Reverse for chronological display on the chart (oldest to newest)
  const chartOrderedRounds = [...recentRoundsData].reverse();

  if (chartOrderedRounds.length === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          Score Trends
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>
          Not enough round data to display score trends.
        </Typography>
      </Paper>
    );
  }

  const xAxisLabels = chartOrderedRounds.map(r => dayjs(r.date, 'DD/MM/YYYY').format('DD/MM'));

  // Prepare series data for the line chart
  const series = [
    {
      id: 'totalScoreSeries',
      data: chartOrderedRounds.map(r => r.score),
      label: 'Total Score',
      color: theme.palette.primary.main,
      area: true,
      showMark: true,
      valueFormatter: (value: number | null) => (value === null ? 'N/A' : `${value}`),
    },
    {
      id: 'netScoreSeries',
      data: chartOrderedRounds.map(r => r.netScore),
      label: 'Net Score',
      color: theme.palette.secondary.main, // Example color
      showMark: true,
      valueFormatter: (value: number | null) => {
        if (value === null) return 'N/A';
        if (value === 0) return 'E';
        return value > 0 ? `+${value}` : `${value}`;
      },
    },
    {
      id: 'grossScoreSeries',
      data: chartOrderedRounds.map(r => r.grossScore),
      label: 'Gross Score',
      color: theme.palette.success.main, // Example color (greenDim might be too light for a line)
      showMark: true,
      valueFormatter: (value: number | null) => {
        if (value === null) return 'N/A';
        if (value === 0) return 'E';
        return value > 0 ? `+${value}` : `${value}`;
      },
    },
  ];

  // Custom Tooltip Component
  const CustomTooltipContent: React.FC<{
    series?: Array<{ id: string; color: string; label?: string }>;
    itemData?: { dataIndex: number };
  }> = (props) => {
    const { series: activeSeriesInfo, itemData } = props; // Renamed activeSeries to activeSeriesInfo for clarity

    if (!activeSeriesInfo || !itemData || itemData.dataIndex === undefined) {
      return null;
    }

    const roundInfo = chartOrderedRounds[itemData.dataIndex];
    if (!roundInfo) return null;

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
        {series.map(sDef => {
          const value = sDef.data[itemData.dataIndex];
          return (
            <Box key={sDef.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              {/* <Box sx={{ width: 10, height: 10, bgcolor: sDef.color, borderRadius: '50%', mr: 1 }} /> */}
              <Typography variant="body" sx={{ flexGrow: 1 }}>
                {sDef.label}:
              </Typography>
              <Typography variant="body" sx={{ fontWeight: 'medium' }}>
                {sDef.valueFormatter(value)}
              </Typography>
              {/* </Typography> */}
            </Box>
          );
        })
        }
      </MuiPaper >
    );
  };

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Score Trends (Last {chartOrderedRounds.length} Rounds)
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: 1 }}>
        <LineChart
          // xAxis={[{ data: xAxisLabels, scaleType: 'point' }]}
          series={series}
          // height={300} // Adjust height as needed, or make it responsive
          // margin={{ top: 20, right: 25, bottom: 50, left: 45 }} // Adjusted margins
          grid={{ vertical: true, horizontal: true }} // Add grid lines for better readability
        // slotProps={{
        //   legend: {
        //     direction: 'row',
        //     position: { vertical: 'bottom', horizontal: 'middle' },
        //     padding: 0,
        //     labelStyle: {
        //       fontSize: '0.8rem',
        //     }
        //   },
        // }}
        // slots={{
        //   itemTooltip: CustomTooltipContent,
        // }}
        // sx={{
        //   // Example: Style marks if needed
        //   [`.${lineElementClasses.mark}`]: {
        //     // stroke: theme.palette.background.paper, // Add a border to marks
        //     // strokeWidth: 1,
        //   },
        // }}
        />
      </Box>
    </Paper>
  );
};

export default ScoreCharts;