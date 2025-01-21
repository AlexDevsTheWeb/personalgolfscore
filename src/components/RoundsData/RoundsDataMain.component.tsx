import { RootState } from '@/store/store';
import BoxBetween from '@/styles/box/BoxBetween.styles';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner.component';
import RoundsDataHeader from './components/roundData/RoundsDataHeader.component';

const RoundsDataMain = () => {
  const params = useParams();
  const { rounds, isLoading } = useSelector((store: RootState) => store.rounds);

  const round = rounds.filter((r) => {
    return r.general.roundID === Number(params.roundID)
  }).pop();

  if (!!isLoading) {
    return <Spinner />
  }

  if (!round) {
    return <Typography>No data to display...</Typography>
  }

  return (
    <BoxBetween sx={{ width: '100%' }}>
      <RoundsDataHeader round={round} />

      {/* {round.holes.length > 0 && <HolebyHoleTotals roundTotals={round.totals} />} */}
      {/* {round.holes.length > 0 && <HolebyHoleTable holes={round.holes} />} */}
    </BoxBetween>
  )
}

export default RoundsDataMain
