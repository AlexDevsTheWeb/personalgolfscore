import { setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { FairwayOption } from '@/types/props.types'; // Assuming FairwayOption is exported
import { IShots } from '@/types/roundData.types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface UseTeeShotDetailsDialogProps {
	tmpHole: Pick<IShots, 'teeClub' | 'par' | 'fairway' | 'driveDistance'>;
	fairwayValuesConstant: FairwayOption[];
	teeClubs: string[];
	// For dispatching actions
	roundPlayingHCP: number;
	roundHoles: number;
	derivedClubsChipClubs: string[];
}

export const useTeeShotDetailsDialog = ({
	tmpHole,
	fairwayValuesConstant,
	teeClubs,
	roundPlayingHCP,
	roundHoles,
	derivedClubsChipClubs,
}: UseTeeShotDetailsDialogProps) => {
	const dispatch = useDispatch<any>();
	const [isTeeShotDetailsDialogOpen, setIsTeeShotDetailsDialogOpen] = useState(false);

	const openDialog = () => {
		setIsTeeShotDetailsDialogOpen(true);
	};

	const handleClose = () => {
		setIsTeeShotDetailsDialogOpen(false);
	};

	const handleSubmit = (details: { fairway: number; distance: number; teeClub: string }) => {
		dispatch(setTmpHoleData({ name: 'teeClub', value: details.teeClub, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
		dispatch(setTmpHoleData({ name: 'fairway', value: details.fairway, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
		dispatch(setTmpHoleData({ name: 'driveDistance', value: details.distance, roundPlayingHCP, roundHoles, chipClubs: derivedClubsChipClubs }));
		setIsTeeShotDetailsDialogOpen(false);
	};

	return {
		openTeeShotDialog: openDialog,
		teeShotDialogProps: {
			open: isTeeShotDetailsDialogOpen,
			isPar3: tmpHole.par === 3,
			initialFairwayValue: tmpHole.fairway || 0,
			initialDistanceValue: tmpHole.driveDistance || 0,
			initialTeeClubValue: tmpHole.teeClub || '',
			fairwayValues: fairwayValuesConstant,
			teeClubs: teeClubs,
			onClose: handleClose,
			onSubmit: handleSubmit,
		},
	};
};
