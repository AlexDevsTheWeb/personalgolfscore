import { getAllRoundsData } from "@/features/rounds/roundsData.slice"
import { getAllRoundsTotals } from "@/features/rounds/roundsTotals.slice"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Player from "../Player/Player.component"
import Rounds from "../Rounds/Rounds.component"

const Dashboard = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRoundsData(""))
    dispatch(getAllRoundsTotals(""))
  }, [dispatch]);

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }

  return (
    <BoxBetween>
      <Player />
      <Rounds />
      <BoxBetween>
        <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
      </BoxBetween>
    </BoxBetween>
  )
}

export default Dashboard
