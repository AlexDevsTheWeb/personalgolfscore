import { Typography } from '@mui/material'
import { BoxNewRound } from '../../styles'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import RoundsDataShotsTotals from '../RoundsData/RoundsDataShotsTotals.component';
import { useEffect, useState } from 'react';
import { newRoundTotals } from '../../utils/shots/shots.utils';
import { setNewTotal } from '../../features/newRound/newRoundTotals.slice';
import { InitialStateNewRoundsTotals } from '../../types/roundTotals.types';

const initialState: InitialStateNewRoundsTotals = {
  isLoading: false,
  playerID: "",
  totals: {
    roundID: '',
    holeNumber: 0,
    distance: 0,
    hcp: 0,
    par: 0,
    strokes: 0,
    points: 0,
    teeClub: '',
    fir: 0,
    left: 0,
    right: 0,
    gir: 0,
    putts: 0,
    sand: 0,
    water: 0,
    out: 0,
  },
}

const AddNewRoundTotals = () => {
  const dispatch = useDispatch();
  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { totals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const [totalX, setTotalX] = useState(initialState);
  let newTotals = [];
  newTotals.push(totals);

  useEffect(() => {
    const x = newRoundTotals(shots);
  }, [shots])
  return (
    <BoxNewRound>
      <Typography>{`Totals ${roundHoles !== 0 ? roundHoles : ''}`}</Typography>
      <RoundsDataShotsTotals totals={newTotals} />
    </BoxNewRound>
  )
}

export default AddNewRoundTotals
