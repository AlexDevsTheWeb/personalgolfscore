import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';

import { Box } from '@mui/material';
import Player from '../components/Player/Player.component';
import Rounds from '../components/Rounds/Rounds.component';
import Statistics from '../components/Statistics/Statistics.component';

const Dashboard = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, [dispatch]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', rowGap: 1.175
    }}>
      <Player />
      <Statistics />
      <Rounds />
    </Box>
  )
}

export default Dashboard
