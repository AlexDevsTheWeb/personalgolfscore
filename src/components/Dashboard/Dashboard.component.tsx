import { RootState } from "@/store/store";
import BoxBetween from "@/styles/box/BoxBetween.styles";
import Grid from "@/styles/grid/Grid2.styles";
import { Box, Button, Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/spinner/Spinner.component";
import Rounds from "../Rounds/Rounds.component";
import StatisticsMain from "../Statistics/StatisticsMain.component";
import DistancesTotals from "../Totals/HolebyHole/DistancesTotals.component";
import WizardSetupDialog from "../Wizard/WizardSetupDialog.component";
import FairwayHitsChart from "./components/Charts/FairwayChart.component";
import GirPercentageChart from "./components/Charts/GirChart.component";
import PointsChart from "./components/Charts/PointsChart.component";
import ScoreCharts from "./components/Charts/ScoreChart,component";


const Dashboard = () => {
  const navigate = useNavigate();

  const { rounds } = useSelector((store: RootState) => store.rounds);
  const { player } = useSelector((store: RootState) => store.player);
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
      {player?.uid && !player.isSetupComplete && (
        <WizardSetupDialog open={!player.isSetupComplete} playerUid={player.uid} />
      )}
      {
        // Display these components only if there are rounds
        rounds.length !== 0 && (
          <>
            <Rounds />
            <Grid2 container>
              <Grid><ScoreCharts /></Grid>
              <Grid><PointsChart /></Grid>
            </Grid2>
            <Grid2 container>
              <Grid><FairwayHitsChart /></Grid>
              <Grid><GirPercentageChart /></Grid>
              <Grid><DistancesTotals /></Grid>
            </Grid2>
            <StatisticsMain />
          </>
        )
      }
      <BoxBetween>
        <Button
          variant='contained'
          onClick={handleAddNewRound}
        >
          Add new round
        </Button>
        <Button
          variant='contained'
          onClick={handleClickStatistic}
          disabled={rounds.length === 0}
        >
          See statistics
        </Button>
      </BoxBetween>
    </Box >
  )
}

export default Dashboard
