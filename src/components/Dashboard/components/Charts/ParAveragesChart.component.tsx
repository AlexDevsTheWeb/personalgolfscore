import Paper from '@/styles/paper/ChartPaper.styles';
import { IRoundsCharts } from '@/types/charts.types';
import { IShots } from '@/types/roundData.types';
import { Box, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useEffect, useState } from 'react';
import { useRoundsStore, useRoundDetailsStore } from '@/store/zustand';

const ParAveragesChart: React.FC<IRoundsCharts> = ({ rounds }) => {
  const playerID = useRoundsStore((state) => state.playerID);
  const getRoundDetails = useRoundDetailsStore((state) => state.getRoundDetails);
  const theme = useTheme();

  const [allHoles, setAllHoles] = useState<IShots[]>([]);

  useEffect(() => {
    const fetchHoles = async () => {
      const holes: IShots[] = [];
      for (const r of rounds) {
        const result = await getRoundDetails(playerID, r.id);
        if (result) {
          holes.push(...result.holes);
        }
      }
      setAllHoles(holes);
    };

    if (rounds.length > 0 && playerID) {
      fetchHoles();
    }
  }, [rounds, playerID, getRoundDetails]);

  const parData = {
    par3: { totalStrokes: 0, count: 0 },
    par4: { totalStrokes: 0, count: 0 },
    par5: { totalStrokes: 0, count: 0 },
  };

  allHoles.forEach(hole => {
    if (hole.par === 3) {
      parData.par3.totalStrokes += hole.strokes;
      parData.par3.count++;
    }
    if (hole.par === 4) {
      parData.par4.totalStrokes += hole.strokes;
      parData.par4.count++;
    }
    if (hole.par === 5) {
      parData.par5.totalStrokes += hole.strokes;
      parData.par5.count++;
    }
  });

  const par3Average = parData.par3.count > 0 ? parData.par3.totalStrokes / parData.par3.count : 0;
  const par4Average = parData.par4.count > 0 ? parData.par4.totalStrokes / parData.par4.count : 0;
  const par5Average = parData.par5.count > 0 ? parData.par5.totalStrokes / parData.par5.count : 0;

  const chartData = [
    { par: 'Par 3', average: par3Average },
    { par: 'Par 4', average: par4Average },
    { par: 'Par 5', average: par5Average },
  ];

  const getBarColor = (par: string, average: number) => {

    if (par === 'Par 3') {
      if (average > 4.5) return theme.palette.redDim.main;
      if (average > 3 && average <= 4.5) return theme.palette.yellowDim.main;
      return theme.palette.greenDim.main;
    }
    if (par === 'Par 4') {
      if (average > 5.5) return theme.palette.redDim.main;
      if (average > 4 && average <= 5.5) return theme.palette.yellowDim.main;
      return theme.palette.greenDim.main;
    }
    if (par === 'Par 5') {
      if (average > 6.5) return theme.palette.redDim.main;
      if (average > 5 && average <= 6.5) return theme.palette.yellowDim.main;
      return theme.palette.greenDim.main;
    }
    return theme.palette.primary.main;
  };

  const barColors = chartData.map(data => getBarColor(data.par, data.average));

  if (allHoles.length === 0) {
    return (
      <Paper>
        <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', p: 2 }}>
          Par Averages
        </Typography>
        <Typography sx={{ textAlign: 'center', p: 2 }}>
          Not enough hole data to display the chart.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Par Averages
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: { xs: 0.5, sm: 1 }, mt: 1, minHeight: 300 }}>
        <BarChart
          dataset={chartData}
          xAxis={[{ scaleType: 'band', dataKey: 'par' }]}
          series={[{ dataKey: 'average', label: 'Average Strokes' }]}
          height={270}
          margin={{ top: 10, right: 30, bottom: 20, left: 0 }}
          grid={{ horizontal: true, vertical: true }}
          colors={barColors}
        />
      </Box>
    </Paper>
  );
};

export default ParAveragesChart;
