import Spinner from "@/components/common/spinner/Spinner.component";
import { readUserLocalStorage } from "@/utils/storage/localStorage.utils";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import ClubsMain from "../components/Clubs/ClubsMain.component";
import { useAppStore } from "@/store/zustand";

const ClubsPage = () => {
  const { isLoadingPlayer, playerError, playerErrorMessage, player } = useAppStore();
  const getPlayerDetails = useAppStore((state) => state.getPlayerDetails);
  const uid = readUserLocalStorage();

  const golfBag = player?.golfBag;

  useEffect(() => {
    if (uid && (!player || !golfBag || golfBag.length === 0)) {
      getPlayerDetails(uid);
    }
  }, [uid, player]);

  if (isLoadingPlayer) {
    return <Spinner />
  }

  if (playerError || playerErrorMessage) {
    return <Typography variant="headline3">Error loading player data: {playerErrorMessage || playerError}</Typography>;
  }
  if (!player || !player.golfBag || player.golfBag.length === 0) {
    return <Typography variant="headline3">Golf bag data not found or is empty. Please check your profile.</Typography>;
  }

  return <ClubsMain golfBag={golfBag} />;
};

export default ClubsPage
