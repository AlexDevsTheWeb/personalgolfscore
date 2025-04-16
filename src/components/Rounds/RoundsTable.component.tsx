import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Button from '@mui/material/Button';
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
                  <TableCell align='center' space='10px'>Shots</TableCell>
                  <TableCell align='right' width={20}>&nbsp;</TableCell>
                </>
                :
                <>
                  <TableCell align='center' space='10px'>Date</TableCell>
                  <TableCell align='left' width={500} space='10px'>Course</TableCell>
                  <TableCell align='left' space='10px'>Tee</TableCell>
                  <TableCell align='center' space='10px'>Holes</TableCell>
                  <TableCell align='center' space='10px'>Par</TableCell>
                  <TableCell align='center' space='10px'>HCP</TableCell>
                  <TableCell align='center' space='10px'>Shots</TableCell>
                  <TableCell align='right' width={50}>&nbsp;</TableCell>
                </>
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => {
            // const { roundID, roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundStrokes } = round;
            console.log("coursePar: ", round.general.roundPar);
            console.log("roundPar: ", round.general.roundPar);
            return (
              <TableRow key={round.general.roundID}>
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
                      <TableCell align={'right'}>
                        <Button onClick={() => handleClick(round.general.roundID.toString())}>
                          <ArrowCircleRightRoundedIcon />
                        </Button>
                      </TableCell>
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
                      <TableCell align={'right'}>
                        <Button onClick={() => handleClick(round.general.roundID.toString())}>
                          <ArrowCircleRightRoundedIcon />
                        </Button>
                      </TableCell>
                    </>
                }

              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer >
  );
}

export default RoundsTable
