import { IAddSingleHoleProps } from '@/types/clubs.types';
import { fairwayValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils'; // prettier-ignore
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import MissingShotsDialog from '../Dialog/MissingShotsDialog.component';

import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { useHoleFormManager } from '@/hooks/useHoleFormManager.component';
import HoleGeneralForm from './components/HoleGeneralForm.component';
import { useAppStore } from "@/store/zustand";

const AddSingleHole = ({ derivedClubs }: IAddSingleHoleProps) => {
	const newRoundMain = useAppStore((state) => state.newRoundMain);
	const roundPlayingHCP = newRoundMain.round.roundPlayingHCP;
	const roundHoles = newRoundMain.round.roundHoles;
	const holes = useAppStore((state) => state.newRoundHoles.holes);
	const holesCompleted = useAppStore((state) => state.newRoundHoles.holesCompleted);
	const holeTmp = useAppStore((state) => state.newRoundHoleTmp);
	const showDistances = useAppStore((state) => state.showDistances);

	const [puttsLength, setPuttsLength] = useState<number[]>([]);
	const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(1);

	useEffect(() => {
		setCurrentHoleNumber(holesCompleted + 1);
	}, [holesCompleted]);

	// Sync puttsLength from Zustand store when it changes
	useEffect(() => {
		if (holeTmp.puttsLength && holeTmp.puttsLength.length > 0) {
			setPuttsLength(holeTmp.puttsLength);
		}
	}, [holeTmp.puttsLength]);

	const { handleChange, handleSaveHole, isSaveDisabled, missingShotsDialogProps } = useHoleFormManager({
		tmpHole: holeTmp,
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
