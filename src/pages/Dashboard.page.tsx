import { useDispatch } from 'react-redux';

import { getAllRoundsData } from '../features/rounds/roundsData.slice';
import { getAllRoundsTotals } from '../features/rounds/roundsTotals.slice';

import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Player from '../components/Player/Player.component';
import Rounds from '../components/Rounds/Rounds.component';
import BoxBetween from '../styles/box/BoxBetween.styles';

const Dashboard = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }
  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, [dispatch]);

  return (
    <BoxBetween vertical={false}>
      <Player />
      <Rounds />
      <BoxBetween vertical={false}>
        <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
      </BoxBetween>
    </BoxBetween>
  )
}

export default Dashboard
