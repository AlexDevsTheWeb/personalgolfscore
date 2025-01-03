import { getPlayerDetails } from "@/features/player/player.slice"
import { getAllRoundsData } from "@/features/rounds/roundsData.slice"
import { getAllRoundsTotals } from "@/features/rounds/roundsTotals.slice"
import useDeviceDetection from "@/hooks/useDeviceDetection.hook"
import { RootState } from "@/store/store"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Rounds from "../Rounds/Rounds.component"
import StatisticsMain from "../Statistics/StatisticsMain.component"
import PlayerDesktop from "./components/PlayerDesktop.component"
import PlayerMobile from "./components/PlayerMobile.component"

const Dashboard = () => {
  const { player } = useSelector((store: RootState) => store.player);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }
  useEffect(() => {
    dispatch(getPlayerDetails(""))
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, []);

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
