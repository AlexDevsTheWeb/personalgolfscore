import Dashboard from "@/components/Dashboard/Dashboard.component";
import Spinner from "@/components/common/spinner/Spinner.component";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/store/zustand";
import { useUserStore } from "@/store/zustand";

const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoading = usePlayerStore((state) => state.isLoading);
  const getPlayerDetails = usePlayerStore((state) => state.getPlayerDetails);
  const fetchInitialTheme = useUserStore((state) => state.fetchInitialTheme);
  const uid = readUserLocalStorage();
  const auth = getAuth();

  useEffect(() => {
    if (uid) {
      fetchInitialTheme(uid);
      if (auth) {
        getPlayerDetails(uid);
      }
    }
  }, [uid]);

  if (_.isNull(auth)) {
    navigate('/login')
  }

  if (!uid || !!isLoading) {
    return <Spinner />
  }

  return (
    <Dashboard />
  )
}

export default DashboardPage
