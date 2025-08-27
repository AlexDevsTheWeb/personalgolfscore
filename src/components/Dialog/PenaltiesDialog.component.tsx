import { IShots } from '@/types/roundData.types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface PenaltiesDialogProps {
	open: boolean;
	initialWater: number;
	initialOut: number;
	onClose: () => void;
	onSubmit: (data: { water: number; out: number }) => void;
}

const PenaltiesDialog: React.FC<PenaltiesDialogProps> = ({ open, initialWater, initialOut, onClose, onSubmit }) => {
	const [water, setWater] = useState<number>(0);
	const [out, setOut] = useState<number>(0);

	useEffect(() => {
		if (open) {
			setWater(initialWater);
			setOut(initialOut);
		}
	}, [open, initialWater, initialOut]);

	const handleWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === '' ? 0 : Number(e.target.value);
		setWater(Math.max(0, value));
	};

	const handleOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === '' ? 0 : Number(e.target.value);
		setOut(Math.max(0, value));
	};

	const handleSubmit = () => {
		onSubmit({ water, out });
	};

	if (!open) return null;

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>Penalty Details</DialogTitle>
			<DialogContent>
				<Typography gutterBottom>Enter the number of penalty strokes for water hazards and out of bounds.</Typography>
				<Grid container spacing={2} sx={{ mt: 1 }}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<TextField
							name="water"
							label="Water"
							type="number"
							variant="outlined"
							fullWidth
							value={water || ''}
							onChange={handleWaterChange}
							inputProps={{ min: 0 }}
						/>
					</Grid>
					<Grid size={{ xs: 12, sm: 6 }}>
						<TextField
							name="out"
							label="Out"
							type="number"
							variant="outlined"
							fullWidth
							value={out || ''}
							onChange={handleOutChange}
							inputProps={{ min: 0 }}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSubmit} variant="contained">
					Save Penalties
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PenaltiesDialog;
