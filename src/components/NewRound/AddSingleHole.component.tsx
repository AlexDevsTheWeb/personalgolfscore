import { IAddSingleHoleProps } from '@/types/clubs.types';
import { fairwayValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils'; // prettier-ignore
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import MissingShotsDialog from '../Dialog/MissingShotsDialog.component';

import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { useHoleFormManager } from '@/hooks/useHoleFormManager.component';
import HoleGeneralForm from './components/HoleGeneralForm.component';
import { useNewRoundStore } from "@/store/zustand";
import { useControlsStore } from "@/store/zustand";

const AddSingleHole = ({ derivedClubs }: IAddSingleHoleProps) => {
	const main = useNewRoundStore((state) => state.main);
	const roundPlayingHCP = main.round.roundPlayingHCP;
	const roundHoles = main.round.roundHoles;
	const holes = useNewRoundStore((state) => state.holes.holes);
	const holesCompleted = useNewRoundStore((state) => state.holes.holesCompleted);
	const holeTmp = useNewRoundStore((state) => state.holeTmp);
	const showDistances = useControlsStore((state) => state.showDistances);

	const [puttsLength, setPuttsLength] = useState<number[]>([]);
	const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(1);

	useEffect(() => {
		setCurrentHoleNumber(holesCompleted + 1);
	}, [holesCompleted]);

	const { handleChange, handleSaveHole, isSaveDisabled, missingShotsDialogProps } = useHoleFormManager({
		tmpHole,
		derivedClubs,
		roundPlayingHCP,
		roundHoles,
		holesCompleted,
		puttsLength, // Pass current puttsLength
		fairwayValuesConstant: fairwayValues,
	});

	// Effect to reset puttsLength when a hole is successfully saved (holeTmp is reset)
	useEffect(() => {
		if (holeTmp.holeNumber === 0 && holeTmp.par === 0 && holeTmp.strokes === 0) {
			// Heuristic for reset
			setPuttsLength([]);
		}
	}, [holeTmp.holeNumber, holeTmp.par, holeTmp.strokes]);

	const hcpList = Number(roundHoles) === 18 ? hcpList18 : hcpList9;
	const usedHCPs = holes.map((hole: any) => hole.hcp);
	const newHCPList = hcpList.filter(hcp => !usedHCPs.includes(Number(hcp)));

	return (
		<Grid container spacing={2} sx={{ width: useDeviceDetection().isMobileDevice ? '100%' : '70%' }}>
			<HoleGeneralForm
				holeData={holeTmp}
				hcpList={newHCPList}
				parList={parList}
				teeClubs={derivedClubs.teeClubs}
				greenClubs={derivedClubs.greenClubs}
				fairwayValues={fairwayValues}
				currentHoleNumber={currentHoleNumber}
				onChange={handleChange}
				onSave={handleSaveHole}
				isSaveDisabled={isSaveDisabled}
			/>

			{!!showDistances && <ClubDistanceDialog open={showDistances} />}
			<MissingShotsDialog {...missingShotsDialogProps} />
		</Grid>
	);
};

export default AddSingleHole;
