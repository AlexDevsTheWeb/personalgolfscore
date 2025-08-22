import Spinner from '@/components/common/spinner/Spinner.component';
import RoundsDataMain from '@/components/RoundsData/RoundsDataMain.component';
import { getPlayerDetails } from '@/features/player/player.slice';
import { RootState } from '@/store/store';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RoundsData = () => {

  const dispatch = useDispatch<any>();

  const { rounds } = useSelector((store: RootState) => store.rounds);
  const uid = readUserLocalStorage();

  useEffect(() => {
    if (rounds.length === 0) {
      dispatch(getPlayerDetails(uid));
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
