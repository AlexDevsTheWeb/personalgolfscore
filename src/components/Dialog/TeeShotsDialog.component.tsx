import { Dialog } from '@/styles/dialog/Dialog.styles';
import { IHoleTeeShotFormProps } from '@/types/props.types';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface TeeShotDetailsDialogProps {
	open: boolean;
	isPar3: boolean;
	initialFairwayValue: number;
	initialDistanceValue: number;
	initialTeeClubValue: string;
	fairwayValues: IHoleTeeShotFormProps['fairwayValues'];
	teeClubs: string[];
	onClose: () => void;
	onSubmit: (details: { fairway: number; distance: number; teeClub: string }) => void;
}

const TeeShotDetailsDialog: React.FC<TeeShotDetailsDialogProps> = ({
	open,
	isPar3,
	initialFairwayValue,
	initialDistanceValue,
	initialTeeClubValue,
	fairwayValues,
	teeClubs,
	onClose,
	onSubmit,
}) => {
	const [fairway, setFairway] = useState<number>(0);
	const [distance, setDistance] = useState<number>(0);
	const [teeClub, setTeeClub] = useState<string>('');

	useEffect(() => {
		if (open) {
			setFairway(initialFairwayValue);
			setDistance(initialDistanceValue);
			setTeeClub(initialTeeClubValue);
		}
	}, [open, initialFairwayValue, initialDistanceValue, initialTeeClubValue]);

	const handleFairwayChange = (event: any, newValue: { label: string; value: number } | null) => {
		setFairway(newValue?.value ?? 0);
	};

	const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDistance(Number(event.target.value) || 0);
	};

	const handleSubmit = () => {
		onSubmit({ fairway, distance, teeClub });
		onClose();
	};

	if (!open) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			onClick={handleSubmit}
			title='Tee shot'
		>
			<Typography gutterBottom>
				{isPar3
					? 'For Par 3s, select your tee club and distance (usually the hole length). Fairway position is not applicable.'
					: 'Please select your tee club, fairway position and distance for your tee shot.'}
			</Typography>
			<Grid container spacing={2} sx={{ mt: 1 }}>
				<Grid size={{ xs: 12 }}>
					<Autocomplete
						options={teeClubs}
						value={teeClub || null}
						onChange={(event, newValue) => {
							setTeeClub(newValue || '');
						}}
						renderInput={params => <TextField {...params} label="Tee Club" variant="outlined" fullWidth />}
					/>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<Autocomplete
						options={fairwayValues}
						getOptionLabel={option => option.label || ''}
						value={fairwayValues.find(fv => fv.value === fairway) || null}
						onChange={handleFairwayChange}
						isOptionEqualToValue={(option, value) => option.value === value.value}
						renderInput={params => <TextField {...params} label="Fairway Position" variant="outlined" fullWidth />}
						disabled={isPar3}
					/>
				</Grid>
				<Grid size={{ xs: 12 }}>
					<TextField
						label="Distance (meters)"
						type="number"
						variant="outlined"
						fullWidth
						value={distance || ''}
						onChange={handleDistanceChange}
						disabled={isPar3}
						inputProps={{ min: 0 }}
					/>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default TeeShotDetailsDialog;
