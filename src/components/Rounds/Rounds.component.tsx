import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { Box } from '@mui/material';
import { BoxOverflow } from '../../styles';
import Spinner from '../common/spinner/Spinner.component';
import RoundsTable from './RoundsTable.component';

const Rounds = () => {
  const { isLoading } = useSelector((store: RootState) => store.rounds);

  if (!!isLoading) {
    return <Spinner />
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
