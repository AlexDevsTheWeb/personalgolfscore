import { Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { IShots } from '../../types/roundData.types';
import ShotsTableBody from './components/shotsTable/ShotsTableBody.component';
import ShotsTableHeader from './components/shotsTable/ShotsTableHeader.component';
import ShotsTableTotalsBody from './components/shotsTable/ShotsTableTotalsBody.component';

interface IRoundDataTable {
  shots: IShots[]
}

const RoundsDataShotTable = ({ shots }: IRoundDataTable) => {

  return (
    <TableContainer component={Paper}>

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <ShotsTableHeader firstLabel='Tot.' singleHole={false} />
        <ShotsTableTotalsBody shots={shots} />
      </Table>

      <Divider />

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <ShotsTableHeader firstLabel='#' singleHole={true} />
        <TableBody>
          {shots.map((shot, index) => {
            return (<ShotsTableBody shot={shot} key={index} />)
          })}
        </TableBody>
      </Table>


    </TableContainer>
  )
}

export default RoundsDataShotTable
