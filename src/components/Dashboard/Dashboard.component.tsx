import useDeviceDetection from "@/hooks/useDeviceDetection.hook"
import { RootState } from "@/store/store"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { Box, Button } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Rounds from "../Rounds/Rounds.component"
import StatisticsMain from "../Statistics/StatisticsMain.component"
import PlayerDesktop from "./components/PlayerDesktop.component"
import PlayerMobile from "./components/PlayerMobile.component"

const Dashboard = () => {
  const navigate = useNavigate();
  const { player } = useSelector((store: RootState) => store.player);

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }

  return (
    <BoxBetween>
      {
        !useDeviceDetection().isMobile ?
          <PlayerDesktop player={player} />
          :
          <PlayerMobile player={player} />
      }
      <Rounds />
      <Box sx={{ width: '100%' }}>
        <StatisticsMain />
      </Box>

      <BoxBetween>
        <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
      </BoxBetween>
    </BoxBetween>
  )
}

export default Dashboard
