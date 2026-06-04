import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface SnackbarState {
	open: boolean;
	message: string;
	severity: AlertColor;
}

interface SnackbarContextValue {
	showSnackbar: (message: string, severity: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

export const useSnackbar = (): SnackbarContextValue => {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error('useSnackbar must be used within a SnackbarProvider');
	}
	return context;
};

const getAutoHideDuration = (severity: AlertColor): number => {
	switch (severity) {
		case 'success':
			return 3000;
		case 'error':
			return 5000;
		case 'warning':
		case 'info':
		default:
			return 4000;
	}
};

const getAlertBgColor = (severity: AlertColor): string | undefined => {
	switch (severity) {
		case 'success':
			return '#4a9f6e';
		case 'error':
			return '#c94040';
		case 'warning':
			return '#c9a227';
		case 'info':
			return '#8399af';
		default:
			return undefined;
	}
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		open: false,
		message: '',
		severity: 'info',
	});

	const showSnackbar = useCallback((message: string, severity: AlertColor) => {
		setSnackbar({ open: true, message, severity });
	}, []);

	const handleClose = useCallback((_event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setSnackbar((prev) => ({ ...prev, open: false }));
	}, []);

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={getAutoHideDuration(snackbar.severity)}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleClose}
					severity={snackbar.severity}
					variant="filled"
					sx={{
						width: '100%',
						...(snackbar.severity === 'warning' && {
							color: '#1a1a1a',
							'& .MuiAlert-icon': { color: '#1a1a1a' },
						}),
						...(snackbar.severity !== 'warning' && {
							color: '#ffffff',
						}),
						bgcolor: getAlertBgColor(snackbar.severity),
					}}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
