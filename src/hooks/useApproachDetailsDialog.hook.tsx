import { IShots } from '@/types/roundData.types';
import { useEffect, useState } from 'react';
import { useNewRoundStore } from '@/store/zustand';

interface UseApproachDetailsDialogProps {
  tmpHole: IShots; // Pass the whole tmpHole for initialData
  derivedClubsChipClubs: string[];
  greenSideValuesConstant: string[];
  roundPlayingHCP: number;
  puttsLength: number[]; // Add puttsLength to check if all lengths are entered
  roundHoles: number;
}

export const useApproachDetailsDialog = ({
  tmpHole,
  derivedClubsChipClubs,
  greenSideValuesConstant,
  roundPlayingHCP,
  puttsLength,
  roundHoles,
}: UseApproachDetailsDialogProps) => {
  const setTmpHoleData = useNewRoundStore((state) => state.setTmpHoleData);
  const [isApproachDetailsDialogOpen, setIsApproachDetailsDialogOpen] = useState(false);

  useEffect(() => {
    const openForNonPar3Approach = tmpHole.toGreen && tmpHole.par !== 3;
    const openForPar3ExtraShots =
      tmpHole.par === 3 &&
      tmpHole.strokes > 0 && // Ensure strokes are entered
      tmpHole.putts >= 0 && // Ensure putts are entered
      (tmpHole.strokes - tmpHole.putts) > 1;

    // New preconditions
    const scoreAndPuttsSet = tmpHole.strokes > 0 && tmpHole.putts >= 0;
    const allPuttLengthsEntered = tmpHole.putts === 0 || (tmpHole.putts > 0 && puttsLength.length === tmpHole.putts);
    const teeClubSet = !!tmpHole.teeClub;

    const canOpenDialog =
      (openForNonPar3Approach || openForPar3ExtraShots) &&
      scoreAndPuttsSet &&
      allPuttLengthsEntered &&
      teeClubSet;

    if (canOpenDialog) {
      setIsApproachDetailsDialogOpen(true);
    } else {
      setIsApproachDetailsDialogOpen(false);
    }
  }, [tmpHole.toGreen, tmpHole.par, tmpHole.strokes, tmpHole.putts, tmpHole.teeClub, puttsLength]);

  const handleClose = () => {
    setIsApproachDetailsDialogOpen(false);
  };

  const handleSubmit = (details: {
    toGreenMeters?: number;
    greenSide?: string;
    chipClub?: string;
  }) => {
    if (details.toGreenMeters !== undefined) setTmpHoleData({ name: 'toGreenMeters', value: details.toGreenMeters, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs });
    if (details.greenSide !== undefined) setTmpHoleData({ name: 'greenSide', value: details.greenSide, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs });
    if (details.chipClub !== undefined) setTmpHoleData({ name: 'chipClub', value: details.chipClub, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs });
    setIsApproachDetailsDialogOpen(false);
  };

  return {
    approachDialogProps: {
      open: isApproachDetailsDialogOpen,
      initialHoleData: tmpHole,
      chipClubs: derivedClubsChipClubs,
      greenSideValues: greenSideValuesConstant,
      onClose: handleClose,
      onSubmit: handleSubmit,
    },
  };
};
