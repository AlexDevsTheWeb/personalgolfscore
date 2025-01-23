import { RootState } from '@/store/store';
import BoxBetween from '@/styles/box/BoxBetween.styles';
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

  const round = rounds.filter((r) => {
    return r.general.roundID === Number(params.roundID)
  }).pop();

  if (!!isLoading) {
    return <Spinner />
  }

  if (!round) {
    return <EmptyRounds />
  }

  return (
    <BoxBetween sx={{ width: '100%' }}>
      <RoundsDataHeader round={round} />

      {round.holes.length > 0 && <HolebyHoleTotals roundTotals={round.totals} par={round.general.coursePar} />}
      {round.holes.length > 0 && <HolebyHoleTable holes={round.holes} />}
    </BoxBetween>
  )
}

export default RoundsDataMain
