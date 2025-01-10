import Dashboard from "@/components/Dashboard/Dashboard.component";
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
    }
  }, [uid, user, dispatch]);


  return (
    <Dashboard />
  )
}

export default DashboardPage
