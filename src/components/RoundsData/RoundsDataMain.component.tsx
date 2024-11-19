import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import HolebyHoleTable from '../NewRound/HolebyHoleTable.component';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import RoundsHeadDetails from './RoundsHeadDetails.component';

const RoundsDataMain = () => {

  const { isLoading, mainData, holes } = useSelector((store: RootState) => store.singleRound.roundHoles);
  const { roundTotals } = useSelector((store: RootState) => store.singleRound.roundTotals);
  const roundPar = roundTotals.mainData.coursePar;

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }


  return (
    <BoxBetween>
      <RoundsHeadDetails />
      {holes.length > 0 && <HolebyHoleTotals roundTotals={roundTotals} />}
      {holes.length > 0 && <HolebyHoleTable holes={holes} />}

    </BoxBetween>
  )
}

export default RoundsDataMain
