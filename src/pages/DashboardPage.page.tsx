import Dashboard from "@/components/Dashboard/Dashboard.component";
import { getPlayerDetails } from "@/features/player/player.slice";
import { getUserDetails } from "@/features/user/user.slice";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((store: any) => store.user);
  const uid = readUserLocalStorage();

  useEffect(() => {
    if (uid && _.isEmpty(user)) {
      dispatch(getUserDetails(uid));
      dispatch(getPlayerDetails(uid))
    }
  }, [uid, user, dispatch]);


  return (
    <Dashboard />
  )
}

export default DashboardPage
