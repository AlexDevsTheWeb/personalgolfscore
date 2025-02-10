import { RootState } from '@/store/store';
import BoxBetween from '@/styles/box/BoxBetween.styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import EmptyRounds from '../Dashboard/components/EmptyRounds/EmptyRounds.component';
import HolebyHoleTable from '../NewRound/HolebyHoleTable.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import RoundsDataHeader from './components/roundData/RoundsDataHeader.component';

const RoundsDataMain = () => {
  const params = useParams();
  const { rounds, isLoading } = useSelector((store: RootState) => store.rounds);
  const [open, setOpen] = useState<boolean>(false);
  const round = rounds.filter((r) => {
    return r.general.roundID === Number(params.roundID)
  }).pop();

  if (!!isLoading) {
    return <Spinner />
  }

  if (!round) {
    return <EmptyRounds />
  }

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <BoxBetween sx={{ width: '100%' }}>
      <RoundsDataHeader round={round} />

      {round.holes.length > 0 && <HolebyHoleTotals roundTotals={round.totals} par={round.general.coursePar} />}


      <Button variant='link' onClick={handleClick}>{!!open ? 'Hide hole by hole statistics' : 'Show hole by hole statistics'} {!!open ? <KeyboardArrowUpIcon></KeyboardArrowUpIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>}</Button>
      {(round.holes.length > 0 && !!open) && <HolebyHoleTable holes={round.holes} />}
    </BoxBetween>
  )
}

export default RoundsDataMain
