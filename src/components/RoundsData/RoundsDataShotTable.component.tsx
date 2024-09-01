import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import { IShots } from '../../types/roundData.types';
import { IRoundTotals } from '../../types/roundTotals.types';
import ShotsTableHeader from './components/shotsTable/ShotsTableHeader.component';
import ShotsTableTotalsBody from './components/shotsTable/ShotsTableTotalsBody.component';

interface IRoundDataTable {
  roundDate?: any,
  roundCourse?: string,
  roundPar?: number,
  totals: IRoundTotals,
  holes: IShots[],
  onClick?: any,
}

const RoundsDataShotTable = ({ totals, holes, onClick }: IRoundDataTable) => {


  return (
    <BoxBetween>
      <Button variant="contained" onClick={onClick}>Close</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} />
          <ShotsTableTotalsBody holes={holes} />
        </Table>
      </TableContainer>
      {/* <StatisticsPutts putts={totals.putts} gir={totals.gir} score={totals.score} /> */}


      {/* <BoxBetween>
        <Button variant='contained' onClick={handleClickOpenHolebyHole}>View hole by hole</Button>
        <Button variant="contained" onClick={handleClickOpen}>See round statistics</Button>
      </BoxBetween> */}

      {/* <StatisticDialog
        open={openHolebyhole}
        handleClose={handleClose}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={totals}
        shots={holes}
        coursePar={roundPar}
      /> */}
      {/* <HolebyholeDialog
        open={openHolebyhole}
        handleCloseHolebyHole={handleCloseHolebyHole}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={totals}
        shots={holes}
        coursePar={roundPar}
      />  */}
    </BoxBetween>
  )
}

export default RoundsDataShotTable
