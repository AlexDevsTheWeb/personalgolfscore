import Dashboard from "@/components/Dashboard/Dashboard.component";
import Spinner from "@/components/common/spinner/Spinner.component";
import { getPlayerDetails } from "@/features/player/player.slice";
import { fetchInitialTheme } from "@/features/user/user.slice"; // Import the new thunk
import { RootState } from "@/store/store";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { isLoading } = useSelector((store: RootState) => store.player);
  const uid = readUserLocalStorage();
  const auth = getAuth();

  useEffect(() => {
    if (uid) {
      // Fetch initial theme preference
      dispatch(fetchInitialTheme(uid));
      if (auth) {
        dispatch(getPlayerDetails(uid)); // Fetch player details
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
