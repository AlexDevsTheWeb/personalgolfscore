import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { IRounds } from '../../types/round.types';
import { Grid } from '@mui/material';
import { BoxPlayer, RowCard } from '../../styles';

const RoundsHeadDetails = () => {
  const params = useParams();
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const round = rounds.filter((r) => r.roundID === params.roundID);

  return (
    <BoxPlayer>
      <Grid container spacing={0}>
        {
          round.map((r: IRounds) => {
            const { roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundStrokes } = r;
            return (
              <Grid item md={10} key={r.roundID} sx={{ flexGrow: 1, flexBasis: '100% !important', width: '100% !important', maxWidth: '100% !important' }}>
                <RowCard label='Course' value={roundCourse} name='Course' head={true} />
                <RowCard label='Date' value={roundDate} name='Date' head={true} />
                <RowCard label='Tee' value={roundTee} name='Tee' head={true} />
                <RowCard label='Holes' value={roundHoles.toString()} name='Holes' head={true} />
                <RowCard label='Par' value={roundPar.toString()} name='Par' head={true} />
                <RowCard label='Player HCP' value={roundPlayingHCP.toString()} name='Player HCP' head={true} />
                <RowCard label='Strokes' value={roundStrokes.toString()} name='Strokes' head={true} />
              </Grid>
            )
          })
        }

      </Grid>
    </BoxPlayer>
  )
}

export default RoundsHeadDetails