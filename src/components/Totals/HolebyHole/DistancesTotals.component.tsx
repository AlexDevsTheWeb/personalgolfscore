import Header from '@/components/common/header/Header.component';
import { RootState } from '@/store/store';
import { getClubsNames } from '@/utils/round/round.utils';
import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
// Custom TableCell and TableRow imports are no longer needed if only used for the table

const DistancesTotals: React.FC = () => {
  const { player } = useSelector((store: RootState) => store.player);
  const { golfBag, totalDistancesAVG } = player || {};
  const [visible, setVisible] = useState<boolean>(true);
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

  const handleToggleVisibility = () => {
    setVisible(!visible);
  };

  if (selectedClubNames.length === 0) {
    return <Typography>Distance data not available.</Typography>;
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Stack>
        <Header title={'Distances'} onClick={handleToggleVisibility} />
        {visible && (
          // Unified structure for all screen sizes
          <Paper sx={{ padding: 2 }}>
            <Stack spacing={1}>
              {selectedClubNames.map((clubName) => {
                const avgDistance = distanceMap.get(clubName);
                const displayDistance = avgDistance !== undefined && avgDistance > 0 ? `${avgDistance} m.` : 'N.R.';
                return (
                  <Box
                    key={`dist-${clubName}`} // Unified key
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: (theme) => `1px solid ${theme.palette.divider}`, // Use theme for border
                      paddingBottom: 0.5,
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <Typography fontWeight="medium">{clubName}:</Typography>
                    <Typography>{`${displayDistance}`}</Typography>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}

export default DistancesTotals;
