import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const RoundsTable = () => {

  const navigate = useNavigate();
  const { rounds } = useSelector((store: RootState) => store.rounds);

  const handleClick = (id: string) => {
    navigate(`/round/${id}`);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Course</StyledTableCell>
            <StyledTableCell>Tee</StyledTableCell>
            <StyledTableCell>Holes</StyledTableCell>
            <StyledTableCell>Par</StyledTableCell>
            <StyledTableCell>Playing HCP</StyledTableCell>
            <StyledTableCell>Player shots</StyledTableCell>
            <StyledTableCell>&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round) => {
            const { roundID, roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundShots } = round;
            return (
              <StyledTableRow key={roundID}>
                <StyledTableCell component="th" scope="row">
                  {roundDate}
                </StyledTableCell>
                <StyledTableCell>{roundCourse}</StyledTableCell>
                <StyledTableCell>{roundTee}</StyledTableCell>
                <StyledTableCell>{roundHoles}</StyledTableCell>
                <StyledTableCell>{roundPar}</StyledTableCell>
                <StyledTableCell>{roundPlayingHCP}</StyledTableCell>
                <StyledTableCell>{roundShots}</StyledTableCell>
                <StyledTableCell align={'right'}>
                  <Button onClick={() => handleClick(roundID)} >
                    <ArrowCircleRightRoundedIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer >
  );
}

export default RoundsTable
