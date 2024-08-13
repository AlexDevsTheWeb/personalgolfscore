import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllRounds } from '../../features/rounds/rounds.slice';
import { RootState } from '../../store/store';
import { BoxOverflow } from '../../styles';
import RoundsTable from './RoundsTable.component';

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

    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <BoxOverflow direction='horizontal' variant='table'>
        <RoundsTable />
      </BoxOverflow>
      <Button
        variant='contained'
        onClick={handleAddNewRound}
      >
        Add new round
      </Button>
    </Box>

  )
}

export default Rounds
