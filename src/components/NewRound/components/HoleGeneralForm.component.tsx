import ApproachDetailsDialog from '@/components/Dialog/ApproachDialog.component';
import HoleDetailsDialog from '@/components/Dialog/HoleDetailsDialog.component';
import PenaltiesDialog from '@/components/Dialog/PenaltiesDialog.component';
import TeeShotDetailsDialog from '@/components/Dialog/TeeShotsDialog.component';
import { setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { RootState } from '@/store/store';
import { IHoleGeneralInfoFormProps } from '@/types/props.types';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PuttsInputDialog from '../../Dialog/PuttsInputDialog.component';
import SaveRoundButton from './SaveRoundButton.component';

const HoleGeneralForm: React.FC<IHoleGeneralInfoFormProps> = ({
	currentHoleNumber,
	onSave,
	isSaveDisabled
}: IHoleGeneralInfoFormProps) => {

	const [dialogOpen, setDialogOpen] = useState<'general' | 'tee' | 'putts' | 'approach' | 'penalties' | null>(null);
	const { chipClubs } = useSelector((state: RootState) => state.newRound.newRoundClubs);
	const newRoundMain = useSelector((state: RootState) => state.newRound.newRoundMain);
	const dispatch = useDispatch();

	const newHoleItems = ['general', 'tee', 'putts', 'approach', 'penalties'];
	const roundPlayingHCP = newRoundMain.round.roundPlayingHCP;
	const roundHoles = newRoundMain.round.roundHoles;

	const handleDialogButtonClick = (key: string) => {
		setDialogOpen(key as any);
	}

	const handleGeneralSubmit = (par: number, distance: number, hcp: number, strokes: number) => {
		dispatch(setTmpHoleData({ name: 'par', value: par, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'distance', value: distance, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'hcp', value: hcp, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'strokes', value: strokes, roundPlayingHCP, roundHoles, chipClubs }));
	};

	const handleTeeshotSubmit = (fairway: number, distance: number, teeClub: string) => {
		dispatch(setTmpHoleData({ name: 'fairway', value: fairway, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'driveDistance', value: distance, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'teeClub', value: teeClub, roundPlayingHCP, roundHoles, chipClubs }));
	}
	const handlePuttsSubmit = (numberOfPutts: number, puttsLength: number[]) => {
		dispatch(setTmpHoleData({ name: 'putts', value: numberOfPutts, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'puttsLength', value: puttsLength, roundPlayingHCP, roundHoles, chipClubs }));
	};

	const handleApproachSubmit = (toGreenMeters: number, toGreen: string, greenSide: string, chipClub: string) => {
		dispatch(setTmpHoleData({ name: 'toGreenMeters', value: toGreenMeters, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'toGreen', value: toGreen, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'greenSide', value: greenSide, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'chipClub', value: chipClub, roundPlayingHCP, roundHoles, chipClubs }));
	}
	const handlePenaltiesSubmit = (water: number, out: number) => {
		dispatch(setTmpHoleData({ name: 'water', value: water, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'out', value: out, roundPlayingHCP, roundHoles, chipClubs }));
	}



	return (
		<>
			<Card sx={{ width: '100%' }}>
				<CardHeader title={`Hole ${currentHoleNumber} Informations`} />

				<CardContent sx={{ padding: '0px 16px' }}>
					<Grid container spacing={1} columns={{ xs: 2, sm: 4, lg: 12 }}>
						<Grid size={{ xs: 2, sm: 4, lg: 2 }}>
							<Button variant="contained" onClick={() => handleDialogButtonClick('general')} sx={{ width: '100%' }}>
								General
							</Button>
						</Grid>
						{newHoleItems
							.filter(item => item !== 'general')
							.map((item: string, index: number) => (
								<Grid key={index} size={{ xs: 1, sm: 4, lg: item === 'tee' || item === 'putts' ? 1 : 2 }}>
									<Button variant="contained" onClick={() => handleDialogButtonClick(item as 'tee' | 'putts' | 'approach' | 'penalties')} sx={{ width: '100%' }}>
										{item}
									</Button>
								</Grid>
							))}
						<Grid size={{ xs: 2, sm: 4, lg: 2 }}>
							<Button variant="contained" onClick={() => onSave()} disabled={isSaveDisabled()}>
								Distances
							</Button>
						</Grid>
						<Grid size={{ xs: 2, sm: 4, lg: 2 }} display={'flex'} justifyContent={'flex-end'}>
							<SaveRoundButton onSave={onSave} disabled={isSaveDisabled()} />
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<HoleDetailsDialog
				open={dialogOpen === 'general'}
				onClose={() => setDialogOpen(null)}
				onSubmit={handleGeneralSubmit}
			/>
			<TeeShotDetailsDialog
				open={dialogOpen === 'tee'}
				onClose={() => setDialogOpen(null)}
				onSubmit={handleTeeshotSubmit}
			/>
			<PuttsInputDialog
				open={dialogOpen === 'putts'}
				onClose={() => setDialogOpen(null)}
				onSubmit={handlePuttsSubmit}
			/>
			<ApproachDetailsDialog
				open={dialogOpen === 'approach'}
				onClose={() => setDialogOpen(null)}
				onSubmit={handleApproachSubmit}
			/>
			<PenaltiesDialog
				open={dialogOpen === 'penalties'}
				onClose={() => setDialogOpen(null)}
				onSubmit={handlePenaltiesSubmit}
			/>
		</>
	);
};

export default HoleGeneralForm;
