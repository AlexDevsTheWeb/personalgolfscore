import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '@mui/material';
import { getAllRounds } from '../../features/rounds/rounds.slice';
import { RootState } from '../../store/store';
import { BoxPlayer } from '../../styles';
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
    <BoxPlayer>
      <RoundsTable />
    </BoxPlayer>
  )
}

export default Rounds
