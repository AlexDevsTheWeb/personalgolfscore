import { resetSetFirstHole } from "@/features/newRound/newRoundMain.slice";
import { RootState } from "@/store/store";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/spinner/Spinner.component";
import Rounds from "../Rounds/Rounds.component";
import RoundsButtons from "../Rounds/RoundsButtons.component";
import WizardSetupDialog from "../Wizard/WizardSetupDialog.component";
import ChartsMain from "./components/Charts/ChartsMain.component";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const { player } = useSelector((store: RootState) => store.player);
  const { isLoading } = useSelector((store: RootState) => store.controls);

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
              <Rounds rounds={rounds.slice(0, 5)} />
              <ChartsMain />
              {/* <StatisticsMain /> */}

              <RoundsButtons />
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
    </Box>
  )
}

export default Dashboard
