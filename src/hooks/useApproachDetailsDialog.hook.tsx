import { setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { IShots } from '@/types/roundData.types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseApproachDetailsDialogProps {
  tmpHole: IShots; // Pass the whole tmpHole for initialData
  derivedClubsChipClubs: string[];
  greenSideValuesConstant: string[];
  roundPlayingHCP: number;
  roundHoles: number;
}

export const useApproachDetailsDialog = ({
  tmpHole,
  derivedClubsChipClubs,
  greenSideValuesConstant,
  roundPlayingHCP,
  roundHoles,
}: UseApproachDetailsDialogProps) => {
  const dispatch = useDispatch<any>();
  const [isApproachDetailsDialogOpen, setIsApproachDetailsDialogOpen] = useState(false);

  useEffect(() => {
    if (tmpHole.toGreen && tmpHole.par !== 3) {
      setIsApproachDetailsDialogOpen(true);
    } else {
      setIsApproachDetailsDialogOpen(false);
    }
  }, [tmpHole.toGreen, tmpHole.par]);

  const handleClose = () => {
    setIsApproachDetailsDialogOpen(false);
  };

  const handleSubmit = (details: {
    toGreenMeters?: number;
    greenSide?: string;
    chipClub?: string;
  }) => {
    if (details.toGreenMeters !== undefined) dispatch(setTmpHoleData({ name: 'toGreenMeters', value: details.toGreenMeters, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
    if (details.greenSide !== undefined) dispatch(setTmpHoleData({ name: 'greenSide', value: details.greenSide, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
    if (details.chipClub !== undefined) dispatch(setTmpHoleData({ name: 'chipClub', value: details.chipClub, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
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
