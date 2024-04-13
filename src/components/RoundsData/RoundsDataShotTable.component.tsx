import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TableCell, TableRow } from '../../styles';
import { ShotPosition } from '../common/shotPositions/ShotPosition.component';

const RoundsDataShotTable = () => {
  const { shots } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" align='center' width={'5%'}>
              hole Number
            </TableCell>
            <TableCell align='center' width={'10%'}>mt.</TableCell>
            <TableCell align='center' width={'10%'}>hcp</TableCell>
            <TableCell align='center' width={'10%'}>par</TableCell>
            <TableCell align='center' width={'5%'}>shots</TableCell>
            <TableCell align='center' width={'10%'}>tee Club</TableCell>
            <TableCell align='center' width={'20%'}>fir</TableCell>
            <TableCell align='center' width={'10%'}>gir</TableCell>
            <TableCell align='center' width={'5%'}>putts</TableCell>
            <TableCell align='center' width={'5%'}>sand</TableCell>
            <TableCell align='center' width={'5%'}>water</TableCell>
            <TableCell align='center' width={'5%'}>out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shots.map((shot) => {
            const { holeNumber, distance, hcp, par, shots, teeClub, fir, gir, putts, sand, water, out } = shot;
            return (
              <TableRow key={holeNumber}>
                <TableCell component="th" scope="row" align='center' width={'5%'}>
                  {holeNumber}
                </TableCell>
                <TableCell align='center' width={'10%'}>{`${distance} mt.`}</TableCell>
                <TableCell align='center' width={'10%'}>{hcp}</TableCell>
                <TableCell align='center' width={'10%'}>{par}</TableCell>
                <TableCell align='center' width={'5%'}>{shots}</TableCell>
                <TableCell align='center' width={'10%'}>{teeClub}</TableCell>
                <TableCell align='center' width={'20%'}>
                  <ShotPosition position={fir} />
                </TableCell>
                <TableCell align='center' width={'10%'}>{gir ? 'Yes' : '-'}</TableCell>
                <TableCell align='center' width={'5%'}>{putts}</TableCell>
                <TableCell align='center' width={'5%'}>{sand !== 0 ? sand : '-'}</TableCell>
                <TableCell align='center' width={'5%'}>{water !== 0 ? water : '-'}</TableCell>
                <TableCell align='center' width={'5%'}>{out !== 0 ? out : '-'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RoundsDataShotTable
