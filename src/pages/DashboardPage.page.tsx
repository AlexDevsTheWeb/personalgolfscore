import Dashboard from "@/components/Dashboard/Dashboard.component";
import Spinner from "@/components/spinner/Spinner.component";
import { setIsLoading } from "@/features/app/controls.slice";
import { getPlayerDetails } from "@/features/player/player.slice";
import { getAllRounds } from "@/features/rounds/rounds.slice";
import { getAllRoundsTotals } from "@/features/rounds/roundsTotals.slice";
import { getUserDetails } from "@/features/user/user.slice";
import { RootState } from "@/store/store";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "@firebase/auth";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const { isLoading } = useSelector((store: RootState) => store.controls);
  const dispatch = useDispatch<any>();
  const uid = readUserLocalStorage();
  const auth = getAuth();

  useEffect(() => {
    if (uid) {
      if (auth) {
        dispatch(setIsLoading(true));
        dispatch(getUserDetails(uid));
        dispatch(getPlayerDetails(uid));
        dispatch(getAllRoundsTotals(uid));
        dispatch(getAllRounds(uid));
        dispatch(setIsLoading(false));
      }
    }
  }, [uid]);

  if (!uid || _.isNull(auth) || !!isLoading) {
    return <Spinner />
  }

  return (
    <Dashboard />
  )
}

export default DashboardPage
