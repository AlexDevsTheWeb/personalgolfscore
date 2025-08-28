
import { RootState } from '@/store/store';
import StackNewHole from '@/styles/stack/StackNewHole.styles';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Button, Dialog, Grid, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import AddNewRoundForm from './AddNewRoundForm.component';
import AddNewRoundHoles from './AddNewRoundHoles.component';
import NewRoundMainData from './components/NewRoundMainData.component';
import HolebyHoleTable from './HolebyHoleTable.component';

const NewRoundMain = () => {
  const setFirstHole = useSelector((state: RootState) => state.newRound.newRoundMain.setFirstHole);
  const { holes, holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const [roundTotalsOpen, setRoundTotalsOpen] = useState<boolean>(false);


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

      <Dialog open={roundTotalsOpen} fullScreen onClose={() => setRoundTotalsOpen(false)}
      // slots={{
      // transition: Transition,
      // }}
      >
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
