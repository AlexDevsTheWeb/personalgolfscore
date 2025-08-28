import { RootState } from '@/store/store';
import { Dialog } from '@/styles/dialog/Dialog.styles';
import { fairwayValues } from '@/utils/constant.utils';
import { getChipClubs, getClubsNames, getDistanceClubs, getGreenClubs } from '@/utils/round/round.utils';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface TeeShotDetailsDialogProps {
	open: boolean;
	// isPar3: boolean;
	// initialFairwayValue: number;
	// initialDistanceValue: number;
	// initialTeeClubValue: string;
	// fairwayValues: IHoleTeeShotFormProps['fairwayValues'];
	// teeClubs: string[];
	onClose: () => void;
	onSubmit: (fairway: number, distance: number, teeClub: string) => void;
}

const TeeShotDetailsDialog: React.FC<TeeShotDetailsDialogProps> = ({
	open,
	// isPar3,
	// initialFairwayValue,
	// initialDistanceValue,
	// initialTeeClubValue,
	// fairwayValues,
	// teeClubs,
	onClose,
	onSubmit,
}) => {
	const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
	const { player } = useSelector((store: RootState) => store.player);


	const [fairway, setFairway] = useState<number>(0);
	const [distance, setDistance] = useState<number>(0);
	const [teeClub, setTeeClub] = useState<string>('');

	const golfBag = player?.golfBag;
	const derivedClubs = useMemo(() => {


		if (!golfBag || golfBag.length === 0) {
			return { teeClubs: [], distanceClubs: [], greenClubs: [], chipClubs: [] };
		}
		const teeClubNames = getClubsNames(golfBag);
		const distanceClubs = getDistanceClubs(teeClubNames);
		const greenClubs = getGreenClubs(teeClubNames);
		const chipClubs = getChipClubs(teeClubNames);

		return { teeClubs: teeClubNames, distanceClubs, greenClubs, chipClubs };
	}, [golfBag]);

	useEffect(() => {
		if (open) {
			setFairway(tmpHole.fairway);
			setDistance(tmpHole.driveDistance);
			setTeeClub(tmpHole.teeClub);
		}
	}, [open, tmpHole.fairway, tmpHole.driveDistance, tmpHole.teeClub]);

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
				{tmpHole.par === 3
					? 'For Par 3s, select your tee club and distance (usually the hole length). Fairway position is not applicable.'
					: 'Please select your tee club, fairway position and distance for your tee shot.'}
			</Typography>
			<Grid container spacing={2} sx={{ mt: 1 }}>
				<Grid size={{ xs: 12 }}>
					<Autocomplete
						options={derivedClubs.teeClubs}
						value={teeClub || null}
						onChange={(event, newValue) => {
							setTeeClub(newValue || '');
						}}
						renderInput={params => <TextField {...params} label="Tee Club" variant="outlined" fullWidth />}
					/>
				</Grid>

				{teeClub && !(tmpHole.par === 3) && (
					<>
						<Grid size={{ xs: 6 }}>
							<Autocomplete
								options={fairwayValues}
								getOptionLabel={option => option.label || ''}
								value={fairwayValues.find(fv => fv.value === fairway) || null}
								onChange={handleFairwayChange}
								isOptionEqualToValue={(option, value) => option.value === value.value}
								renderInput={params => <TextField {...params} label="Fairway Position" variant="outlined" fullWidth />}
								disabled={tmpHole.par === 3}
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
								disabled={tmpHole.par === 3}
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
