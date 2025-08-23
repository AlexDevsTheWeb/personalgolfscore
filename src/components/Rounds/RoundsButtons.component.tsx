import { resetSetFirstHole } from "@/features/newRound/newRoundMain.slice";
import BoxBetween from "@/styles/box/BoxBetween.styles";
import { ActionTextButtons } from "@/styles/button/Buttons.styles";
import { BoxOverflow } from "@/styles/index";
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
      <BoxBetween sx={{ mt: 0, gap: 0, px: 5 }}>
        <ActionTextButtons text={'Add New Round'} onClick={handleAddNewRound} />
        <ActionTextButtons text={'View Full Statistics'} onClick={handleClickStatistic} />
        {window.location.pathname !== '/all-rounds' &&
          <ActionTextButtons text={'View All Rounds'} onClick={handleClickAllRounds} />
        }
        {/* <Button
          variant='text'
          onClick={handleAddNewRound}
          startIcon={<KeyboardArrowRightIcon />}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              textDecoration: 'underline',
              textUnderlineOffset: '6px'
            },
          }}
        >
          Add new Round
        </Button> */}
        {/* <Button
          variant='text'
          onClick={handleClickStatistic}
        >
          View Full Statistics
          <KeyboardArrowRightIcon />
        </Button> */}
        {/* {window.location.pathname !== '/all-rounds' &&
          <Button
            variant='text'
            onClick={handleClickAllRounds}
          >
            View All Rounds
            <KeyboardArrowRightIcon />
          </Button>
        } */}
      </BoxBetween>
    </BoxOverflow>
  )
}

export default RoundsButtons
