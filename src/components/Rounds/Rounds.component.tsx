import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllRounds } from '@/features/rounds/rounds.slice';
import { RootState } from '@/store/store';
import { Box, Typography } from '@mui/material';
import { BoxOverflow } from '../../styles';
import RoundsTable from './RoundsTable.component';

const Rounds = () => {

  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((store: RootState) => store.rounds);

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
    </Box>

  )
}

export default Rounds
