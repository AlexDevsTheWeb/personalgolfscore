import { useDispatch, useSelector } from "react-redux";
import ClubsMain from "../components/Clubs/ClubsMain.component"
import { useEffect } from "react";
import { getClubsDetails } from "../features/golfBag/golfBag.slice";
import { RootState } from "../store/store";
import Typography from "../styles/typography/Typography.styles";

const ClubsPage = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, error: { errorMessage } } = useSelector((store: RootState) => store.golfBag);

  useEffect(() => {
    dispatch(getClubsDetails(''));
  }, [dispatch]);

  if (isLoading) {
    return <Typography variant="headline3">Loading...</Typography>;
  }

  if (errorMessage) {
    return <Typography variant="headline3">{errorMessage}</Typography>;
  }

  return <ClubsMain />;
};

export default ClubsPage
