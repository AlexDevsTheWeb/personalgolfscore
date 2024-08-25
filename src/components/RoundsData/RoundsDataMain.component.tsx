import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import RoundsDataShotTable from './RoundsDataShotTable.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {
  const { isLoading, roundCourse, roundDate } = useSelector((store: RootState) => store.roundsNumber.roundsData);
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);

  const shots = useSelector((store: RootState) => store.roundsNumber.roundsData.shots);

  const roundPar = shots.reduce((acc, curr) => acc + curr.par, 0);

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <BoxBetween vertical={true}>
      <RoundsHeadDetails />
      <RoundsDataShotTable
        roundDate={roundDate}
        roundCourse={roundCourse}
        roundPar={roundPar}
        totals={totals[0]}
        shots={shots} />
    </BoxBetween>
  )
}

export default RoundsDataMain
