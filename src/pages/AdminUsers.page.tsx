import { useEffect } from 'react';
import { useAppStore } from '@/store/zustand';
import Spinner from '@/components/common/spinner/Spinner.component';
import AdminUsersTable from '@/components/Admin/UsersTable.component';
import { readUserLocalStorage } from '@/utils/storage/localStorage.utils';

const AdminUsersPage = () => {
	const isLoadingPlayer = useAppStore((state) => state.isLoadingPlayer);
	const getPlayerDetails = useAppStore((state) => state.getPlayerDetails);
	const uid = readUserLocalStorage();

	useEffect(() => {
		if (uid) {
			getPlayerDetails(uid);
		}
	}, [uid, getPlayerDetails]);

	if (isLoadingPlayer) {
		return <Spinner />;
	}

	return <AdminUsersTable />;
};

export default AdminUsersPage;
