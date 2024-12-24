import { getAllRoundsTotals } from '@/features/rounds/roundsTotals.slice';
import { RootState } from '@/store/store';
import { IRoundTotals } from '@/types/roundTotals.types';
import { allRoundsCalculator } from '@/utils/calculator/AllRoundsCalculator.utils';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';

const StatisticsMain = () => {

  const dispatch = useDispatch<any>();
  const { roundsTotals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals.roundsTotals);
  const [newTotals, setNewTotals] = useState<IRoundTotals>(initialStateRoundTotals);
  useEffect(() => {
    if (roundsTotals.length < 1) {
      dispatch(getAllRoundsTotals(""));
    }
    else {
      setNewTotals(allRoundsCalculator(roundsTotals));
    }
  }, [roundsTotals, dispatch]);

  return (
    <HolebyHoleTotals roundTotals={newTotals} dashboard={true} />
  )
}

export default StatisticsMain