import { RootState } from '@/store/store';
import { IAddSingleHoleProps } from '@/types/clubs.types';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils'; // prettier-ignore
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import MissingShotsDialog from '../Dialog/MissingShotsDialog.component';

import { useApproachDetailsDialog } from '@/hooks/useApproachDetailsDialog.hook';
import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { useHoleFormManager } from '@/hooks/useHoleFormManager.component';
import { useTeeShotDetailsDialog } from '@/hooks/useTeeShotDetailsDialog.hook';
import ApproachDetailsDialog from '../Dialog/ApproachDialog.component';
import TeeShotDetailsDialog from '../Dialog/TeeShotsDialog.component'; // Assuming TeeShotsDialog is in the general Dialog folder
import HoleGeneralForm from './components/HoleGeneralForm.component';

const AddSingleHole = ({ derivedClubs }: IAddSingleHoleProps) => {
	const {
		round: { roundPlayingHCP, roundHoles },
	} = useSelector((store: RootState) => store.newRound.newRoundMain);
	const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
	const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
	const { showDistances } = useSelector((store: RootState) => store.controls);

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

	const { teeShotDialogProps, openTeeShotDialog } = useTeeShotDetailsDialog({
		tmpHole,
		fairwayValuesConstant: fairwayValues,
		teeClubs: derivedClubs.teeClubs,
		roundPlayingHCP,
		roundHoles,
		derivedClubsChipClubs: derivedClubs.chipClubs,
	});

	const { approachDialogProps } = useApproachDetailsDialog({
		tmpHole,
		derivedClubsChipClubs: derivedClubs.chipClubs,
		greenSideValuesConstant: greenSideValues,
		roundPlayingHCP,
		puttsLength, // Pass puttsLength
		roundHoles,
	});

	// Effect to reset puttsLength when a hole is successfully saved (tmpHole is reset)
	useEffect(() => {
		if (tmpHole.holeNumber === 0 && tmpHole.par === 0 && tmpHole.strokes === 0) {
			// Heuristic for reset
			setPuttsLength([]);
		}
	}, [tmpHole.holeNumber, tmpHole.par, tmpHole.strokes]);

	const hcpList = Number(roundHoles) === 18 ? hcpList18 : hcpList9;
	const usedHCPs = holes.map((hole: any) => hole.hcp);
	const newHCPList = hcpList.filter(hcp => !usedHCPs.includes(Number(hcp)));

	return (
		<Grid container spacing={2} sx={{ width: useDeviceDetection().isMobileDevice ? '100%' : '70%' }}>
			<HoleGeneralForm
				holeData={tmpHole}
				hcpList={newHCPList}
				parList={parList}
				teeClubs={derivedClubs.teeClubs}
				greenClubs={derivedClubs.greenClubs}
				fairwayValues={fairwayValues}
				currentHoleNumber={currentHoleNumber}
				onChange={handleChange}
				onSave={handleSaveHole}
				isSaveDisabled={isSaveDisabled}
				onOpenTeeShotDialog={openTeeShotDialog}
			/>

			{!!showDistances && <ClubDistanceDialog open={showDistances} />}
			<MissingShotsDialog {...missingShotsDialogProps} />
			<TeeShotDetailsDialog {...teeShotDialogProps} />
			<ApproachDetailsDialog {...approachDialogProps} />
		</Grid>
	);
};

export default AddSingleHole;
