import { setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import { IHoleGeneralInfoFormProps } from '@/types/props.types';
import { Autocomplete, Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PuttsInputDialog from '../../Dialog/PuttsInputDialog.component';
import SaveRoundButton from './SaveRoundButton.component';
import Select from './Select.component';

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
		player: { roundPlayingHCP, chipClubs },
		newRound: { newRoundHoles },
	} = useSelector((state: any) => state);
	const dispatch = useDispatch();

	const newHoleItems = ['general', 'tee', 'putts', 'approach', 'penalties'];

	const handleGeneralFormData = (e: any) => {
		onChange({ target: { name: e.target.name, value: e.target.value ? Number(e.target.value) : 0 } } as any);
	};

	const handleDialogButtonClick = (key: string) => {
		switch (key) {
			case "putts":
				setDialogOpen(key as any);
				break;
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
		dispatch(setTmpHoleData({ name: 'putts', value: numberOfPutts, roundPlayingHCP, roundHoles: newRoundHoles.length, chipClubs }));
		dispatch(setTmpHoleData({ name: 'puttsLength', value: puttsLength, roundPlayingHCP, roundHoles: newRoundHoles.length, chipClubs }));
	};

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

			<Dialog title="Hole details" open={dialogOpen === 'general'} onClose={() => setDialogOpen(null)}>
				<Grid container spacing={1} columns={{ xs: 2, sm: 4, lg: 12 }}>
					<Grid size={{ xs: 1, sm: 4, lg: 3 }}>
						<Select name={'par'} list={parList} onChange={handleGeneralFormData} value={holeData.par ? holeData.par.toString() : ''} label="Hole Par" />
					</Grid>
					<Grid size={{ xs: 1, sm: 4, lg: 3 }}>
						<TextField name="distance" label="Length" type="number" onChange={onChange} value={distanceValue} variant="filled" sx={{ width: '100%' }} />
					</Grid>
					<Grid size={{ xs: 1, sm: 4, lg: 3 }}>
						<Autocomplete
							options={hcpList}
							value={holeData.hcp ? holeData.hcp.toString() : null}
							onChange={(event, newValue) => {
								onChange({ target: { name: 'hcp', value: newValue ? Number(newValue) : 0 } } as any);
							}}
							renderInput={params => <TextField {...params} label="Hole HCP" name="hcp" variant="filled" />}
							sx={{ width: '100%' }}
						/>
					</Grid>
					<Grid size={{ xs: 1, sm: 4, lg: 3 }}>
						<TextField name="strokes" label="Score" type="number" onChange={onChange} value={strokesValue} variant="filled" sx={{ width: '100%' }} />
					</Grid>
				</Grid>
			</Dialog>

			<PuttsInputDialog
				open={dialogOpen === 'putts'}
				onClose={() => setDialogOpen(null)}
				onSubmit={handlePuttsSubmit}
			/>

			<Dialog title="Add green approach" open={dialogOpen === 'approach'} onClose={() => setDialogOpen(null)} fullWidth maxWidth="sm">
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
			</Dialog>

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
