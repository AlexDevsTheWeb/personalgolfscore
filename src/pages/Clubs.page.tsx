import Spinner from "@/components/common/spinner/Spinner.component";
import { getPlayerDetails } from "@/features/player/player.slice";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClubsMain from "../components/Clubs/ClubsMain.component";
import { RootState } from "../store/store";
import Typography from "../styles/typography/Typography.styles";

const ClubsPage = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, error, errorMessage, player } = useSelector((store: RootState) => store.player);
  const uid = readUserLocalStorage();

  const golfBag = player?.golfBag;

  useEffect(() => {
    if (uid && (!player || !golfBag || golfBag.length === 0)) {
      console.log("ClubsPage: fetching player details...");
      dispatch(getPlayerDetails(uid));
    }
  }, [dispatch, uid, player]);

  if (isLoading) {
    return <Spinner />
  }

  if (error || errorMessage) {
    return <Typography variant="headline3">Error loading player data: {errorMessage || error}</Typography>;
  }
  if (!player || !player.golfBag || player.golfBag.length === 0) {
    return <Typography variant="headline3">Golf bag data not found or is empty. Please check your profile.</Typography>;
  }

  return <ClubsMain golfBag={golfBag} />;
};

export default ClubsPage
