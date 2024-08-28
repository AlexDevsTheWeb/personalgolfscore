import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import BoxBetween from '../../styles/box/BoxBetween.styles';
import { IShots } from '../../types/roundData.types';
import { IRoundTotals } from '../../types/roundTotals.types';
import HolebyholeDialog from '../dialog/HolebyholeDialog.component';
import { StatisticDialog } from '../dialog/StatisticDialog.component';
import ShotsTableHeader from './components/shotsTable/ShotsTableHeader.component';
import ShotsTableTotalsBody from './components/shotsTable/ShotsTableTotalsBody.component';

interface IRoundDataTable {
  roundDate: any,
  roundCourse: string,
  roundPar: number,
  totals: IRoundTotals,
  holes: IShots[]
}

const RoundsDataShotTable = ({ roundDate, roundCourse, roundPar, totals, holes }: IRoundDataTable) => {
  const [open, setOpen] = React.useState(false);
  const [openHolebyhole, setOpenHolebyhole] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickOpenHolebyHole = () => {
    setOpenHolebyhole(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseHolebyHole = () => {
    setOpenHolebyhole(false);
  };


  return (
    <BoxBetween vertical={true}>
      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} />
          <ShotsTableTotalsBody holes={holes} />
        </Table>

      </TableContainer>
      <BoxBetween>
        <BoxBetween>
          <Button variant='contained' onClick={handleClickOpenHolebyHole}>View hole by hole</Button>
          <Button variant="contained" onClick={handleClickOpen}>See round statistics</Button>
        </BoxBetween>
      </BoxBetween>
      <StatisticDialog
        open={open}
        handleClose={handleClose}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={totals}
        shots={holes}
        coursePar={roundPar}
      />
      <HolebyholeDialog
        open={openHolebyhole}
        handleCloseHolebyHole={handleCloseHolebyHole}
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={totals}
        shots={holes}
        coursePar={roundPar}
      />
    </BoxBetween>
  )
}

export default RoundsDataShotTable
