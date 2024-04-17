import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { TableCell, TableRow } from '../../styles';
import { calculateStablefordStars } from '../../utils/shots/shots.utils';
import { ShotPosition } from '../common/shotPositions/ShotPosition.component';

const RoundsDataShotTable = () => {
  const params = useParams();
  const { shots } = useSelector((store: RootState) => store.roundsNumber.roundsData);
  const { rounds } = useSelector((store: RootState) => store.rounds);

  const totalHoles = shots.length;
  const playerHCP = rounds?.filter((r: any) => r.roundID === params.roundID);
  const finalPlayerHCP = playerHCP[0]?.roundPlayingHCP;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" align='center' width={'5%'}>
              hole
            </TableCell>
            <TableCell align='center' width={'10%'}>meters</TableCell>
            <TableCell align='center' width={'5%'}>hcp</TableCell>
            <TableCell align='center' width={'10%'}>par</TableCell>
            <TableCell align='center' width={'5%'}>strokes</TableCell>
            <TableCell align='center' width={'5%'}>points</TableCell>
            <TableCell align='center' width={'10%'}>tee Club</TableCell>
            <TableCell align='center' width={'10%'}>fir</TableCell>
            <TableCell align='center' width={'10%'}>gir</TableCell>
            <TableCell align='center' width={'5%'}>putts</TableCell>
            <TableCell align='center' width={'5%'}>sand</TableCell>
            <TableCell align='center' width={'5%'}>water</TableCell>
            <TableCell align='center' width={'5%'}>out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shots.map((shot) => {
            const { holeNumber, distance, hcp, par, strokes, points, teeClub, fir, gir, putts, sand, water, out } = shot;

            // const points = calculateStablefordPoints({ hcp, par, strokes, finalPlayerHCP, totalHoles });
            const hcpStars = calculateStablefordStars({ hcp, par, strokes, finalPlayerHCP, totalHoles });
            return (
              <TableRow key={holeNumber}>
                <TableCell component="th" scope="row" align='center' width={'5%'}>
                  {holeNumber}
                </TableCell>
                <TableCell align='center' width={'10%'}>{`${distance}`}</TableCell>
                <TableCell align='center' width={'5%'}>{hcp}</TableCell>
                <TableCell align='center' width={'10%'}>{`${par} ${hcpStars}`}</TableCell>
                <TableCell align='center' width={'5%'}>{`${strokes}`}</TableCell>
                <TableCell align='center' width={'5%'} variant={points && points >= 2 ? 'green' : points === 1 ? 'yellow' : 'red'}>{`${points}`}</TableCell>
                <TableCell align='center' width={'10%'}>{teeClub}</TableCell>
                <TableCell align='center' width={'10%'}>
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
    </TableContainer >
  )
}

export default RoundsDataShotTable
