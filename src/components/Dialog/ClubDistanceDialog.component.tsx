import { setShowDistances } from '@/features/app/controls.slice';
import { addNewDistanceWithClub } from '@/features/newRound/newRoundDistances.slice';
import { RootState } from '@/store/store';
import BoxNewHole from '@/styles/box/BoxNewHole.styles';
import { HoleCard, HoleCardContent } from '@/styles/index';
import { IClubDistanceDialogProps } from '@/types/clubs.types';
import { IDistance } from '@/types/roundData.types';
import { createDistanceObject, getClubsNames, getDistanceClubs } from '@/utils/round/round.utils';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Box, Button, Dialog, IconButton, SelectChangeEvent, TextField, Toolbar, Typography } from "@mui/material";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../NewRound/components/Select.component';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ClubDistanceDialog = ({ open }: IClubDistanceDialogProps) => {
  const dispatch = useDispatch<any>();
  const { player } = useSelector((store: RootState) => store.player);
  const { round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { roundDistances } = useSelector((store: RootState) => store.newRound.newRoundDistances);

  const golfBag = player?.golfBag;
  const distanceClubs = useMemo(() => {
    if (!golfBag || golfBag.length === 0) {
      return [];
    }
    try {
      const allClubNames = getClubsNames(golfBag);
      return getDistanceClubs(allClubNames);
    } catch (error) {
      console.error("Error deriving distance clubs:", error);
      return [];
    }
  }, [golfBag]);

  const [club, setClub] = useState<string>('');
  const [meters, setMeters] = useState<number>(0);

  const saveDistance = () => {
    const { roundCourse, roundDate } = round;
    if (!club || meters <= 0) {
      console.warn("Please select a club and enter a valid distance > 0");
      return;
    }
    const items = createDistanceObject({ roundDistances, course: roundCourse, date: roundDate, club, mt: meters });
    dispatch(addNewDistanceWithClub(items));
    setClub('');
    setMeters(0);
  }

  const handleClose = () => {
    dispatch(setShowDistances(false));
  }

  const handleClubChange = (e: SelectChangeEvent) => {
    setClub(e.target.value as string);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: 'white !important' }} component="div">
            Club Distances
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            close
          </Button>
        </Toolbar>
      </AppBar>
      <BoxNewHole>
        <HoleCard>
          <HoleCardContent>
            <Select name='clubs' list={distanceClubs} onChange={(e: any) => setClub(e.target.value)} value={club} label='Club' />
            <TextField name='meters' label="Meters done" type='number' onChange={e => setMeters(Number(e.target.value))} value={meters === 0 ? '' : meters} />
            <Button variant='contained' onClick={saveDistance} sx={{ marginTop: '0px' }}>
              {'Add new distance'}
            </Button>
          </HoleCardContent>
        </HoleCard>
      </BoxNewHole>

      {roundDistances.length > 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography gutterBottom>Current Round Distances:</Typography>
          {roundDistances.map(({ club, mt, avg }: IDistance, index: number) => (
            <Box key={`${club}-${index}`} sx={{ mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
              <Typography>
                <strong>{club}:</strong> {mt.join(', ')}m (Avg: {avg}m)
              </Typography>
            </Box>
          ))}
        </Box>
      )}

    </Dialog>
  )
}

export default ClubDistanceDialog

