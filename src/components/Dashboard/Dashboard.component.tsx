import { resetSetFirstHole } from "@/features/newRound/newRoundMain.slice";
import { RootState } from "@/store/store";
import BoxBetween from "@/styles/box/BoxBetween.styles";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/spinner/Spinner.component";
import Rounds from "../Rounds/Rounds.component";
import StatisticsMain from "../Statistics/StatisticsMain.component";
import DistancesTotals from "../Totals/HolebyHole/DistancesTotals.component";
import WizardSetupDialog from "../Wizard/WizardSetupDialog.component";
import FairwayHitsChart from "./components/Charts/FairwayChart.component";
import GirPercentageChart from "./components/Charts/GirChart.component";
import PointsChart from "./components/Charts/PointsChart.component";
import ScoreCharts from "./components/Charts/ScoreChart.component";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const { player } = useSelector((store: RootState) => store.player);
  const { isLoading } = useSelector((store: RootState) => store.controls);

  const handleClickStatistic = () => {
    navigate(`/statistics`);
  };
  const handleAddNewRound = () => {
    dispatch(resetSetFirstHole());
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
        rounds.length !== 0
          ? (
            <>
              <Rounds />
              <Grid container columnGap={5} rowGap={4}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 5 }}>
                  <ScoreCharts />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 5 }}>
                  <PointsChart />
                </Grid>
              </Grid>
              <Grid container columnGap={6} rowGap={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <FairwayHitsChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <GirPercentageChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <DistancesTotals />
                </Grid>
              </Grid>
              <StatisticsMain />
            </>
          )
          :
          (
            <Typography>
              No rounds found. ADD a new round to see statistics.
            </Typography>
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
