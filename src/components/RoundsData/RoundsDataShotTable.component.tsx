import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableCell, TableRow } from '../../styles';
import { IShots } from '../../types/roundData.types';
import { ShotPosition } from '../common/shotPositions/ShotPosition.component';

interface IRoundDataTable {
  shots: IShots[]
}

const RoundsDataShotTable = ({ shots }: IRoundDataTable) => {

  console.log("shots: ", shots)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row" align='center' width={'5%'}>
              hole
            </TableCell>
            <TableCell align='center' width={'5%'}>par</TableCell>
            <TableCell align='center' width={'5%'}>hcp</TableCell>
            <TableCell align='center' width={'5%'}>strokes</TableCell>
            <TableCell align='center' width={'10%'}>meters</TableCell>
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

            return (
              <TableRow key={holeNumber}>
                <TableCell component="th" scope="row" align='center' width={'5%'}>{holeNumber}</TableCell>
                <TableCell component="th" scope="row" align='center' width={'5%'}>{par}</TableCell>
                <TableCell align='center' width={'5%'}>{hcp}</TableCell>
                <TableCell align='center' width={'5%'}>{strokes}</TableCell>
                <TableCell align='center' width={'10%'}>{driveDistance}</TableCell>
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
          <TableRow key={'last'}>
            <TableCell component="th" scope="row" align='center' width={'5%'}>Totals / AVG</TableCell>
            <TableCell component="th" scope="row" align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.par, 0).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.hcp, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.hcp, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.strokes, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.strokes, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'10%'}>
              {`${shots.reduce((acc, curr) => acc + curr.driveDistance, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.driveDistance, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.points, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.points, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'10%'}></TableCell>
            <TableCell align='center' width={'10%'}></TableCell>
            <TableCell align='center' width={'10%'}></TableCell>
            <TableCell align='center' width={'10%'}></TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.putts, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.putts, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.sand, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.sand, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.water, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.water, 0) / shots.length).toFixed(2)}`}
            </TableCell>
            <TableCell align='center' width={'5%'}>
              {`${shots.reduce((acc, curr) => acc + curr.out, 0).toFixed(2)} / ${(shots.reduce((acc, curr) => acc + curr.out, 0) / shots.length).toFixed(2)}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default RoundsDataShotTable
