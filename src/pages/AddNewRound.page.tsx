import { getClubsDetails } from '@/features/golfBag/golfBag.slice';
import { RootState } from '@/store/store';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewRoundMain from '../components/NewRound/AddNewRound.component';

const AddNewRound = () => {
  const dispatch = useDispatch<any>();
  const { clubs } = useSelector((store: RootState) => store.golfBag);
  const uid = readUserLocalStorage();
  const auth = getAuth();


  useEffect(() => {
    if (clubs.types.length === 0) {
      if (auth) {
        dispatch(getClubsDetails(uid));
      }

    }
    // eslint-disable-next-line
  }, []);


  return (
    <NewRoundMain />
  )
}

export default AddNewRound


