import Dashboard from "@/components/Dashboard/Dashboard.component";
import Spinner from "@/components/spinner/Spinner.component";
import { getPlayerDetails } from "@/features/player/player.slice";
import { getUserDetails } from "@/features/user/user.slice";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "@firebase/auth";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch<any>();
  const uid = readUserLocalStorage();
  const auth = getAuth();

  useEffect(() => {
    if (uid) {
      if (auth) {
        dispatch(getUserDetails(uid));
        dispatch(getPlayerDetails(uid))
      }
    }
  }, [uid]);

  if (!uid || _.isNull(auth)) {
    return <Spinner />
  }

  return (
    <Dashboard />
  )
}

export default DashboardPage
