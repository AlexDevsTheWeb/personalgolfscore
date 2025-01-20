import Rounds from "@/components/Rounds/Rounds.component"
import StatisticsMain from "@/components/Statistics/StatisticsMain.component"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const DashboardContainer = () => {
  const navigate = useNavigate();

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }

  return (
    <>
      <Rounds />
      <Box sx={{ width: '100%' }}>
        <StatisticsMain />
      </Box>
      <BoxBetween>
        <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
        <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
      </BoxBetween>
    </>
  )
}

export default DashboardContainer
