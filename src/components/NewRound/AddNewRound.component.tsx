
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../features/golfBag/golfBag.slice';
import { RootState } from '../../store/store';
import StackNewHole from '../../styles/stack/StackNewHole.styles';
import AddNewRoundHoles from './AddNewRoundHoles.component';
import AddNewRoundJson from './AddNewRoundJson.component';

const NewRoundMain = () => {
  const dispatch = useDispatch<any>();
  const { clubs } = useSelector((store: RootState) => store.golfBag);

  useEffect(() => {
    if (clubs.types.length === 0) {
      dispatch(getClubsDetails(""));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StackNewHole>
      <AddNewRoundJson />
      <AddNewRoundHoles />
    </StackNewHole>
  )
}

export default NewRoundMain
