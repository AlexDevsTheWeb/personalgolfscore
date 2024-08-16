import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoundsDataMain from '../components/RoundsData/RoundsDataMain.component';
import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';
import { RootState } from '../store/store';
import { getAllRounds } from '../features/rounds/rounds.slice';

const RoundsData = () => {
  const dispatch = useDispatch<any>();
  const params = useParams();

  const { rounds } = useSelector((store: RootState) => store.rounds);

  useEffect(() => {
    if (rounds.length === 0) {
      dispatch(getAllRounds(""));
      dispatch(getAllRoundsData(params.roundID));
      dispatch(getAllRoundsTotals(""));
    }
  }, [params.roundID, rounds.length, dispatch]);

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
