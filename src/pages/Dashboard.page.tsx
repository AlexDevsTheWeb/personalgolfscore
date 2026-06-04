import Dashboard from "@/components/Dashboard/Dashboard.component";
import Spinner from "@/components/common/spinner/Spinner.component";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/zustand";

const DashboardPage = () => {
  const navigate = useNavigate();
  const isLoadingPlayer = useAppStore((state) => state.isLoadingPlayer);
  const getPlayerDetails = useAppStore((state) => state.getPlayerDetails);
  const fetchInitialTheme = useAppStore((state) => state.fetchInitialTheme);
  const setRounds = useAppStore((state) => state.setRounds);
  const setRoundsPlayerID = useAppStore((state) => state.setRoundsPlayerID);
  const uid = readUserLocalStorage();
  const auth = getAuth();

  useEffect(() => {
    if (uid) {
      fetchInitialTheme(uid);
      if (auth) {
        getPlayerDetails(uid).then((result) => {
          if (result) {
            setRounds(result.rounds || []);
            if (result.player?.uid) {
              setRoundsPlayerID(result.player.uid);
            }
          }
        });
      }
    }
  }, [uid]);

  if (_.isNull(auth)) {
    navigate('/login')
  }

  if (!uid || !!isLoadingPlayer) {
    return <Spinner />
  }

  return (
    <Dashboard />
  )
}

export default DashboardPage
