import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '@/store/zustand';
import Spinner from '@/components/common/spinner/Spinner.component';
import { useSnackbar } from '@/components/Admin/SnackbarProvider.component';

interface AdminRouteProps {
	children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
	const player = useAppStore((state) => state.player);
	const isLoadingPlayer = useAppStore((state) => state.isLoadingPlayer);
	const { showSnackbar } = useSnackbar();

	useEffect(() => {
		if (!isLoadingPlayer && !player?.isAdmin) {
			showSnackbar('Admin access required', 'warning');
		}
	}, [isLoadingPlayer, player, showSnackbar]);

	if (isLoadingPlayer) {
		return <Spinner />;
	}

	if (!player?.isAdmin) {
		return <Navigate to="/dashboard" />;
	}

	return <>{children}</>;
};

export default AdminRoute;
