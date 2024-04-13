import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoundsDataMain from '../components/RoundsData/RoundsDataMain.component';
import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { RootState } from '../store/store';
import { Typography } from '../styles';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';

const RoundsData = () => {
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, [dispatch]);

  if (!!isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
