import Spinner from '@/components/common/spinner/Spinner.component';
import RoundsDataMain from '@/components/RoundsData/RoundsDataMain.component';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { useEffect } from 'react';
import { useAppStore } from '@/store/zustand';

const RoundsData = () => {

  const roundsList = useAppStore((state) => state.roundsList);
  const getPlayerDetails = useAppStore((state) => state.getPlayerDetails);
  const uid = readUserLocalStorage();

  useEffect(() => {
    if (roundsList.length === 0 && uid) {
      getPlayerDetails(uid);
    }
  }, [roundsList, uid, getPlayerDetails]);

  if (roundsList.length === 0) {
    return <Spinner />
  }

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
