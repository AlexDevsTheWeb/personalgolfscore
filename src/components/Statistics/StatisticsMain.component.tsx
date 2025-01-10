import { IRoundTotals } from '@/types/roundTotals.types';
import { initialStateRoundTotals } from '@/utils/constant.utils';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const StatisticsMain = () => {

  const dispatch = useDispatch<any>();
  // const { roundsTotals: { roundsTotals } } = useSelector((store: RootState) => store.roundsNumber);
  const [newTotals, setNewTotals] = useState<IRoundTotals>(initialStateRoundTotals);
  const uid = readUserLocalStorage();


  // if (roundsTotals.roundsTotals.length === 1) {
  //   return <Spinner />
  // }

  // console.log("STATISTICS MAIN AFTER ALL: ", roundsTotals.roundsTotals)

  return (
    // <HolebyHoleTotals roundTotals={newTotals} dashboard={true} />
    <></>
  )
}

export default StatisticsMain