import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import { IRoundTotals } from '../../types/roundTotals.types';
import ShotsTableHeader from './components/shotsTable/ShotsTableHeader.component';
import ShotsTableTotalsBody from './components/shotsTable/ShotsTableTotalsBody.component';

interface IRoundDataTable {
  roundDate?: any,
  roundCourse?: string,
  roundPar?: number,
  totals: IRoundTotals,
  onClick?: any,
}

const RoundsDataShotTable = ({ totals, onClick }: IRoundDataTable) => {


  return (
    <BoxBetween>
      <Button variant="contained" onClick={onClick}>Close</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={true} />
          <ShotsTableTotalsBody firstColumn={false} />
        </Table>
      </TableContainer>
    </BoxBetween>
  )
}

export default RoundsDataShotTable
