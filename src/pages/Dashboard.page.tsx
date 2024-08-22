import { useDispatch } from 'react-redux';

import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';

import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Player from '../components/Player/Player.component';
import Rounds from '../components/Rounds/Rounds.component';

const Dashboard = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, [dispatch]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', rowGap: 1.175
    }}>
      <Player />

      <Rounds />
      <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
    </Box>
  )
}

export default Dashboard
