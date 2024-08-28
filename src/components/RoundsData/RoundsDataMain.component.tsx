import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import RoundsDataShotTable from './RoundsDataShotTable.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {
  // const { isLoading, mainData, holes } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  const { isLoading, mainData, holes } = useSelector((store: RootState) => store.singleRound.roundHoles);
  const { roundTotals } = useSelector((store: RootState) => store.singleRound.roundTotals);

  // const roundPar = holes.reduce((acc: number, curr: any) => acc + curr.par, 0);
  const roundPar = roundTotals.mainData.coursePar;

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <BoxBetween vertical={true}>
      <RoundsHeadDetails />
      <RoundsDataShotTable
        roundDate={mainData.roundDate}
        roundCourse={mainData.roundCourse}
        roundPar={roundPar}
        totals={roundTotals}
        holes={holes} />
    </BoxBetween>
  )
}

export default RoundsDataMain
