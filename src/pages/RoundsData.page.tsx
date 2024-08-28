import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoundsDataMain from '../components/RoundsData/RoundsDataMain.component';
import { getSingleRoundHoles } from '../features/round/roundHoles.slice';
import { getSingleRoundTotals } from '../features/round/roundTotals.slice';
import { getAllRounds } from '../features/rounds/rounds.slice';
import { RootState } from '../store/store';

const RoundsData = () => {
  const dispatch = useDispatch<any>();
  const params = useParams();

  const { roundHoles: { holes } } = useSelector((store: RootState) => store.singleRound);

  useEffect(() => {
    if (holes.length === 0) {
      dispatch(getAllRounds(""));
      dispatch(getSingleRoundHoles(params.roundID));
      dispatch(getSingleRoundTotals(params.roundID));
    }
  }, [params.roundID, holes, dispatch]);

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
