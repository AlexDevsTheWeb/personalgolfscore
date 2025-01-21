import { RootState } from '@/store/store';
import { IRoundTotals } from '@/types/roundTotals.types';
import { allRoundsCalculator } from '@/utils/calculator/AllRoundsCalculator.utils';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';

const StatisticsMain = () => {
  const { roundsTotals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const [newTotals, setNewTotals] = useState<IRoundTotals>(initialStateRoundTotals);

  useEffect(() => {
    if (roundsTotals.length > 0) {
      setNewTotals(allRoundsCalculator(roundsTotals));
    }
  }, [roundsTotals]);

  if (roundsTotals.length === 0) {
    return <Spinner />
  }

  return (
    <HolebyHoleTotals roundTotals={newTotals} dashboard={true} />
  )
}

export default StatisticsMain