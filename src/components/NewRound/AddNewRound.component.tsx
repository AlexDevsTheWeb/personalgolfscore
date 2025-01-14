
import { getClubsDetails } from '@/features/golfBag/golfBag.slice';
import { RootState } from '@/store/store';
import StackNewHole from '@/styles/stack/StackNewHole.styles';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddNewRoundForm from './AddNewRoundForm.component';
import AddNewRoundHoles from './AddNewRoundHoles.component';

const NewRoundMain = () => {
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
    <StackNewHole>
      <AddNewRoundForm />
      <AddNewRoundHoles />
    </StackNewHole>
  )
}

export default NewRoundMain
