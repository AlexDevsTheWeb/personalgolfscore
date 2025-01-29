import { RootState } from "@/store/store"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { Box, Button } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Spinner from "../common/spinner/Spinner.component"
import Rounds from "../Rounds/Rounds.component"
import StatisticsMain from "../Statistics/StatisticsMain.component"

const Dashboard = () => {
  const navigate = useNavigate();

  const { rounds } = useSelector((store: RootState) => store.rounds);
  const { isLoading } = useSelector((store: RootState) => store.controls);

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    navigate('/addNewRound')
  }

  if (!!isLoading) {
    return <Spinner />
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }} gap={2}>
      {
        rounds.length !== 0 && (
          <>
            <Rounds />
            <StatisticsMain />
            <BoxBetween>
              <Button variant='contained' onClick={handleAddNewRound}>Add new round</Button>
              <Button variant='contained' onClick={handleClickStatistic}>See statistics</Button>
            </BoxBetween>
          </>
        )
      }
    </Box>
  )
}

export default Dashboard
