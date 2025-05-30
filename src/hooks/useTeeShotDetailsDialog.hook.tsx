import { setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { FairwayOption } from '@/types/props.types'; // Assuming FairwayOption is exported
import { IShots } from '@/types/roundData.types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseTeeShotDetailsDialogProps {
  tmpHole: Pick<IShots, 'teeClub' | 'par' | 'fairway' | 'driveDistance'>;
  fairwayValuesConstant: FairwayOption[];
  // For dispatching actions
  roundPlayingHCP: number;
  roundHoles: number;
  derivedClubsChipClubs: string[];
}

export const useTeeShotDetailsDialog = ({
  tmpHole,
  fairwayValuesConstant,
  roundPlayingHCP,
  roundHoles,
  derivedClubsChipClubs,
}: UseTeeShotDetailsDialogProps) => {
  const dispatch = useDispatch<any>();
  const [isTeeShotDetailsDialogOpen, setIsTeeShotDetailsDialogOpen] = useState(false);

  useEffect(() => {
    if (tmpHole.teeClub && tmpHole.par !== 3) {
      setIsTeeShotDetailsDialogOpen(true);
    } else {
      setIsTeeShotDetailsDialogOpen(false);
    }
  }, [tmpHole.teeClub, tmpHole.par]);

  const handleClose = () => {
    setIsTeeShotDetailsDialogOpen(false);
    // Optional: clear tmpHole.teeClub if cancel should reset selection
    // dispatch(setTmpHoleData({ name: 'teeClub', value: '', roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
  };

  const handleSubmit = (details: { fairway: number; distance: number }) => {
    dispatch(setTmpHoleData({ name: 'fairway', value: details.fairway, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
    dispatch(setTmpHoleData({ name: 'driveDistance', value: details.distance, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
    setIsTeeShotDetailsDialogOpen(false);
  };

  return {
    teeShotDialogProps: {
      open: isTeeShotDetailsDialogOpen,
      isPar3: tmpHole.par === 3,
      initialFairwayValue: tmpHole.fairway || 0,
      initialDistanceValue: tmpHole.driveDistance || 0,
      fairwayValues: fairwayValuesConstant,
      onClose: handleClose,
      onSubmit: handleSubmit,
    },
  };
};
