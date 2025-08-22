import { resetSetFirstHole } from "@/features/newRound/newRoundMain.slice";
import BoxBetween from "@/styles/box/BoxBetween.styles";
import { BoxOverflow } from "@/styles/index";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RoundsButtons = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleClickAllRounds = () => {
    navigate(`/all-rounds`);
  };
  const handleAddNewRound = () => {
    dispatch(resetSetFirstHole());
    navigate('/addNewRound')
  }

  return (
    <BoxOverflow direction='horizontal' variant='table'>
      <BoxBetween sx={{ mt: 0, gap: 0 }}>
        <Button
          variant='contained'
          onClick={handleAddNewRound}
        >
          Add new Round
        </Button>
        <Button
          variant='contained'
          onClick={handleClickStatistic}
        >
          View Full Statistics
        </Button>
        {window.location.pathname !== '/all-rounds' &&
          <Button
            variant='contained'
            onClick={handleClickAllRounds}
          >
            View All Rounds
          </Button>
        }
      </BoxBetween>
    </BoxOverflow>
  )
}

export default RoundsButtons
