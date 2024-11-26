import { getAllRoundsData } from "@/features/rounds/roundsData.slice"
import { getAllRoundsTotals } from "@/features/rounds/roundsTotals.slice"
import useDeviceDetection from "@/hooks/useDeviceDetection.hook"
import { RootState } from "@/store/store"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Rounds from "../Rounds/Rounds.component"
import TableDesktop from "./components/TableDesktop.component"
import TableMobile from "./components/TableMobile.component"

const Dashboard = () => {
  const { player } = useSelector((store: RootState) => store.player);
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
      {/* <Player /> */}
      {
        !useDeviceDetection().isMobile ?
          <TableDesktop player={player} />
          :
          <TableMobile player={player} />
      }
      <Rounds />
      <BoxBetween>
        <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
      </BoxBetween>
    </BoxBetween>
  )
}

export default Dashboard
