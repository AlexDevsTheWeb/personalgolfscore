import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

interface ConfirmDeleteDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	isDeleting?: boolean;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
	open,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Delete',
	isDeleting = false,
}) => {
	if (!open) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
			slotProps={{
				paper: {
					sx: {
						border: '2px solid #586069',
					},
				},
			}}
		>
			<DialogTitle sx={{ padding: '10px', height: '60px' }}>{title}</DialogTitle>
			<DialogContent sx={{ margin: '10px' }}>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ margin: '0px !important', padding: '10px !important' }}>
				<Button variant="link" onClick={onClose}>
					Cancel
				</Button>
				<Button
					variant="contained"
					onClick={onConfirm}
					disabled={isDeleting}
					sx={{ bgcolor: '#c94040', '&:hover': { bgcolor: '#a83333' } }}
				>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
