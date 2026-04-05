import Spinner from '@/components/common/spinner/Spinner.component';
import RoundsDataMain from '@/components/RoundsData/RoundsDataMain.component';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { useEffect } from 'react';
import { useRoundsStore } from '@/store/zustand';
import { usePlayerStore } from '@/store/zustand';

const RoundsData = () => {

  const rounds = useRoundsStore((state) => state.rounds);
  const getPlayerDetails = usePlayerStore((state) => state.getPlayerDetails);
  const uid = readUserLocalStorage();

  useEffect(() => {
    if (rounds.length === 0 && uid) {
      getPlayerDetails(uid);
    }
  }, [rounds, uid, getPlayerDetails]);

  if (rounds.length === 0) {
    return <Spinner />
  }

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
