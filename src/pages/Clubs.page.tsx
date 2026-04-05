import Spinner from "@/components/common/spinner/Spinner.component";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import ClubsMain from "../components/Clubs/ClubsMain.component";
import { usePlayerStore } from "@/store/zustand";

const ClubsPage = () => {
  const { isLoading, error, errorMessage, player } = usePlayerStore();
  const getPlayerDetails = usePlayerStore((state) => state.getPlayerDetails);
  const uid = readUserLocalStorage();

  const golfBag = player?.golfBag;

  useEffect(() => {
    if (uid && (!player || !golfBag || golfBag.length === 0)) {
      getPlayerDetails(uid);
    }
  }, [uid, player]);

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
