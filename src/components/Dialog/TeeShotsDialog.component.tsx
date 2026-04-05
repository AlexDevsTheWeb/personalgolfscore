import { Dialog } from '@/styles/dialog/Dialog.styles';
import { ITeeShotDetailsDialogProps } from '@/types/props.types';
import { fairwayValues } from '@/utils/constant.utils';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppStore } from "@/store/zustand";

const TeeShotDetailsDialog: React.FC<ITeeShotDetailsDialogProps> = ({
	open,
	onClose,
	onSubmit,
}) => {
	const holeTmp = useAppStore((state) => state.newRoundHoleTmp);
	const clubs = useAppStore((state) => state.newRoundClubs);
	const { teeClubs } = clubs;

	const [fairway, setFairway] = useState<number>(0);
	const [distance, setDistance] = useState<number>(0);
	const [teeClub, setTeeClub] = useState<string>('');
	useEffect(() => {
		if (open) {
			setFairway(holeTmp.fairway);
			setDistance(holeTmp.driveDistance);
			setTeeClub(holeTmp.teeClub);
		}
	}, [open, holeTmp.fairway, holeTmp.driveDistance, holeTmp.teeClub]);

	const handleFairwayChange = (event: any, newValue: { label: string; value: number } | null) => {
		setFairway(newValue?.value ?? 0);
	};

	const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDistance(Number(event.target.value) || 0);
	};

	const handleSubmit = () => {
		onSubmit(fairway, distance, teeClub);
		onClose();
	};

	if (!open) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			onClick={handleSubmit}
			onSubmit={handleSubmit}
			title='Tee shot'
		>
			<Typography>
				{holeTmp.par === 3
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

				{teeClub && !(holeTmp.par === 3) && (
					<>
						<Grid size={{ xs: 6 }}>
							<Autocomplete
								options={fairwayValues}
								getOptionLabel={option => option.label || ''}
								value={fairwayValues.find(fv => fv.value === fairway) || null}
								onChange={handleFairwayChange}
								isOptionEqualToValue={(option, value) => option.value === value.value}
								renderInput={params => <TextField {...params} label="Fairway Position" variant="outlined" fullWidth />}
								disabled={holeTmp.par === 3}
							/>
						</Grid>
						<Grid size={{ xs: 6 }}>
							<TextField
								label="Distance (meters)"
								type="number"
								variant="outlined"
								fullWidth
								value={distance || ''}
								onChange={handleDistanceChange}
								disabled={holeTmp.par === 3}
								inputProps={{ min: 0 }}
							/>
						</Grid>
					</>
				)}
			</Grid>
		</Dialog >
	);
};

export default TeeShotDetailsDialog;
