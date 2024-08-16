import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { BoxNewRound } from '../../styles';
import RoundsDataShotsTotals from '../RoundsData/RoundsDataShotsTotals.component';

// FIXME: round totals are not automatically calculated!

// const initialState: InitialStateNewRoundsTotals = {
//   isLoading: false,
//   playerID: "",
//   totals: {
//     roundID: '',
//     holeNumber: 0,
//     distance: 0,
//     hcp: 0,
//     par: 0,
//     strokes: 0,
//     points: 0,
//     teeClub: '',
//     fir: 0,
//     left: 0,
//     right: 0,
//     gir: 0,
//     putts: 0,
//     sand: 0,
//     water: 0,
//     out: 0,
//   },
// }

const AddNewRoundTotals = () => {
  const { roundHoles } = useSelector((store: RootState) => store.newRound.newRoundMain.round);
  const { totals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  let newTotals = [];
  newTotals.push(totals);

  return (
    <BoxNewRound>
      <Typography>{`Totals ${roundHoles !== 0 ? roundHoles : ''}`}</Typography>
      <RoundsDataShotsTotals totals={newTotals} />
    </BoxNewRound>
  )
}

export default AddNewRoundTotals
