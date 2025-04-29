import Dashboard from "@/components/Dashboard/Dashboard.component";
import Spinner from "@/components/common/spinner/Spinner.component";
import { setIsLoading } from "@/features/app/controls.slice";
import { getPlayerDetails } from "@/features/player/player.slice";
import { RootState } from "@/store/store";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "@firebase/auth";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((store: RootState) => store.controls);
  const uid = readUserLocalStorage();
  const auth = getAuth();

  useEffect(() => {
    if (uid) {
      if (auth) {
        dispatch(setIsLoading(true));
        dispatch(getPlayerDetails(uid));
        dispatch(setIsLoading(false));
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
