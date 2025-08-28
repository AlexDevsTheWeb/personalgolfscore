import ApproachDetailsDialog from '@/components/Dialog/ApproachDialog.component';
import HoleDetailsDialog from '@/components/Dialog/HoleDetailsDialog.component';
import { setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import { IHoleGeneralInfoFormProps } from '@/types/props.types';
import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PuttsInputDialog from '../../Dialog/PuttsInputDialog.component';
import SaveRoundButton from './SaveRoundButton.component';

const HoleGeneralForm: React.FC<IHoleGeneralInfoFormProps> = ({
	holeData, // This holeData now includes puttsLength
	hcpList,
	parList,
	currentHoleNumber,
	teeClubs = [],
	greenClubs = [], // Add greenClubs prop
	fairwayValues = [],
	onChange,
	onSave,
	isSaveDisabled,
	onOpenTeeShotDialog,
}: IHoleGeneralInfoFormProps) => {
	const distanceValue = holeData.distance !== 0 ? holeData.distance : '';
	const strokesValue = holeData.strokes !== 0 ? holeData.strokes : '';

	const waterValue = holeData.water !== 0 ? holeData.water : '';
	const outValue = holeData.out !== 0 ? holeData.out : '';

	const [dialogOpen, setDialogOpen] = useState<'general' | 'tee' | 'putts' | 'approach' | 'penalties' | null>(null);
	const {
		player: { chipClubs },
		newRound: { newRoundHoles, newRoundMain },
	} = useSelector((state: any) => state);
	const dispatch = useDispatch();

	const newHoleItems = ['general', 'tee', 'putts', 'approach', 'penalties'];
	const roundPlayingHCP = newRoundMain.round.roundPlayingHCP;
	const roundHoles = newRoundMain.round.roundHoles;

	const handleGeneralFormData = (e: any) => {
		onChange({ target: { name: e.target.name, value: e.target.value ? Number(e.target.value) : 0 } } as any);
	};

	const handleDialogButtonClick = (key: string) => {
		switch (key) {

			case "tee":
				setDialogOpen(null);
				onOpenTeeShotDialog?.();
				break;
			default:
				setDialogOpen(key as any);
				break;
		}
	}

	const handlePuttsSubmit = (numberOfPutts: number, puttsLength: number[]) => {
		dispatch(setTmpHoleData({ name: 'putts', value: numberOfPutts, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'puttsLength', value: puttsLength, roundPlayingHCP, roundHoles, chipClubs }));
	};

	const handleGeneralSubmit = (par: number, distance: number, hcp: number, strokes: number) => {
		dispatch(setTmpHoleData({ name: 'par', value: par, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'distance', value: distance, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'hcp', value: hcp, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'strokes', value: strokes, roundPlayingHCP, roundHoles, chipClubs }));
	};

	const handleApproachSubmit = (toGreenMeters: number, toGreen: string, greenSide: string, chipClub: string) => {
		dispatch(setTmpHoleData({ name: 'toGreenMeters', value: toGreenMeters, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'toGreen', value: toGreen, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'greenSide', value: greenSide, roundPlayingHCP, roundHoles, chipClubs }));
		dispatch(setTmpHoleData({ name: 'chipClub', value: chipClub, roundPlayingHCP, roundHoles, chipClubs }));
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
								<Grid key={index} size={{ xs: 1, sm: 4, lg: 2 }}>
									<Button variant="contained" onClick={() => handleDialogButtonClick(item as 'tee' | 'putts' | 'approach' | 'penalties')} sx={{ width: '100%' }}>
										{item}
									</Button>
								</Grid>
							))}
						<Grid size={{ xs: 2, sm: 4, lg: 2 }}>
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

			{/* <Dialog title="Add green approach" open={dialogOpen === 'approach'} onClose={() => setDialogOpen(null)} fullWidth maxWidth="sm">
				<Autocomplete
					options={greenClubs}
					value={holeData.toGreen || null}
					onChange={(event, newValue) => {
						onChange({ target: { name: 'toGreen', value: newValue || '' } } as any);
					}}
					renderInput={params => <TextField {...params} label="Approach club" name="toGreen" variant="filled" />}
					disabled={holeData.par === 3}
					sx={{ width: '100%' }}
				/>
			</Dialog> */}

			<Dialog title="Add penalties" open={dialogOpen === 'penalties'} onClose={() => setDialogOpen(null)}>
				<Grid container spacing={1} columns={{ xs: 2, sm: 6, lg: 12 }}>
					<Grid size={{ xs: 1, sm: 6, lg: 6 }}>
						<TextField name="water" label="Water" type="number" variant="filled" onChange={onChange} value={waterValue} sx={{ width: '100%' }} />
					</Grid>
					<Grid size={{ xs: 1, sm: 6, lg: 6 }}>
						<TextField name="out" label="Out" type="number" variant="filled" onChange={onChange} value={outValue} sx={{ width: '100%' }} />
					</Grid>
				</Grid>
			</Dialog>
		</>
	);
};

export default HoleGeneralForm;
