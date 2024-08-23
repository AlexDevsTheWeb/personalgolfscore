import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeeGreenClubs } from '../../features/golfBag/golfBag.slice';
import { resetSetFirstHole } from '../../features/newRound/newRoundMain.slice';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import { getChipClubs, getClubsNames, getGreenClubs } from '../../utils/round/round.utils';
import { StatisticDialog } from '../dialog/StatisticDialog.component';
import RoundsDataShotTable from '../RoundsData/RoundsDataShotTable.component';
import AddSingleHole from './AddSingleHole.component';

const AddNewRoundHoles = () => {

  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch<any>();
  const { setFirstHole, round: { roundDate, roundCourse, roundPar } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { totals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { clubs } = useSelector((store: RootState) => store.golfBag);

  const [holeForm, setHoleForm] = useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const updatedTeeClubs = getClubsNames(clubs);
    const updatedGreenClubs = getGreenClubs(updatedTeeClubs);
    const updatedChipClubs = getChipClubs(updatedTeeClubs);
    dispatch(updateTeeGreenClubs({ updatedTeeClubs, type: 'tee' }));
    dispatch(updateTeeGreenClubs({ updatedGreenClubs, type: 'green' }));
    dispatch(updateTeeGreenClubs({ updatedChipClubs, type: 'chip' }));
  }, [clubs, dispatch]);

  useEffect(() => {
    if (!!setFirstHole) {
      setHoleForm(<AddSingleHole />);
      dispatch(resetSetFirstHole());
    }
  }, [setFirstHole, dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.125 }}>
      <BoxGeneralShadow direction='column' >
        {holeForm}
      </BoxGeneralShadow >
      {
        shots.length > 0 &&
        <BoxGeneralShadow direction='column'>
          <RoundsDataShotTable shots={shots} />
        </BoxGeneralShadow>

      }
      {
        shots.length > 0 &&
        <BoxBetween>
          <Button variant='contained'>Save holes</Button>
          <Button variant="contained" onClick={handleClickOpen}>
            See round statistics
          </Button>
        </BoxBetween>
      }
      <StatisticDialog
        open={open}
        handleClose={handleClose}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={totals}
        shots={shots}
        coursePar={roundPar}
      />
    </Box >
  )
}

export default AddNewRoundHoles

