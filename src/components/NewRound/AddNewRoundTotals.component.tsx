import { useTotals } from '../../hooks/useNewRoundTotals.hook';
import { BoxNewRound } from '../../styles';

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
  const totals = useTotals();

  return (
    <BoxNewRound>

      {/* <RoundsDataShotsTotals totals={totals} /> */}
    </BoxNewRound>
  )
}

export default AddNewRoundTotals
