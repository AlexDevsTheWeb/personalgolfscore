import { RootState } from '@/store/store';
import { IRoundTotals } from '@/types/roundTotals.types';
import { allRoundsCalculator } from '@/utils/calculator/AllRoundsCalculator.utils';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';

const StatisticsMain = () => {

  const { roundsTotals: { roundsTotals } } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const [newTotals, setNewTotals] = useState<IRoundTotals>(initialStateRoundTotals);



  if (!_.isEmpty(roundsTotals) && roundsTotals.length === 1) {
    return <Spinner />
  }



  useEffect(() => {
    setNewTotals(allRoundsCalculator(roundsTotals));
  }, [roundsTotals]);

  return (
    <HolebyHoleTotals roundTotals={newTotals} dashboard={true} />
  )
}

export default StatisticsMain