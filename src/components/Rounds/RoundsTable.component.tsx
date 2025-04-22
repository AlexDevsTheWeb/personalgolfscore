import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import BoxRoundsTable from '@/styles/box/BoxRoundsTable.styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '../../styles';

const RoundsTable = () => {
  const navigate = useNavigate();
  const { rounds } = useSelector((store: RootState) => store.rounds);

  const handleClick = (id: string) => {
    navigate(`/round/${id}`);
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ minWidth: useDeviceDetection().isMobile ? 300 : 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              useDeviceDetection().isMobile
                ?
                <>
                  <TableCell align='center' space='10px'>Date</TableCell>
                  <TableCell align='left' space='10px' width={300} >Course</TableCell>

                  <TableCell align='center' space='10px'>Par</TableCell>
                  <TableCell align='center' space='10px'>HCP</TableCell>
                  <TableCell align='center' space='10px'>score</TableCell>
                  <TableCell align='center' space='10px'>vs. Par</TableCell>
                  {/* <TableCell align='right' width={20}>&nbsp;</TableCell> */}
                </>
                :
                <>
                  <TableCell align='center' space='10px'>Date</TableCell>
                  <TableCell align='left' width={500} space='10px'>Course</TableCell>
                  <TableCell align='left' space='10px'>Tee</TableCell>
                  <TableCell align='center' space='10px'>Holes</TableCell>
                  <TableCell align='center' space='10px'>Par</TableCell>
                  <TableCell align='center' space='10px'>HCP</TableCell>
                  <TableCell align='center' space='10px'>score</TableCell>
                  <TableCell align='center' space='10px'>vs. Par</TableCell>
                  {/* <TableCell align='right' width={50}>&nbsp;</TableCell> */}
                </>
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => {
            const total = Number(round.totals.score.totals);
            const par = Number(round.roundPar);
            const roundPlayingHCP = Number(round.roundPlayingHCP);

            const netScore = total - par;
            const grossScore = total - (par + roundPlayingHCP);

            const props = {
              netScore,
              grossScore
            };

            return (
              <TableRow key={round.id} onClick={() => handleClick(round.id.toString())} sx={{ cursor: 'pointer' }}>
                {
                  useDeviceDetection().isMobile
                    ? <>
                      <TableCell component="th" scope="row" align='center'>
                        {dayjs(round.roundDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='left'>{round.roundCourse}</TableCell>

                      <TableCell align='center'>{total}</TableCell>
                      <TableCell align='center'>{roundPlayingHCP}</TableCell>
                      <TableCell align='center'>{total}</TableCell>
                      <TableCell align='center'>{`${netScore} | ${grossScore}`}</TableCell>
                      {/* <TableCell align={'right'}>
                        <Button onClick={() => handleClick(round.general.roundID.toString())}>
                          <ArrowCircleRightRoundedIcon />
                        </Button>
                      </TableCell> */}
                    </>
                    : <>
                      <TableCell component="th" scope="row" align='center'>
                        {dayjs(round.roundDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align='left'>{round.roundCourse}</TableCell>
                      <TableCell align='left'>{round.roundTee}</TableCell>
                      <TableCell align='center'>{round.holes.length}</TableCell>
                      <TableCell align='center'>{total}</TableCell>
                      <TableCell align='center'>{roundPlayingHCP}</TableCell>
                      <TableCell align='center'>{total}</TableCell>
                      <TableCell align='center'>
                        <BoxRoundsTable props={props} />
                      </TableCell>
                      {/* <TableCell align={'right'}>
                        <Button onClick={() => handleClick(round.general.roundID.toString())}>
                          <ArrowCircleRightRoundedIcon />
                        </Button>
                      </TableCell> */}
                    </>
                }

              </TableRow>
            )
          })}
        </TableBody>
      </Table >
    </TableContainer >
  );
}

export default RoundsTable
