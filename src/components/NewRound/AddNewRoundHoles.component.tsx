import { resetNewRoundHoleTmp } from '@/features/hole/holeTmp.slice';
import { setNewRoundClubs } from '@/features/newRound/newRoundClubs.slice';
import { resetNewRoundsMain } from '@/features/newRound/newRoundMain.slice';
import { setTotalsByHole } from '@/features/newRound/newRoundTotals.slice';
import { RootState } from '@/store/store';
import { getChipClubs, getClubsNames, getDistanceClubs, getGreenClubs } from '@/utils/round/round.utils';
import { Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import AddSingleHole from './AddSingleHole.component';
import RoundSave from './RoundSave.component';

const AddNewRoundHoles = () => {
  const dispatch = useDispatch<any>();
  const { round, setFirstHole } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { player, isLoading: isPlayerLoading } = useSelector((store: RootState) => store.player);
  const { isLoading: isSavingRound, success: isRoundSaved, roundId: savedRoundId } = useSelector((store: RootState) => store.roundSaver);

  const golfBag = player?.golfBag;
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

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setNewRoundClubs(derivedClubs));
  }, [derivedClubs]);
  useEffect(() => {
    if (holes.length > 0) {
      dispatch(setTotalsByHole({ holes }));
    }
  }, [holes, dispatch]);

  useEffect(() => {
    if (isRoundSaved && savedRoundId) {
      // 1. Reset the relevant parts of the Redux store for the new round form
      dispatch(resetNewRoundsMain()); // Resets round date, course, par, etc.
      dispatch(resetNewRoundHoleTmp());  // Resets temporary hole data
      // dispatch(resetNewRoundHoles()); // Hypothetical: Resets the array of holes for the current new round
      // dispatch(resetNewRoundTotals());// Hypothetical: Resets totals calculated for the current new round

      // 2. Redirect the user
      navigate(`/round/${savedRoundId}`); // Redirect to the newly saved round's detail page
    }
  }, [isRoundSaved, savedRoundId, dispatch, navigate]);

  if (!setFirstHole) {
    return null;
  }
  const moreHolesToPlay = holesCompleted < round.roundHoles;
  if (isPlayerLoading && !player) {
    return <Spinner />;
  }
  if (isSavingRound) {
    return <Spinner />;
  }
  if (!player || !golfBag) {
    return <Typography>Player data or golf bag not loaded.</Typography>
  }
  if (golfBag.length === 0) {
    return <Typography>No clubs found in your golf bag. Please add clubs first.</Typography>
  }

  // The "Round saved successfully!" message will be very brief due to immediate redirect.
  // If you want to show it for longer, you'd need to delay the navigation.
  // For now, the redirect handles the success feedback by taking the user to the new round.
  // if (isRoundSaved && savedRoundId) { return <Typography>...</Typography>; }

  return (
    <>
      {moreHolesToPlay ? (
        <AddSingleHole derivedClubs={derivedClubs} />
      ) : (
        !isRoundSaved && <RoundSave />
      )}
    </>
  )
}

export default AddNewRoundHoles
