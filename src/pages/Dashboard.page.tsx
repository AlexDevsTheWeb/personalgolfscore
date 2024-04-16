import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';

import Player from '../components/Player/Player.component'
import Rounds from '../components/Rounds/Rounds.component'

const Dashboard = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, [dispatch]);

  return (
    <>
      <Player />
      <Rounds />
    </>
  )
}

export default Dashboard
