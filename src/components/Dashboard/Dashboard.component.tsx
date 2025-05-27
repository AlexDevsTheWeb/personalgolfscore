import { resetSetFirstHole } from "@/features/newRound/newRoundMain.slice";
import { RootState } from "@/store/store";
import BoxBetween from "@/styles/box/BoxBetween.styles";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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
import PuttsChart from "./components/Charts/PuttsChart.component";
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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', py: 1 }} gap={2}>
      {player?.uid && !player.isSetupComplete && (
        <WizardSetupDialog open={!player.isSetupComplete} playerUid={player.uid} />
      )}
      {
        rounds.length > 0
          ? (
            <>
              <Rounds />

              <Typography variant="headline6" component="h2" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
                Performance Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ScoreCharts />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <PointsChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                  <DistancesTotals />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                  <FairwayHitsChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 2 }}>
                  <GirPercentageChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                  <PuttsChart />
                </Grid>

              </Grid>

              <Typography variant="headline6" component="h2" gutterBottom sx={{ mt: 3, textAlign: 'center' }}>
                All Statistics
              </Typography>
              <StatisticsMain />

              <BoxBetween sx={{ gap: 0, mt: 0 }}>
                <Button
                  variant='contained'
                  onClick={handleAddNewRound}
                >
                  Add Another Round
                </Button>
                <Button
                  variant='contained'
                  onClick={handleClickStatistic}
                >
                  View Full Statistics
                </Button>
              </BoxBetween>
            </>
          )
          :
          (
            <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="headline6" component="h2" gutterBottom>
                Welcome to Your Golf Dashboard!
              </Typography>
              <Typography variant="body" color="text.secondary" sx={{ mb: 2 }}>
                It looks like you haven't recorded any rounds yet.
                <br />
                Add your first round to start tracking your performance and unlock detailed statistics.
              </Typography>
              <Button
                variant='contained'
                size="large"
                onClick={handleAddNewRound}
              >
                Add Your First Round
              </Button>
            </Paper>
          )
      }
    </Box >
  )
}

export default Dashboard
