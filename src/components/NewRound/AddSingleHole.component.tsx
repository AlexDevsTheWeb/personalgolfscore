import { RootState } from '@/store/store';
import { IAddSingleHoleProps } from '@/types/clubs.types';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils'; // prettier-ignore
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import MissingShotsDialog from '../Dialog/MissingShotsDialog.component';
import PuttsInputDialog from '../Dialog/PuttsInputDialog.component'; // Import the new dialog

import { useApproachDetailsDialog } from '@/hooks/useApproachDetailsDialog.hook';
import { useHoleFormManager } from '@/hooks/useHoleFormManager.component';
import { usePuttsInputDialog } from '@/hooks/usePuttsInputDialog.hook';
import { useTeeShotDetailsDialog } from '@/hooks/useTeeShotDetailsDialog.hook';
import ApproachDetailsDialog from '../Dialog/ApproachDialog.component';
import TeeShotDetailsDialog from '../Dialog/TeeShotsDialog.component'; // Assuming TeeShotsDialog is in the general Dialog folder
import HoleGeneralForm from './components/HoleGeneralForm.component';
import SaveRoundButton from './components/SaveRoundButton.component';

const AddSingleHole = ({ derivedClubs }: IAddSingleHoleProps) => {
  const dispatch = useDispatch<any>();
  const { round: { roundPlayingHCP, roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { showDistances } = useSelector((store: RootState) => store.controls);

  const [puttsLength, setPuttsLength] = useState<number[]>([]);
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(1);

  useEffect(() => {
    setCurrentHoleNumber(holesCompleted + 1);
  }, [holesCompleted]);

  const {
    handleChange,
    handleSaveHole,
    isSaveDisabled,
    missingShotsDialogProps,
  } = useHoleFormManager({
    tmpHole,
    derivedClubs,
    roundPlayingHCP,
    roundHoles,
    holesCompleted,
    puttsLength, // Pass current puttsLength
    fairwayValuesConstant: fairwayValues,
  });

  const { puttsDialogProps } = usePuttsInputDialog({
    tmpHolePutts: tmpHole.putts || 0,
    initialPuttsLength: puttsLength,
    onPuttsLengthChange: setPuttsLength, // Callback to update parent state
  });

  const { teeShotDialogProps } = useTeeShotDetailsDialog({
    tmpHole,
    fairwayValuesConstant: fairwayValues,
    roundPlayingHCP,
    roundHoles,
    derivedClubsChipClubs: derivedClubs.chipClubs,
  });

  const { approachDialogProps } = useApproachDetailsDialog({
    tmpHole,
    derivedClubsChipClubs: derivedClubs.chipClubs,
    greenSideValuesConstant: greenSideValues,
    roundPlayingHCP,
    puttsLength, // Pass puttsLength
    roundHoles,
  });

  // Effect to reset puttsLength when a hole is successfully saved (tmpHole is reset)
  useEffect(() => {
    if (tmpHole.holeNumber === 0 && tmpHole.par === 0 && tmpHole.strokes === 0) { // Heuristic for reset
      setPuttsLength([]);
    }
  }, [tmpHole.holeNumber, tmpHole.par, tmpHole.strokes]);

  const hcpList = Number(roundHoles) === 18 ? hcpList18 : hcpList9;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 9, lg: 11 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Box>
                <Typography variant="headline6" gutterBottom component="div">
                  Hole {currentHoleNumber}: General Info
                </Typography>
                <HoleGeneralForm
                  holeData={tmpHole}
                  hcpList={hcpList}
                  parList={parList}
                  teeClubs={derivedClubs.teeClubs}
                  greenClubs={derivedClubs.greenClubs}
                  fairwayValues={fairwayValues}
                  currentHoleNumber={currentHoleNumber}
                  onChange={handleChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 1, lg: 1 }}>
        <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
          <Typography variant="headline6" gutterBottom component="div">
            Actions
          </Typography>
          <SaveRoundButton onSave={handleSaveHole} disabled={isSaveDisabled()} />
        </Paper>
      </Grid>
      {!!showDistances && <ClubDistanceDialog open={showDistances} />}
      <MissingShotsDialog {...missingShotsDialogProps} />
      <PuttsInputDialog {...puttsDialogProps} />
      <TeeShotDetailsDialog {...teeShotDialogProps} />
      <ApproachDetailsDialog {...approachDialogProps} />
    </Grid>
  )
}

export default AddSingleHole
