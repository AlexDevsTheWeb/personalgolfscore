
import StackNewHole from '@/styles/stack/StackNewHole.styles';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AppBar, Button, Dialog, Grid, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import AddNewRoundForm from './AddNewRoundForm.component';
import AddNewRoundHoles from './AddNewRoundHoles.component';
import NewRoundMainData from './components/NewRoundMainData.component';
import HolebyHoleTable from './HolebyHoleTable.component';
import { useAppStore } from '@/store/zustand';

const NewRoundMain = () => {
  const newRoundMain = useAppStore((state) => state.newRoundMain);
  const setFirstHole = newRoundMain.setFirstHole;
  const round = newRoundMain.round;
  const holes = useAppStore((state) => state.newRoundHoles.holes);
  const roundTotals = useAppStore((state) => state.newRoundTotals.roundTotals);
  const initialHCP = useAppStore((state) => state.player?.initialHCP) ?? null;
  const roundsListLength = useAppStore((state) => state.roundsList.length);
  const [roundTotalsOpen, setRoundTotalsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const showFirstRoundGuard = roundsListLength === 0 && initialHCP == null;


  const handleStatisticsButton = () => {
    setRoundTotalsOpen(true);
  }

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Grid container spacing={2} columns={{ xs: 1 }}>
      {showFirstRoundGuard && (
        <Grid size={{ xs: 12 }}>
          <Alert
            severity="warning"
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => navigate('/settings')}>
                Go to Settings
              </Button>
            }
          >
            Set your Initial Handicap in Settings before saving your first round.
          </Alert>
        </Grid>
      )}
      <Grid size={{ xs: 12 }}>
        <StackNewHole>

          {setFirstHole && <NewRoundMainData />}
          {setFirstHole && <AddNewRoundHoles />}
        </StackNewHole>
      </Grid>

      <Grid size={{ xs: 1 }} sx={{ justifyContent: 'center' }}>
        <Button variant='linkDark' onClick={handleStatisticsButton} sx={{ width: '100%' }}>
          statistics
        </Button>
      </Grid>

      {holes.length > 0 &&
        <Grid size={{ xs: 12 }}>
          <HolebyHoleTable holes={holes} />
        </Grid>
      }

      <AddNewRoundForm />

      <Dialog open={roundTotalsOpen} fullScreen onClose={() => setRoundTotalsOpen(false)}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ padding: '0px 20px' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setRoundTotalsOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} component="div">
              Complete round statistics
            </Typography>

          </Toolbar>
        </AppBar>
        <HolebyHoleTotals roundTotals={roundTotals} par={Number(round.roundPar)} />
      </Dialog>
    </Grid>
  )
}

export default NewRoundMain
