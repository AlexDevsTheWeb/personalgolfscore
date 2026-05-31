import React, { useState, useEffect, useCallback } from 'react';
import {
	DataGrid,
	GridColDef,
	GridToolbar,
	GridRenderCellParams,
} from '@mui/x-data-grid';
import { Switch, Tooltip, Chip, Alert, Button, Box, Typography } from '@mui/material';
import { IPlayerDetails } from '@/types/player.types';
import { getAllPlayers, updatePlayerProfile } from '@/utils/firestore/player.firestore';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';
import { useSnackbar } from './SnackbarProvider.component';
import ConfirmDeleteDialog from './ConfirmDeleteDialog.component';

const UsersTable: React.FC = () => {
	const { showSnackbar } = useSnackbar();
	const [players, setPlayers] = useState<IPlayerDetails[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
	const [revokePlayer, setRevokePlayer] = useState<IPlayerDetails | null>(null);
	const [isRevoking, setIsRevoking] = useState(false);

	const loadPlayers = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await getAllPlayers();
			setPlayers(data);
		} catch (err: any) {
			setError('Failed to load users.');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadPlayers();
	}, [loadPlayers]);

	const handleAdminToggle = async (player: IPlayerDetails, currentlyAdmin: boolean) => {
		// If toggling OFF (currently admin) → show confirmation
		if (currentlyAdmin) {
			setRevokePlayer(player);
			setRevokeDialogOpen(true);
			return;
		}

		// If toggling ON (currently not admin) → immediate
		try {
			await updatePlayerProfile({ uid: player.uid, data: { isAdmin: true } });
			setPlayers((prev) =>
				prev.map((p) => (p.uid === player.uid ? { ...p, isAdmin: true } : p))
			);
			showSnackbar(`${player.displayName || 'User'} is now an admin`, 'success');
		} catch (err: any) {
			showSnackbar('Failed to update admin status', 'error');
		}
	};

	const confirmRevoke = async () => {
		if (!revokePlayer) return;
		setIsRevoking(true);
		try {
			await updatePlayerProfile({ uid: revokePlayer.uid, data: { isAdmin: false } });
			setPlayers((prev) =>
				prev.map((p) =>
					p.uid === revokePlayer.uid ? { ...p, isAdmin: false } : p
				)
			);
			showSnackbar(
				`${revokePlayer.displayName || 'User'} is no longer an admin`,
				'warning'
			);
			setRevokeDialogOpen(false);
			setRevokePlayer(null);
		} catch (err: any) {
			showSnackbar('Failed to update admin status', 'error');
		} finally {
			setIsRevoking(false);
		}
	};

	const columns: GridColDef[] = [
		{
			field: 'displayName',
			headerName: 'Name',
			width: 180,
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 220,
		},
		{
			field: 'uid',
			headerName: 'UID',
			width: 160,
			renderCell: (params: GridRenderCellParams) => (
				<Tooltip title={params.value}>
					<Typography variant="body" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
						{params.value}
					</Typography>
				</Tooltip>
			),
		},
		{
			field: 'role',
			headerName: 'Role',
			width: 100,
			valueGetter: (_value, row: IPlayerDetails) => (row.isAdmin ? 'Admin' : 'User'),
			renderCell: (params: GridRenderCellParams) =>
				params.row.isAdmin ? (
					<Chip label="Admin" size="small" color="primary" />
				) : (
					<Typography variant="body">User</Typography>
				),
		},
		{
			field: 'isAdmin',
			headerName: 'Admin',
			width: 100,
			type: 'boolean',
			renderCell: (params: GridRenderCellParams) => {
				const currentUid = readUserLocalStorage();
				const isSelf = params.row.uid === currentUid;

				const toggleSwitch = (
					<Switch
						checked={params.value === true}
						onChange={() => handleAdminToggle(params.row, params.value === true)}
						disabled={isSelf}
						color={params.value ? 'success' : 'default'}
					/>
				);

				if (isSelf) {
					return (
						<Tooltip title="You cannot modify your own admin status">
							<span>{toggleSwitch}</span>
						</Tooltip>
					);
				}

				return toggleSwitch;
			},
		},
	];

	if (error) {
		return (
			<Box sx={{ mb: 2 }}>
				<Alert
					severity="error"
					action={
						<Button color="inherit" size="small" onClick={loadPlayers}>
							Try again
						</Button>
					}
				>
					{error}
				</Alert>
			</Box>
		);
	}

	return (
		<Box>
			<DataGrid
				rows={players}
				columns={columns}
				getRowId={(row) => row.uid}
				initialState={{
					pagination: { paginationModel: { pageSize: 25 } },
				}}
				pageSizeOptions={[10, 25, 50]}
				loading={isLoading}
				disableRowSelectionOnClick
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
				localeText={{
					noRowsLabel: 'No players found.',
				}}
			/>

			<ConfirmDeleteDialog
				open={revokeDialogOpen}
				onClose={() => {
					setRevokeDialogOpen(false);
					setRevokePlayer(null);
				}}
				onConfirm={confirmRevoke}
				title="Remove admin access?"
				message={
					revokePlayer
						? `Remove admin access from ${revokePlayer.displayName || 'this user'}? They will lose access to admin features.`
						: ''
				}
				confirmText="Remove"
				isDeleting={isRevoking}
			/>
		</Box>
	);
};

export default UsersTable;
