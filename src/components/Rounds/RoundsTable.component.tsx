import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import BoxRoundsTable from '@/styles/box/BoxRoundsTable.styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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

            const netScore = round.totals.score.totals - round.general.roundPar;
            const grossScore = round.totals.score.totals - (round.general.roundPar + round.general.roundPlayingHCP);
            return (
              <TableRow key={round.general.roundID} onClick={() => handleClick(round.general.roundID.toString())} sx={{ cursor: 'pointer' }}>
                {
                  useDeviceDetection().isMobile
                    ? <>
                      <TableCell component="th" scope="row" align='center'>
                        {round.general.roundDate.toString()}
                      </TableCell>
                      <TableCell align='left'>{round.general.roundCourse}</TableCell>

                      <TableCell align='center'>{round.general.roundPar}</TableCell>
                      <TableCell align='center'>{round.general.roundPlayingHCP}</TableCell>
                      <TableCell align='center'>{round.totals.score.totals}</TableCell>
                      <TableCell align='center'>{`${netScore} | ${grossScore}`}</TableCell>
                      {/* <TableCell align={'right'}>
                        <Button onClick={() => handleClick(round.general.roundID.toString())}>
                          <ArrowCircleRightRoundedIcon />
                        </Button>
                      </TableCell> */}
                    </>
                    : <>
                      <TableCell component="th" scope="row" align='center'>
                        {round.general.roundDate.toString()}
                      </TableCell>
                      <TableCell align='left'>{round.general.roundCourse}</TableCell>
                      <TableCell align='left'>{round.general.roundTee}</TableCell>
                      <TableCell align='center'>{round.holes.length}</TableCell>
                      <TableCell align='center'>{round.general.roundPar}</TableCell>
                      <TableCell align='center'>{round.general.roundPlayingHCP}</TableCell>
                      <TableCell align='center'>{round.totals.score.totals}</TableCell>
                      <TableCell align='center'>
                        <BoxRoundsTable netScore={netScore} grossScore={grossScore} />
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
