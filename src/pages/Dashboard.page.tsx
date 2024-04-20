import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';

import Player from '../components/Player/Player.component'
import Rounds from '../components/Rounds/Rounds.component'
import Statistics from '../components/Statistics/Statistics.component';

const Dashboard = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Player />
      <Statistics />
      <Rounds />
    </>
  )
}

export default Dashboard
