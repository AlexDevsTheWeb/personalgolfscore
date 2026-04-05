import Header from '@/components/common/header/Header.component';
import Paper from '@/styles/paper/ChartPaper.styles';
import { IDistance } from '@/types/roundData.types';
import { getClubsNames } from '@/utils/round/round.utils';
import { Box, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useMemo } from 'react';
import { usePlayerStore } from '@/store/zustand';

interface IDistancesCharts {
  distances?: IDistance[] | undefined
}

const DistancesTotals: React.FC<IDistancesCharts> = ({ distances }) => {
  const player = usePlayerStore((state) => state.player);
  const { golfBag, totalDistancesAVG } = player || {};
  const theme = useTheme();
  const internalDistanes = distances || totalDistancesAVG || [];

  const selectedClubNames = useMemo(() => {
    if (!golfBag || golfBag.length === 0) {
      return [];
    }
    try {
      const allSelectedNames = getClubsNames(golfBag);
      return allSelectedNames.filter(name => name.toUpperCase() !== 'PUTTER');
    } catch (error) {
      console.error("Error getting club names:", error);
      return [];
    }
  }, [golfBag]);

  const distanceMap = useMemo(() => {
    const map = new Map<string, number>();
    if (internalDistanes) {
      internalDistanes.forEach((distAvg: { club: string; avg: number }) => {
        if (distAvg.club && typeof distAvg.avg === 'number') {
          map.set(distAvg.club, distAvg.avg);
        }
      });
    }
    return map;
  }, [internalDistanes]);

  const chartGetCorrectClubName = (clubName: string) => {
    if (clubName.toLowerCase().includes('wedge')) {
      return clubName.split(' ')[0];
    }
    else {
      if (clubName.toLowerCase().includes("wood")) {
        return 'FW';
      }
      if (clubName.toLowerCase().includes("hybrid")) {
        return 'HY';
      }
      return clubName;
    }
  }

  const chartData = useMemo(() => {
    return selectedClubNames
      .map(clubName => {
        return ({
          club: chartGetCorrectClubName(clubName),
          distance: distanceMap.get(clubName) || 0,
        })
      })
  }, [selectedClubNames, distanceMap]);



  if (chartData.length === 0) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Header title={'Distances'} />
        <Typography sx={{ mt: 2 }}>Distance data not available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: distances ? '50%' : '100%' }}>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Average Club Distances
      </Typography>
      <Box sx={{ flexGrow: 1, width: 'auto', p: { xs: 1, sm: 1 }, mt: 1 }}>
        <BarChart
          dataset={chartData}
          xAxis={[{ scaleType: 'band', dataKey: 'club' }]} // Club names on X-axis
          yAxis={[{}]}
          series={[
            {
              dataKey: 'distance',
              label: 'Avg. Distance (m)',
              valueFormatter: (value: number | null) => (value !== null ? `${value} m` : 'N/A'),
              color: theme.palette.primary.main,
              id: 'avgDistance',
            },
          ]}
          layout="vertical"
          height={270}
          margin={{ top: 0, right: 10, bottom: 0, left: -10 }} // Adjust margins for labels
          grid={{ horizontal: true, vertical: true }}
        />
      </Box>
    </Paper>
  )
}

export default DistancesTotals;