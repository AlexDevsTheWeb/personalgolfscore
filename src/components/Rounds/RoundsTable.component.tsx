import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { TableCell, TableRow } from '../../styles';

const RoundsTable = () => {
  const navigate = useNavigate();
  const { rounds } = useSelector((store: RootState) => store.rounds);

  const handleClick = (id: string) => {
    navigate(`/round/${id}`);
  }
  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align='center' width={2}>Date</TableCell>
            <TableCell align='left' width={3}>Course</TableCell>
            <TableCell align='left'>Tee</TableCell>
            <TableCell align='center'>Holes</TableCell>
            <TableCell align='center'>Par</TableCell>
            <TableCell align='center'>Playing HCP</TableCell>
            <TableCell align='center'>Player shots</TableCell>
            <TableCell align='right' width={1}>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => {
            const { roundID, roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundStrokes } = round;
            return (
              <TableRow key={roundID}>
                <TableCell component="th" scope="row" align='center'>
                  {roundDate}
                </TableCell>
                <TableCell align='left'>{roundCourse}</TableCell>
                <TableCell align='left'>{roundTee}</TableCell>
                <TableCell align='center'>{roundHoles}</TableCell>
                <TableCell align='center'>{roundPar}</TableCell>
                <TableCell align='center'>{roundPlayingHCP}</TableCell>
                <TableCell align='center'>{roundStrokes}</TableCell>
                <TableCell align={'right'} width={1}>
                  <Button onClick={() => handleClick(roundID)} >
                    <ArrowCircleRightRoundedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoundsTable
