import { resetSetFirstHole } from '@/features/newRound/newRoundMain.slice';
import { setTotalsByHole } from '@/features/newRound/newRoundTotals.slice';
import { RootState } from '@/store/store';
import { getChipClubs, getClubsNames, getDistanceClubs, getGreenClubs } from '@/utils/round/round.utils';
import { Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/spinner/Spinner.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import AddSingleHole from './AddSingleHole.component';
import HolebyHoleTable from './HolebyHoleTable.component';
import RoundSave from './RoundSave.component';

const AddNewRoundHoles = () => {
  const dispatch = useDispatch<any>();
  const { setFirstHole, round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holes } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { player, isLoading } = useSelector((store: RootState) => store.player);

  const golfBag = player?.golfBag;

  console.log("golfBag -> ", player);

  const [holeForm, setHoleForm] = useState<React.ReactNode | undefined>();

  const derivedClubs = useMemo(() => {
    if (!golfBag || golfBag.length === 0) {
      return { teeClubs: [], distanceClubs: [], greenClubs: [], chipClubs: [] };
    }
    const teeClubNames = getClubsNames(golfBag);
    const distanceClubs = getDistanceClubs(teeClubNames);
    const greenClubs = getGreenClubs(teeClubNames);
    const chipClubs = getChipClubs(teeClubNames);

    return { teeClubs: teeClubNames, distanceClubs, greenClubs, chipClubs };
  }, [golfBag]);

  useEffect(() => {
    if (!!setFirstHole) {
      setHoleForm(<AddSingleHole derivedClubs={derivedClubs} />);
      dispatch(resetSetFirstHole());
    }
  }, [setFirstHole, dispatch, derivedClubs]);

  useEffect(() => {
    if (holes.length > 0) {
      dispatch(setTotalsByHole({ holes }));
    }
  }, [holes, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!player || !golfBag) {
    return <Typography>Player data or golf bag not loaded.</Typography>
  }
  if (golfBag.length === 0) {
    return <Typography>No clubs found in your golf bag. Please add clubs first.</Typography>
  }

  return (
    <>
      {holeForm}
      {holes.length > 0 && roundTotals &&
        <HolebyHoleTotals roundTotals={roundTotals} par={Number(round.roundPar)} />
      }
      {holes.length > 0 && <HolebyHoleTable holes={holes} />}
      {(holes.length !== 0 && holes.length === round.roundHoles) && <RoundSave />}
    </>
  )
}

export default AddNewRoundHoles

