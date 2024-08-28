import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeeGreenClubs } from '../../features/golfBag/golfBag.slice';
import { resetSetFirstHole } from '../../features/newRound/newRoundMain.slice';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import { getChipClubs, getClubsNames, getGreenClubs } from '../../utils/round/round.utils';
import HolebyholeDialog from '../dialog/HolebyholeDialog.component';
import { StatisticDialog } from '../dialog/StatisticDialog.component';
import RoundsDataShotTable from '../RoundsData/RoundsDataShotTable.component';
import AddSingleHole from './AddSingleHole.component';

const AddNewRoundHoles = () => {

  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch<any>();
  const { setFirstHole, round: { roundDate, roundCourse, roundPar } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { holes } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const { clubs } = useSelector((store: RootState) => store.golfBag);
  const [openHolebyhole, setOpenHolebyhole] = React.useState(false);
  const [holeForm, setHoleForm] = useState<any>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenHolebyHole = () => {
    setOpenHolebyhole(true);
  };

  const handleCloseHolebyHole = () => {
    setOpenHolebyhole(false);
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
  }, [setFirstHole, dispatch]);

  return (
    <BoxBetween sx={{ display: 'flex', flexDirection: 'column', gap: 1.125 }}>
      <BoxGeneralShadow direction='column'>
        {holeForm}
      </BoxGeneralShadow>
      {
        holes.length > 0 &&
        <BoxGeneralShadow direction='column' sx={{ width: '100% !important' }}>
          <RoundsDataShotTable
            roundDate={roundDate}
            roundPar={roundPar}
            roundCourse={roundCourse}
            totals={roundTotals}
            holes={holes} />
        </BoxGeneralShadow>
      }
      {/* {
        holes.length > 0 &&
        <BoxBetween>
          <Button variant='contained' onClick={() => console.log("save all")}>Save holes</Button>
          <Button variant='contained' onClick={handleClickOpenHolebyHole}>View hole by hole</Button>
          <Button variant="contained" onClick={handleClickOpen}>See round statistics</Button>
        </BoxBetween>
      } */}
      <HolebyholeDialog
        open={openHolebyhole}
        handleCloseHolebyHole={handleCloseHolebyHole}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={roundTotals}
        shots={holes}
        coursePar={roundPar}
      />
      <StatisticDialog
        open={open}
        handleClose={handleClose}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={roundTotals}
        shots={holes}
        coursePar={roundPar}
      />
    </BoxBetween >
  )
}

export default AddNewRoundHoles

