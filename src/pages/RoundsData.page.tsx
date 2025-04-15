import Spinner from '@/components/common/spinner/Spinner.component';
import { getAllRounds } from '@/features/rounds/rounds.slice';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoundsDataMain from '../components/RoundsData/RoundsDataMain.component';
import { RootState } from '../store/store';

const RoundsData = () => {
  const dispatch = useDispatch<any>();

  const { rounds } = useSelector((store: RootState) => store.rounds);
  const uid = readUserLocalStorage();

  useEffect(() => {
    if (rounds.length === 0) {
      dispatch(getAllRounds(uid));
    }
  }, [rounds])

  if (rounds.length === 0) {
    return <Spinner />
  }

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
