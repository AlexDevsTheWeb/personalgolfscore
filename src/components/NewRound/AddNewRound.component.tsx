
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubsDetails } from '../../features/golfBag/golfBag.slice';
import { useTotals } from '../../hooks/useNewRoundTotals.hook';
import { RootState } from '../../store/store';
import { Stack } from '../../styles';
import AddNewRoundHoles from './AddNewRoundHoles.component';
import AddNewRoundJson from './AddNewRoundJson.component';

const NewRoundMain = () => {
  const dispatch = useDispatch<any>();
  const { clubs } = useSelector((store: RootState) => store.golfBag);
  useTotals();
  useEffect(() => {
    if (clubs.types.length === 0) {
      dispatch(getClubsDetails(""));
    }
    // eslint-disable-next-line
  }, []);


  return (
    <Stack sx={{ rowGap: 3 }}>
      <AddNewRoundJson />
      {/* <AddNewRoundMain /> */}
      <AddNewRoundHoles />
    </Stack>

  )
}

export default NewRoundMain
