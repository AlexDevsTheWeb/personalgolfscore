import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import BoxBetween from '@/styles/box/BoxBetween.styles';
import { CLUB_SORT_ORDER } from '@/utils/constant.utils';
import { getClubsNames } from '@/utils/round/round.utils';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import EmptyRounds from '../Dashboard/components/EmptyRounds/EmptyRounds.component';
import HolebyHoleTable from '../NewRound/HolebyHoleTable.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import RoundsDataHeader from './components/roundData/RoundsDataHeader.component';
import { useAppStore } from '@/store/zustand';

const RoundsDataMain = () => {
  const params = useParams<{ roundID: string }>();
  const playerId = readUserLocalStorage();

  const roundDetailsData = useAppStore((state) => state.roundDetailsData);
  const isLoadingRoundDetails = useAppStore((state) => state.isLoadingRoundDetails);
  const roundDetailsError = useAppStore((state) => state.roundDetailsError);
  const getRoundDetails = useAppStore((state) => state.getRoundDetails);
  const clearRoundDetails = useAppStore((state) => state.clearRoundDetails);
  
  const { player, isLoadingPlayer } = useAppStore();
  const golfBag = player?.golfBag;

  const [openHoleByHole, setOpenHoleByHole] = useState<boolean>(false);
  const [openFullStatistics, setOpenFullStatistics] = useState<boolean>(true);

  useEffect(() => {
    if (params.roundID && playerId) {
      getRoundDetails(playerId, params.roundID);
    }
    return () => {
      clearRoundDetails();
    }
  }, [params.roundID, playerId]);

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

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) {
          return -1;
        }
        if (indexB !== -1) {
          return 1;
        }
        return upperA.localeCompare(upperB);
      };
      return allSelectedNames.sort(customSort);

    } catch (error) {
      console.error("Error getting club names from golf bag:", error);
      return [];
    }
  }, [golfBag]);

  const handleClickDetails = (e: any) => {
    switch (e.target.name) {
      case 'holeByHole':
        if (openFullStatistics) {
          setOpenFullStatistics(false);
        }
        setOpenHoleByHole(!openHoleByHole);
        break;
      case 'statistics':
        if (openHoleByHole) {
          setOpenHoleByHole(false);
        }
        setOpenFullStatistics(!openFullStatistics);
        break;
    }
  }

  const isLoading = isLoadingRoundDetails || isLoadingPlayer;
  const { isMobile } = useDeviceDetection();

  if (!!isLoading) {
    return <Spinner />
  }

  if (roundDetailsError) {
    return <Typography color='error'>
      Error loading round details: {roundDetailsError}
    </Typography>
  }

  if (!player || !golfBag) {
    return <Typography>Loading player data or golf bag missing...</Typography>;
  }

  if (!roundDetailsData) {
    return <EmptyRounds />
  }

  return (
    <BoxBetween sx={{ width: '100%', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <RoundsDataHeader round={roundDetailsData} />
        {allClubNamesFromBag.length > 0 && (
          <></>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, width: '100%', justifyContent: 'space-between' }}>
        <Button variant='text' name='statistics' onClick={(e: any) => handleClickDetails(e)} sx={{ alignSelf: 'flex-start' }}>
          {openFullStatistics ? 'Hide full statistics' : 'Show full statistics'}
          {openFullStatistics ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
        <Button variant='text' name='holeByHole' onClick={(e: any) => handleClickDetails(e)} sx={{ alignSelf: 'flex-start' }}>
          {openHoleByHole ? 'Hide hole by hole data' : 'Show hole by hole data'}
          {openHoleByHole ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
      </Box>

      {roundDetailsData.totals && openFullStatistics && <HolebyHoleTotals roundTotals={roundDetailsData.totals} par={Number(roundDetailsData.roundPar)} />}

      {roundDetailsData.holes && roundDetailsData.holes.length > 0 && openHoleByHole && <HolebyHoleTable holes={roundDetailsData.holes} />}
    </BoxBetween >
  )
}

export default RoundsDataMain
