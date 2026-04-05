import BoxBetween from "@/styles/box/BoxBetween.styles";
import { ActionTextButtons } from "@/styles/button/Buttons.styles";
import { BoxOverflow } from "@/styles/index";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/zustand";


const RoundsButtons = () => {

  const navigate = useNavigate();
  const resetSetFirstHole = useAppStore((state) => state.resetSetFirstHole);

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleClickAllRounds = () => {
    navigate(`/all-rounds`);
  };
  const handleAddNewRound = () => {
    resetSetFirstHole();
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
      </BoxBetween>
    </BoxOverflow>
  )
}

export default RoundsButtons
