import { Dialog } from '@/styles/dialog/Dialog.styles';
import { Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface PenaltiesDialogProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (water: number, out: number) => void;
}

const PenaltiesDialog: React.FC<PenaltiesDialogProps> = ({ open, onClose, onSubmit }) => {
	const [water, setWater] = useState<number>(0);
	const [out, setOut] = useState<number>(0);

	const handleWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === '' ? 0 : Number(e.target.value);
		setWater(Math.max(0, value));
	};

	const handleOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === '' ? 0 : Number(e.target.value);
		setOut(Math.max(0, value));
	};

	const handleSubmit = () => {
		onSubmit(water, out);
		onClose();
	};

	if (!open) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			onClick={handleSubmit}
			onSubmit={handleSubmit}
			title='Penalty Details'>

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
			{/* </DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSubmit} variant="contained">
					Save Penalties
				</Button>
			</DialogActions> */}
		</Dialog>
	);
};

export default PenaltiesDialog;
