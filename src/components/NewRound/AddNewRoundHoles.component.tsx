import { getChipClubs, getClubsNames, getDistanceClubs, getGreenClubs } from '@/utils/round/round.utils';
import { Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import AddSingleHole from './AddSingleHole.component';
import RoundSave from './RoundSave.component';
import { useAppStore } from '@/store/zustand';

const AddNewRoundHoles = () => {
  const newRoundMain = useAppStore((state) => state.newRoundMain);
  const round = newRoundMain.round;
  const setFirstHole = newRoundMain.setFirstHole;
  const holes = useAppStore((state) => state.newRoundHoles.holes);
  const holesCompleted = useAppStore((state) => state.newRoundHoles.holesCompleted);
  const isSavingRound = useAppStore((state) => state.newRoundSaver.isLoading);
  const isRoundSaved = useAppStore((state) => state.newRoundSaver.success);
  const savedRoundId = useAppStore((state) => state.newRoundSaver.roundId);
  const setNewRoundClubs = useAppStore((state) => state.setNewRoundClubs);
  const setTotalsByHole = useAppStore((state) => state.setTotalsByHole);
  const resetNewRound = useAppStore((state) => state.resetNewRound);
  
  const { player, isLoadingPlayer: isPlayerLoading } = useAppStore();

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
    setNewRoundClubs(derivedClubs);
  }, [derivedClubs, setNewRoundClubs]);

  useEffect(() => {
    if (isRoundSaved && savedRoundId) {
      resetNewRound();
      navigate(`/round/${savedRoundId}`);
    }
  }, [isRoundSaved, savedRoundId, resetNewRound, navigate]);

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
