import { clearRoundDetails, getRoundDetails } from '@/features/round/roundDetails.slice';
import { RootState } from '@/store/store';
import BoxBetween from '@/styles/box/BoxBetween.styles';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import EmptyRounds from '../Dashboard/components/EmptyRounds/EmptyRounds.component';
import HolebyHoleTable from '../NewRound/HolebyHoleTable.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import RoundsDataHeader from './components/roundData/RoundsDataHeader.component';

const RoundsDataMain = () => {
  const params = useParams<{ roundID: string }>();
  const dispatch = useDispatch<any>();
  const playerId = readUserLocalStorage();

  const { round, isLoading, error } = useSelector((store: RootState) => store.roundDetails);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (params.roundID && playerId) {
      dispatch(getRoundDetails({ playerId, roundId: params.roundID }));
    }
    return () => {
      dispatch(clearRoundDetails());
    }
  }, [dispatch, params.roundID, playerId]);

  const handleClick = () => {
    setOpen(!open);
  }

  if (!!isLoading) {
    return <Spinner />
  }

  if (error) {
    return <Typography color='error'>
      Error loading round details: {error}
    </Typography>
  }

  if (!round) {
    return <EmptyRounds />
  }

  return (
    <BoxBetween sx={{ width: '100%' }}>
      <RoundsDataHeader round={round} />

      {round.totals && <HolebyHoleTotals roundTotals={round.totals} par={Number(round.roundPar)} />}

      <Button variant='link' onClick={handleClick}>
        {!!open
          ? 'Hide hole by hole statistics'
          : 'Show hole by hole statistics'
        }
        {!!open
          ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
          : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        }
      </Button>

      {(round.holes && round.holes.length > 0 && open) && <HolebyHoleTable holes={round.holes} />}
    </BoxBetween>
  )
}

export default RoundsDataMain
