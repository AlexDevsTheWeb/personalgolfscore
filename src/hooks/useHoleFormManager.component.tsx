import { resetNewRoundHoleTmp, setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { addApproachShotDistance, addTeeShotDistance } from '@/features/newRound/newRoundDistances.slice';
import { setNewHole } from '@/features/newRound/newRoundHoles.slice';
import { IAddSingleHoleProps } from '@/types/clubs.types';
import { FairwayOption } from '@/types/props.types'; // Ensure FairwayOption is exported
import { IIntermediateShot, IShots } from '@/types/roundData.types';
import { fairwayValues as defaultFairwayValues } from '@/utils/constant.utils';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


interface UseHoleFormManagerProps {
  tmpHole: IShots;
  derivedClubs: IAddSingleHoleProps['derivedClubs'];
  roundPlayingHCP: number;
  roundHoles: number;
  holesCompleted: number;
  puttsLength: number[]; // Current puttsLength from AddSingleHole
  fairwayValuesConstant?: FairwayOption[];
}

export const useHoleFormManager = ({
  tmpHole,
  derivedClubs,
  roundPlayingHCP,
  roundHoles,
  holesCompleted,
  puttsLength,
  fairwayValuesConstant = defaultFairwayValues,
}: UseHoleFormManagerProps) => {
  const dispatch = useDispatch<any>();
  const [isMissingShotsDialogOpen, setIsMissingShotsDialogOpen] = useState(false);
  const [calculatedMissingShots, setCalculatedMissingShots] = useState(0);

  const handleChange = (e: any) => { // Consider more specific type for e
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs: derivedClubs.chipClubs }));
  };

  const finalizeHoleSave = (intermediateShots: IIntermediateShot[] = []) => {
    const { teeClub, driveDistance, distance, par, fairway, toGreen, toGreenMeters } = tmpHole;
    let actualTeeDistance = 0;
    if (par === 3) {
      actualTeeDistance = distance;
    } else {
      actualTeeDistance = driveDistance > 0 ? driveDistance : 0;
    }
    if (teeClub && actualTeeDistance > 0) {
      dispatch(addTeeShotDistance({ club: teeClub, distance: actualTeeDistance }));
    }
    if (toGreen && typeof toGreenMeters === 'number' && toGreenMeters > 0) {
      dispatch(addApproachShotDistance({ club: toGreen, distance: toGreenMeters }));
    }
    intermediateShots.forEach(shot => {
      if (shot.club && shot.distance > 0) {
        dispatch(addApproachShotDistance({ club: shot.club, distance: shot.distance }));
      }
    });

    const holeAdjusted = {
      ...tmpHole,
      holeNumber: holesCompleted + 1,
      fairway: Number(fairway) || 0,
      puttsLength: [...puttsLength], // Use the puttsLength from props
      intermediateShots: intermediateShots,
    };
    dispatch(setNewHole({ holeAdjusted, roundPlayingHCP, roundHoles, holesCompleted }));
    dispatch(resetNewRoundHoleTmp());
  };

  const handleSaveHole = () => {
    const { strokes, putts, water, out, toGreen, toGreenMeters, chipClub } = tmpHole;
    if (strokes === 0) {
      finalizeHoleSave([]);
      return;
    }
    const penaltyStrokes = (water || 0) + (out || 0);
    const physicalSwingsMade = strokes - penaltyStrokes;
    const teeShotCount = 1;
    const approachShotCount = (toGreen && typeof toGreenMeters === 'number' && toGreenMeters > 0) ? 1 : 0;
    const puttCount = putts || 0;
    const chipCount = chipClub ? 1 : 0; // Assuming any chipClub means 1 chip shot
    const accountedSwings = teeShotCount + approachShotCount + puttCount + chipCount;
    const missingSwings = physicalSwingsMade - accountedSwings;

    if (missingSwings > 0) {
      setCalculatedMissingShots(missingSwings);
      setIsMissingShotsDialogOpen(true);
    } else {
      finalizeHoleSave([]);
    }
  };

  const handleMissingShotsSubmit = (intermediateShots: IIntermediateShot[]) => {
    setIsMissingShotsDialogOpen(false);
    finalizeHoleSave(intermediateShots);
  };

  const handleMissingShotsClose = () => {
    setIsMissingShotsDialogOpen(false);
    finalizeHoleSave([]); // Save without intermediate shots if dialog is cancelled
  };

  const isSaveDisabled = () => {
    return tmpHole.hcp === 0 || tmpHole.par === 0 || tmpHole.strokes === 0;
  };

  return {
    handleChange,
    handleSaveHole,
    isSaveDisabled,
    missingShotsDialogProps: {
      open: isMissingShotsDialogOpen,
      numberOfShots: calculatedMissingShots,
      allClubs: derivedClubs.teeClubs,
      fairwayValues: fairwayValuesConstant,
      onClose: handleMissingShotsClose,
      onSubmit: handleMissingShotsSubmit,
    },
  };
};
