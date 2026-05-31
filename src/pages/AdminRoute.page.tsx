import React from 'react';
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

	if (isLoadingPlayer) {
		return <Spinner />;
	}

	if (!player?.isAdmin) {
		showSnackbar('Admin access required', 'warning');
		return <Navigate to="/dashboard" />;
	}

	return <>{children}</>;
};

export default AdminRoute;
