import Header from '@/components/common/header/Header.component';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import { getClubsNames } from '@/utils/round/round.utils';
import { Box, Paper, Stack, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { TableCell, TableRow } from '../../../styles';

const DistancesTotals: React.FC = () => {

  const { player } = useSelector((store: RootState) => store.player);
  const { golfBag, totalDistancesAVG } = player || {};
  const [visible, setVisible] = useState<boolean>(false);

  const isMobile = useDeviceDetection().isMobile;
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
      totalDistancesAVG.forEach(distAvg => {
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
    <Stack>
      <Header title={'Distances'} onClick={handleToggleVisibility} />
      {isMobile ? (
        <Paper sx={{ padding: 2, display: visible ? 'block' : 'none' }}>
          <Stack spacing={1}>
            {selectedClubNames.map((clubName) => {
              const avgDistance = distanceMap.get(clubName);
              const displayDistance = avgDistance !== undefined && avgDistance > 0 ? `${avgDistance} m.` : 'N.R.';
              return (
                <Box
                  key={`mobile-dist-${clubName}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #eee',
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
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label='average distances table'>
            <TableHead>
              <TableRow>
                {selectedClubNames.map((clubName) => (
                  <TableCell align='center' space='10px' key={`header-${clubName}`}>
                    {clubName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {selectedClubNames.map((clubName) => {
                  const avgDistance = distanceMap.get(clubName);
                  const displayDistance = avgDistance !== undefined && avgDistance > 0 ? `${avgDistance} m.` : 'N.R.';
                  return (
                    <TableCell align='center' key={`data-${clubName}`}>{displayDistance}</TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      )}
    </Stack>
  )
}

export default DistancesTotals
