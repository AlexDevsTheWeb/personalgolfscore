import { getChipClubs, getClubsNames, getDistanceClubs, getGreenClubs } from '@/utils/round/round.utils';
import { Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.component';
import AddSingleHole from './AddSingleHole.component';
import RoundSave from './RoundSave.component';
import { useNewRoundStore } from '@/store/zustand';
import { usePlayerStore } from '@/store/zustand';

const AddNewRoundHoles = () => {
  const main = useNewRoundStore((state) => state.main);
  const round = main.round;
  const setFirstHole = main.setFirstHole;
  const holes = useNewRoundStore((state) => state.holes.holes);
  const holesCompleted = useNewRoundStore((state) => state.holes.holesCompleted);
  const isSavingRound = useNewRoundStore((state) => state.saver.isLoading);
  const isRoundSaved = useNewRoundStore((state) => state.saver.success);
  const savedRoundId = useNewRoundStore((state) => state.saver.roundId);
  const setNewRoundClubs = useNewRoundStore((state) => state.setNewRoundClubs);
  const setTotalsByHole = useNewRoundStore((state) => state.setTotalsByHole);
  const resetNewRound = useNewRoundStore((state) => state.resetNewRound);
  
  const { player, isLoading: isPlayerLoading } = usePlayerStore();

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
    if (holes.length > 0) {
      setTotalsByHole(holes);
    }
  }, [holes, setTotalsByHole]);

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
