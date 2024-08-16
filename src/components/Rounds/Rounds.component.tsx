import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Typography } from '@mui/material';
import { getAllRounds } from '../../features/rounds/rounds.slice';
import { RootState } from '../../store/store';
import RoundsTable from './RoundsTable.component';
import { useNavigate } from 'react-router-dom';

const Rounds = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((store: RootState) => store.rounds);

  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }
  useEffect(() => {
    dispatch(getAllRounds(""))
  }, [dispatch]);

  if (!!isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', rowGap: 1.175
    }}>
      <RoundsTable />
      <Button variant='contained' sx={{ width: '22%' }} onClick={handleAddNewRound}>Add new round</Button>
    </Box>
  )
}

export default Rounds
