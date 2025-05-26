import { resetNewRoundHoleTmp, setTmpHoleData } from '@/features/hole/holeTmp.slice';
import { addApproachShotDistance, addTeeShotDistance } from '@/features/newRound/newRoundDistances.slice';
import { setNewHole } from '@/features/newRound/newRoundHoles.slice';
import { RootState } from '@/store/store';
import { IAddSingleHoleProps } from '@/types/clubs.types';
import { fairwayValues, greenSideValues, hcpList18, hcpList9, parList } from '@/utils/constant.utils'; // prettier-ignore
import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClubDistanceDialog from '../Dialog/ClubDistanceDialog.component';
import DistancesButton from './components/DistancesButton.component';
import SaveRoundButton from './components/SaveRoundButton.component';
import HoleApproachForm from './components/form/HoleApproachForm.component';
import HoleGeneralForm from './components/form/HoleGeneralForm.component';
import HolePenaltiesForm from './components/form/HolePenaltiesForm.component';
import HoleTeeShotForm from './components/form/HoleTeeShotForm.component';

const AddSingleHole = ({ derivedClubs }: IAddSingleHoleProps) => {
  const dispatch = useDispatch<any>();

  const { round: { roundPlayingHCP, roundHoles } } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holesCompleted } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const { showDistances } = useSelector((store: RootState) => store.controls);

  const [puttsLength, setPuttsLength] = useState<number[]>([]);
  const [puttsNumber, setPuttsNumber] = useState<number[]>([]);
  const [currentHoleNumber, setCurrentHoleNumber] = useState<number>(1);

  useEffect(() => {
    setCurrentHoleNumber(holesCompleted + 1);
  }, [holesCompleted]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(setTmpHoleData({ name, value, roundPlayingHCP, roundHoles, chipClubs: derivedClubs.chipClubs } as any));
  };

  const handleChangePutts = (e: any, puttIndex: number) => {
    const currentLength = puttsLength.length;
    const requiredLength = Math.max(currentLength, puttIndex + 1);
    const newPuttsLength = [...puttsLength];
    while (newPuttsLength.length < requiredLength) {
      newPuttsLength.push(0);
    }
    newPuttsLength[puttIndex] = e.target.value === '' ? 0 : Number(e.target.value);
    setPuttsLength(newPuttsLength);
  };

  useEffect(() => {
    const numPutts = tmpHole.putts || 0;
    setPuttsNumber(Array.from({ length: numPutts }, (_, i) => i + 1));
    setPuttsLength(currentLengths => {
      const newLengths = new Array(numPutts).fill(0);
      for (let i = 0; i < Math.min(currentLengths.length, numPutts); i++) {
        newLengths[i] = currentLengths[i] ?? 0;
      }
      return newLengths;
    });
  }, [tmpHole.putts]);

  const handleSaveHole = () => {

    const { teeClub, driveDistance, distance, par, fairway, toGreen, toGreenMeters } = tmpHole;
    let actualTeeDistance = 0;
    if (par === 3) {
      actualTeeDistance = distance;
    } else {
      actualTeeDistance = driveDistance > 0 ? driveDistance : 0;
    }
    if (teeClub && actualTeeDistance > 0) {
      dispatch(addTeeShotDistance({ club: teeClub, distance: actualTeeDistance }));
    }
    if (toGreen && typeof toGreenMeters === 'number' && toGreenMeters > 0) {
      dispatch(addApproachShotDistance({ club: toGreen, distance: toGreenMeters }));
    }

    const holeAdjusted = {
      ...tmpHole,
      holeNumber: holesCompleted + 1,
      fairway: Number(fairway) || 0,
      puttsLength: [...puttsLength]
    };
    dispatch(setNewHole({ holeAdjusted, roundPlayingHCP, roundHoles, holesCompleted }));
    dispatch(resetNewRoundHoleTmp());
    setPuttsLength([]);
    setPuttsNumber([]);
  };

  const isSaveDisabled = () => {
    return tmpHole.hcp === 0 || tmpHole.par === 0 || tmpHole.strokes === 0;
  }



  const hcpList = Number(roundHoles) === 18 ? hcpList18 : hcpList9;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 9, lg: 11 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Box>
                <Typography variant="headline6" gutterBottom component="div">
                  Hole {currentHoleNumber}: General Info
                </Typography>
                <HoleGeneralForm
                  holeData={tmpHole}
                  hcpList={hcpList}
                  parList={parList}
                  puttsNumber={puttsNumber}
                  currentHoleNumber={currentHoleNumber}
                  onChange={handleChange}
                  onChangePutts={handleChangePutts}
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="headline6" gutterBottom component="div">
                  Tee Shot
                </Typography>
                <HoleTeeShotForm
                  holeData={tmpHole}
                  teeClubs={derivedClubs.teeClubs}
                  fairwayValues={fairwayValues}
                  onChange={handleChange}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Box>
                <Typography variant="headline6" gutterBottom component="div">
                  Approach & Green
                </Typography>
                <HoleApproachForm
                  holeData={tmpHole}
                  greenClubs={derivedClubs.greenClubs}
                  chipClubs={derivedClubs.chipClubs}
                  greenSideValues={greenSideValues}
                  onChange={handleChange}
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="headline6" gutterBottom component="div">
                  Penalties
                </Typography>
                <HolePenaltiesForm
                  holeData={tmpHole}
                  onChange={handleChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 3, lg: 1 }}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="headline6" gutterBottom component="div" sx={{ mb: 2 }}>
            Actions
          </Typography>
          <Stack gap={2}>
            <SaveRoundButton onSave={handleSaveHole} disabled={isSaveDisabled()} />
            <DistancesButton />
          </Stack>
        </Paper>
      </Grid>
      {!!showDistances && <ClubDistanceDialog open={showDistances} />}
    </Grid>
  )
}

export default AddSingleHole
