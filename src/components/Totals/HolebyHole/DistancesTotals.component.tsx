import Header from '@/components/common/header/Header.component';
import { RootState } from '@/store/store';
import Paper from '@/styles/paper/ChartPaper.styles';
import { getClubsNames } from '@/utils/round/round.utils';
import { Box, Typography, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

const DistancesTotals: React.FC = () => {
  const { player } = useSelector((store: RootState) => store.player);
  const { golfBag, totalDistancesAVG } = player || {};
  const theme = useTheme();

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
    if (totalDistancesAVG) {
      totalDistancesAVG.forEach((distAvg: { club: string; avg: number }) => {
        if (distAvg.club && typeof distAvg.avg === 'number') {
          map.set(distAvg.club, distAvg.avg);
        }
      });
    }
    return map;
  }, [totalDistancesAVG]);

  console.log("totalDistancesAVG: ", totalDistancesAVG)

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
    // .filter(item => item.distance > 0) // Optionally filter out clubs with no recorded distance
    // .sort((a, b) => b.distance - a.distance); // Sort by distance descending
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
    <Paper>
      <Typography component="h2" variant="headline6" gutterBottom sx={{ textAlign: 'center', pt: 2, px: 2 }}>
        Average Club Distances
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', p: { xs: 1, sm: 1 }, mt: 1 }}>
        <BarChart
          dataset={chartData}
          xAxis={[{ scaleType: 'band', dataKey: 'club' }]} // Club names on X-axis
          yAxis={[{ label: 'Avg. Distance (m)' }]}
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
          margin={{ top: 0, right: 5, bottom: 0, left: 0 }} // Adjust margins for labels
          grid={{ horizontal: true }}
        />
      </Box>
    </Paper>
  )
}

export default DistancesTotals;