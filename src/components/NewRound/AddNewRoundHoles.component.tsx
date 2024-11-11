import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeeGreenClubs } from '../../features/golfBag/golfBag.slice';
import { resetSetFirstHole } from '../../features/newRound/newRoundMain.slice';
import { setTotalsByHole } from '../../features/newRound/newRoundTotals.slice';
import { RootState } from '../../store/store';
import { getChipClubs, getClubsNames, getGreenClubs } from '../../utils/round/round.utils';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import AddSingleHole from './AddSingleHole.component';
import HolebyHoleTable from './Components/HolebyHoleTable.component';
import RoundSave from './Components/RoundSave.component';
// import HolebyHoleTable from './Components/HolebyHoleTable.component';

const AddNewRoundHoles = () => {
  const dispatch = useDispatch<any>();
  const { setFirstHole, round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holes } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { clubs } = useSelector((store: RootState) => store.golfBag);

  const [holeForm, setHoleForm] = useState<any>();

  useEffect(() => {
    const updatedTeeClubs = getClubsNames(clubs);
    const updatedGreenClubs = getGreenClubs(updatedTeeClubs);
    const updatedChipClubs = getChipClubs(updatedTeeClubs);
    dispatch(updateTeeGreenClubs({ updatedTeeClubs, type: 'tee' }));
    dispatch(updateTeeGreenClubs({ updatedGreenClubs, type: 'green' }));
    dispatch(updateTeeGreenClubs({ updatedChipClubs, type: 'chip' }));
  }, [clubs, dispatch]);

  useEffect(() => {
    if (!!setFirstHole) {
      setHoleForm(<AddSingleHole />);
      dispatch(resetSetFirstHole());
    }
  }, [setFirstHole, dispatch]);

  useEffect(() => {
    if (holes.length > 0) {
      dispatch(setTotalsByHole({ holes }));
    }
  }, [holes, dispatch])

  return (
    <>
      {holeForm}
      {holes.length > 0 && <HolebyHoleTotals />}
      {holes.length > 0 && <HolebyHoleTable holes={holes} />}
      {(holes.length !== 0 && holes.length === round.roundHoles) && <RoundSave />}
    </>
  )
}

export default AddNewRoundHoles

