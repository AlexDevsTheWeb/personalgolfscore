import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import { IRoundDataTableProps } from '../../types/props.types';
import ShotsTableHeader from './components/shotsTable/ShotsTableHeader.component';
import ShotsTableTotalsBody from './components/shotsTable/ShotsTableTotalsBody.component';

const RoundsDataShotTable = ({ roundTotals, onClick }: IRoundDataTableProps) => {
  return (
    <BoxBetween>
      <Button variant="contained" onClick={onClick}>Close</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={true} />
          <ShotsTableTotalsBody firstColumn={false} roundTotals={roundTotals} />
        </Table>
      </TableContainer>
    </BoxBetween>
  )
}

export default RoundsDataShotTable
