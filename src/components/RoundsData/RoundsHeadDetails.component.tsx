import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { IRounds } from '../../types/round.types';
import { Box } from '@mui/material';
import { RowCard } from '../../styles';

const RoundsHeadDetails = () => {
  const params = useParams();
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const round = rounds.filter((r) => r.roundID === params.roundID);

  return (
    <Box>
      {
        round.map((r: IRounds) => {
          const { roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundShots } = r;
          return (
            <>
              <RowCard label='Course' value={roundCourse} name='Course' />
              <RowCard label='Date' value={roundDate} name='Date' />
              <RowCard label='Tee' value={roundTee} name='Tee' />
              <RowCard label='Holes' value={roundHoles.toString()} name='Holes' />
              <RowCard label='Par' value={roundPar.toString()} name='Par' />
              <RowCard label='Player HCP' value={roundPlayingHCP.toString()} name='Player HCP' />
              <RowCard label='Shots' value={roundShots.toString()} name='Shots' />
            </>
          )
        })
      }
    </Box>
  )
}

export default RoundsHeadDetails