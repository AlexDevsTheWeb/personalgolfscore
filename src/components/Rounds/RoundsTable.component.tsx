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
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='left'>Course</TableCell>

                  <TableCell align='center'>Par</TableCell>
                  <TableCell align='center'>Shots</TableCell>
                  <TableCell align='right'>&nbsp;</TableCell>
                </>
                :
                <>
                  <TableCell align='center' width={2}>Date</TableCell>
                  <TableCell align='left' width={3}>Course</TableCell>
                  <TableCell align='left'>Tee</TableCell>
                  <TableCell align='center'>Holes</TableCell>
                  <TableCell align='center'>Par</TableCell>
                  <TableCell align='center'>Playing HCP</TableCell>
                  <TableCell align='center'>Player shots</TableCell>
                  <TableCell align='right' width={1}>&nbsp;</TableCell>
                </>
            }

          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => {
            // const { roundID, roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundStrokes } = round;
            return (
              <TableRow key={round.general.roundID}>
                {
                  useDeviceDetection().isMobile
                    ? <>
                      <TableCell component="th" scope="row" align='center'>
                        {round.general.roundDate.toString()}
                      </TableCell>
                      <TableCell align='left'>{round.general.roundCourse}</TableCell>

                      <TableCell align='center'>{round.general.coursePar}</TableCell>
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
                      <TableCell align='center'>{round.general.coursePar}</TableCell>
                      <TableCell align='center'>{round.general.playerHCP}</TableCell>
                      <TableCell align='center'>{round.totals.score.totals}</TableCell>
                      <TableCell align={'right'} width={1}>
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
    </TableContainer>
  );
}

export default RoundsTable
