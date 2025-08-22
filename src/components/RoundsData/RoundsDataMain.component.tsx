import { clearRoundDetails, getRoundDetails } from '@/features/round/roundDetails.slice';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { AppDispatch, RootState } from '@/store/store';
import BoxBetween from '@/styles/box/BoxBetween.styles';
import { TableCell } from '@/styles/index';
import { IDistance } from '@/types/roundData.types';
import { CLUB_SORT_ORDER } from '@/utils/constant.utils';
import { getClubsNames } from '@/utils/round/round.utils';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../common/header/Header.component';
import Spinner from '../common/spinner/Spinner.component';
import EmptyRounds from '../Dashboard/components/EmptyRounds/EmptyRounds.component';
import HolebyHoleTable from '../NewRound/HolebyHoleTable.component';
import DistancesTotals from '../Totals/HolebyHole/DistancesTotals.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import RoundsDataHeader from './components/roundData/RoundsDataHeader.component';

const RoundsDataMain = () => {
  const params = useParams<{ roundID: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const playerId = readUserLocalStorage();
  const isMobile = useDeviceDetection().isMobile;

  const { round, isLoading: isLoadingRound, error } = useSelector((store: RootState) => store.roundDetails);
  const { player, isLoading: isLoadingPlayer } = useSelector((store: RootState) => store.player);
  const golfBag = player?.golfBag;

  const [openHoleByHole, setOpenHoleByHole] = useState<boolean>(false);
  const [openDistances, setOpenDistances] = useState<boolean>(true);
  console.log("round QUI: ", round?.distances);

  useEffect(() => {
    if (params.roundID && playerId) {
      dispatch(getRoundDetails({ playerId, roundId: params.roundID }));
    }
    return () => {
      dispatch(clearRoundDetails());
    }
  }, [dispatch, params.roundID, playerId]);

  const roundDistanceMap = useMemo(() => {
    const distances: IDistance[] = round?.distances || [];
    const map = new Map<string, number>();
    distances.forEach(distAvg => {
      if (distAvg.club && typeof distAvg.avg === 'number' && distAvg.avg > 0 && distAvg.club.toUpperCase() !== 'PUTTER') {
        map.set(distAvg.club, Math.round(distAvg.avg));
      }
    });
    return map;
  }, [round]);

  const allClubNamesFromBag = useMemo(() => {
    if (!golfBag || golfBag.length === 0) {
      return [];
    }
    try {
      const allSelectedNames = getClubsNames(golfBag)
        .filter(name => name.toUpperCase() !== 'PUTTER');
      const customSort = (a: string, b: string): number => {
        const upperA = a.toUpperCase();
        const upperB = b.toUpperCase();
        const indexA = CLUB_SORT_ORDER.indexOf(upperA);
        const indexB = CLUB_SORT_ORDER.indexOf(upperB);

        // If both clubs are in the defined order, sort by that order
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // If only A is in the order, it comes first
        if (indexA !== -1) {
          return -1;
        }
        // If only B is in the order, it comes first
        if (indexB !== -1) {
          return 1;
        }
        // If neither is in the order, sort them alphabetically relative to each other
        return upperA.localeCompare(upperB);
      };
      return allSelectedNames.sort(customSort);

    } catch (error) {
      console.error("Error getting club names from golf bag:", error);
      return [];
    }
  }, [golfBag]);

  const handleClickHoleByHole = () => {
    setOpenHoleByHole(!openHoleByHole);
  }

  const handleClickDistances = () => {
    setOpenDistances(!openDistances);
  }

  const isLoading = isLoadingRound || isLoadingPlayer;

  if (!!isLoading) {
    return <Spinner />
  }

  if (error) {
    return <Typography color='error'>
      Error loading round details: {error}
    </Typography>
  }

  if (!player || !golfBag) {
    return <Typography>Loading player data or golf bag missing...</Typography>;
  }

  if (!round) {
    return <EmptyRounds />
  }

  return (
    <BoxBetween sx={{ width: '100%', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <RoundsDataHeader round={round} />
        {allClubNamesFromBag.length > 0 && (
          <DistancesTotals distances={round.distances} />
        )}
      </Box>

      {/* Round Distances Section - Render if there are clubs in the bag */}
      {allClubNamesFromBag.length > 0 && (
        <Stack sx={{ width: '100%' }}>
          <Header title={'Round Distances (Avg)'} onClick={handleClickDistances} />
          {isMobile ? (
            <Paper sx={{ padding: 2, display: openDistances ? 'block' : 'none' }}>
              <Stack spacing={1}>
                {/* Iterate over ALL clubs from the bag */}
                {allClubNamesFromBag.map((clubName) => {
                  // Look up the average distance for THIS round
                  const avgDistance = roundDistanceMap.get(clubName);
                  const displayDistance = avgDistance !== undefined ? `${avgDistance} m.` : 'N.R.';
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
                      <Typography>{displayDistance}</Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Paper>
          ) : (
            <TableContainer component={Paper} sx={{ width: '100%', display: openDistances ? 'block' : 'none' }}>
              <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label='round average distances table'>
                <TableHead>
                  <TableRow>
                    {/* Iterate over ALL clubs from the bag for headers */}
                    {allClubNamesFromBag.map((clubName) => (
                      <TableCell align='center' space='10px' key={`header-${clubName}`}>
                        {clubName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {/* Iterate over ALL clubs from the bag for data */}
                    {allClubNamesFromBag.map((clubName) => {
                      // Look up the average distance for THIS round
                      const avgDistance = roundDistanceMap.get(clubName);
                      const displayDistance = avgDistance !== undefined ? `${avgDistance} m.` : 'N.R.';
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
      )}
      {/* End Round Distances Section */}

      {/* Overall Round Totals/Statistics */}
      {round.totals && <HolebyHoleTotals roundTotals={round.totals} par={Number(round.roundPar)} />}

      {/* Hole by Hole Table Toggle */}
      <Button variant='text' onClick={handleClickHoleByHole} sx={{ alignSelf: 'flex-start' }}>
        {openHoleByHole ? 'Hide hole by hole data' : 'Show hole by hole data'}
        {openHoleByHole ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>

      {/* Hole by Hole Table */}
      {round.holes && round.holes.length > 0 && openHoleByHole && <HolebyHoleTable holes={round.holes} />}
    </BoxBetween>
  )
}

export default RoundsDataMain
