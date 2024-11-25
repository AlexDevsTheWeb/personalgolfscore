import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Box, Button, Dialog, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDistanceWithClub } from '../../features/newRound/newRoundDistances.slice';
import { RootState } from '../../store/store';
import { HoleCard, HoleCardContent } from '../../styles';
import BoxNewHole from '../../styles/box/BoxNewHole.styles';
import { IDistance } from '../../types/roundData.types';
import { createDistanceObject } from '../../utils/round/round.utils';
import Select from '../NewRound/Select.component';

interface IClubDistanceDialogProps {
  open: boolean,
  handleClose: any
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ClubDistanceDialog = ({ open, handleClose }: IClubDistanceDialogProps) => {
  const dispatch = useDispatch<any>();
  const { distanceClubs } = useSelector((store: RootState) => store.golfBag);
  const { round } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { roundDistances } = useSelector((store: RootState) => store.newRound.newRoundDistances);

  const [club, setClub] = useState<string>('');
  const [meters, setMeters] = useState<number>(0);

  const saveDistance = (e: any) => {
    const { roundCourse, roundDate, roundID } = round;
    const items = createDistanceObject({ roundID: roundID, roundDistances, course: roundCourse, date: roundDate, club, mt: meters });
    dispatch(addNewDistanceWithClub(items));
    setClub('');
    setMeters(0);
  }

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
              {'Next hole'}
            </Button>
          </HoleCardContent>
        </HoleCard>
      </BoxNewHole>

      {
        roundDistances.map(({ course, date, club, mt, avg }: IDistance, index: number) => {
          return (

            <Box key={index}>
              <Typography>{`${course} - ${date} - ${club} - ${mt} - AVG: ${avg}`}</Typography>
            </Box>
          )
        })
      }

    </Dialog>
  )
}

export default ClubDistanceDialog
