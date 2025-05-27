import { useDispatch, useSelector } from 'react-redux';

import { resetSetFirstHole } from '@/features/newRound/newRoundMain.slice';
import { RootState } from '@/store/store';
import BoxBetween from '@/styles/box/BoxBetween.styles';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxOverflow } from '../../styles';
import Spinner from '../common/spinner/Spinner.component';
import RoundsTable from './RoundsTable.component';

const Rounds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((store: RootState) => store.rounds);

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    dispatch(resetSetFirstHole());
    navigate('/addNewRound')
  }

  if (!!isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <BoxOverflow direction='horizontal' variant='table'>
        <RoundsTable />
        <BoxBetween sx={{ mt: 0, gap: 0 }}> {/* Added padding for buttons on smaller screens */}
          <Button
            variant='contained'
            onClick={handleAddNewRound}
          >
            Add Another Round
          </Button>
          <Button
            variant='contained'
            onClick={handleClickStatistic}
          >
            View Full Statistics
          </Button>
        </BoxBetween>
      </BoxOverflow>
    </Box>

  )
}

export default Rounds
