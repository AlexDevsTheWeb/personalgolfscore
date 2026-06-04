import { IShots } from '@/types/roundData.types';
import { useState } from 'react';
import { useAppStore } from '@/store/zustand';

interface UsePenaltiesDialogProps {
	tmpHole: Pick<IShots, 'water' | 'out'>;
	roundPlayingHCP: number;
	roundHoles: number;
	derivedClubsChipClubs: string[];
}

export const usePenaltiesDialog = ({ tmpHole, roundPlayingHCP, roundHoles, derivedClubsChipClubs }: UsePenaltiesDialogProps) => {
	const setTmpHoleData = useAppStore((state) => state.setTmpHoleData);
	const [isPenaltiesDialogOpen, setIsPenaltiesDialogOpen] = useState(false);

	const handleOpen = () => {
		setIsPenaltiesDialogOpen(true);
	};

	const handleClose = () => {
		setIsPenaltiesDialogOpen(false);
	};

	const handleSubmit = (data: { water: number; out: number }) => {
		setTmpHoleData({
			name: 'water',
			value: data.water,
			roundPlayingHCP,
			roundHoles,
			chipClubs: derivedClubsChipClubs,
		});

		setTmpHoleData({
			name: 'out',
			value: data.out,
			roundPlayingHCP,
			roundHoles,
			chipClubs: derivedClubsChipClubs,
		});

		setIsPenaltiesDialogOpen(false);
	};

	return {
		penaltiesDialogProps: {
			open: isPenaltiesDialogOpen,
			initialWater: tmpHole.water || 0,
			initialOut: tmpHole.out || 0,
			onClose: handleClose,
			onSubmit: handleSubmit,
		},
		openPenaltiesDialog: handleOpen,
	};
};
