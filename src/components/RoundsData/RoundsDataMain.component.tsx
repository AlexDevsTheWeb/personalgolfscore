import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import RoundsDataShotTable from './RoundsDataShotTable.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {

  const { isLoading, mainData } = useSelector((store: RootState) => store.singleRound.roundHoles);
  const { roundTotals } = useSelector((store: RootState) => store.singleRound.roundTotals);
  const roundPar = roundTotals.mainData.coursePar;

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }


  return (
    <BoxBetween>
      <RoundsHeadDetails />
      {roundTotals
        ? <RoundsDataShotTable
          roundDate={mainData.roundDate}
          roundCourse={mainData.roundCourse}
          roundPar={roundPar}
          totals={roundTotals}
        />
        : <Typography>Loading ...</Typography>
      }
    </BoxBetween>
  )
}

export default RoundsDataMain
