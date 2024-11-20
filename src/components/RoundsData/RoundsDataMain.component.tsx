import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import HolebyHoleTable from '../NewRound/HolebyHoleTable.component';

import { useParams } from 'react-router-dom';
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';
import HolebyHoleTotals from '../Totals/HolebyHole/HolebyHoleTotals.component';
import TableDesktop from './components/roundData/TableDekstop.component';
import TableMobile from './components/roundData/TableMobile.component';


const RoundsDataMain = () => {
  const params = useParams();
  const dispatch = useDispatch<any>();

  const { holes } = useSelector((store: RootState) => store.singleRound.roundHoles);
  const { roundTotals } = useSelector((store: RootState) => store.singleRound.roundTotals);
  const { rounds } = useSelector((store: RootState) => store.rounds);

  const round = rounds.filter((r) => r.roundID === params.roundID);

  return (
    <BoxBetween sx={{ width: '100%' }}>
      {
        !useDeviceDetection().isMobile ?
          <TableDesktop round={round[0]} />
          :
          <TableMobile round={round[0]} />
      }
      {holes.length > 0 && <HolebyHoleTotals roundTotals={roundTotals} />}
      {holes.length > 0 && <HolebyHoleTable holes={holes} />}
    </BoxBetween>
  )
}

export default RoundsDataMain
