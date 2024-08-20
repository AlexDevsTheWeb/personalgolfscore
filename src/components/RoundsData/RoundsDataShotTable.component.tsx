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
  // const { shots } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  const { shots } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" align='center' width={'5%'}>
              hole
            </TableCell>
            <TableCell align='center' width={'10%'}>par</TableCell>
            <TableCell align='center' width={'10%'}>meters</TableCell>
            <TableCell align='center' width={'5%'}>hcp</TableCell>
            <TableCell align='center' width={'5%'}>strokes</TableCell>
            <TableCell align='center' width={'5%'}>points</TableCell>
            <TableCell align='center' width={'10%'}>tee Club</TableCell>
            <TableCell align='center' width={'10%'}>fir</TableCell>
            <TableCell align='center' width={'10%'}>gir</TableCell>
            <TableCell align='center' width={'10%'}>girBogey</TableCell>
            <TableCell align='center' width={'5%'}>putts</TableCell>
            <TableCell align='center' width={'5%'}>sand</TableCell>
            <TableCell align='center' width={'5%'}>water</TableCell>
            <TableCell align='center' width={'5%'}>out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shots.map((shot) => {
            const { holeNumber, driveDistance, hcp, par, strokes, points, teeClub, fairway, gir, girBogey, putts, sand, water, out } = shot;


            // FIXME: calculateStablefordStars is not working anymore
            // const points = calculateStablefordPoints({ hcp, par, strokes, finalPlayerHCP, totalHoles });
            // const hcpStars = calculateStablefordStars({ hcp, par, strokes, finalPlayerHCP, totalHoles });
            return (
              <TableRow key={holeNumber}>
                <TableCell component="th" scope="row" align='center' width={'5%'}>
                  {holeNumber}
                </TableCell>
                <TableCell component="th" scope="row" align='center' width={'5%'}>
                  {par}
                </TableCell>
                <TableCell align='center' width={'10%'}>{`${driveDistance}`}</TableCell>
                <TableCell align='center' width={'5%'}>{hcp}</TableCell>
                {/* <TableCell align='center' width={'10%'}>{`${par} ${hcpStars}`}</TableCell> */}
                <TableCell align='center' width={'5%'}>{`${strokes}`}</TableCell>
                <TableCell align='center' width={'5%'} variant={points && points >= 2 ? 'green' : points === 1 ? 'yellow' : 'red'}>{`${points}`}</TableCell>
                <TableCell align='center' width={'10%'}>{teeClub}</TableCell>
                <TableCell align='center' width={'10%'}>
                  <ShotPosition position={Number(fairway)} />
                </TableCell>
                <TableCell align='center' width={'10%'}>{gir ? 'Yes' : '-'}</TableCell>
                <TableCell align='center' width={'10%'}>{girBogey ? 'Yes' : '-'}</TableCell>
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
