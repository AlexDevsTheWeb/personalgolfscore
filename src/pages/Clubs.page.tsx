import { useDispatch, useSelector } from "react-redux";
import ClubsMain from "../components/Clubs/ClubsMain.component"
import { useEffect } from "react";
import { getClubsDetails } from "../features/clubs/clubs.slice";
import { RootState } from "../store/store";
import Typography from "../styles/typography/Typography.styles";

const ClubsPage = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, error: { errorMessage } } = useSelector((store: RootState) => store.clubs);

  // Assuming you have a user ID stored somewhere (e.g., Redux or Auth context)
  // const userId = /* Get user ID here */

  useEffect(() => {
    dispatch(getClubsDetails('')); // Pass actual user ID
  }, [dispatch]);

  if (isLoading) {
    return <Typography variant="headline3">Loading...</Typography>;
  }

  if (errorMessage) {
    // Handle error gracefully, e.g., display error message
    return <Typography variant="headline3">{errorMessage}</Typography>;
  }

  return <ClubsMain />;
};

export default ClubsPage
