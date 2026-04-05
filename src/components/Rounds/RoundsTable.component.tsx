import BoxRoundsTable from '@/styles/box/BoxRoundsTable.styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '../../styles';
import Header from '../common/header/Header.component';
import { useRoundsStore } from '@/store/zustand';

const RoundsTable = () => {
  const navigate = useNavigate();
  const rounds = useRoundsStore((state) => state.rounds);

  const handleClick = (id: string) => {
    navigate(`/round/${id}`);
  }

  return (
    <>
      <Header title={'Rounds'} />
      <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="rounds table">
          <TableHead>
            <TableRow>
              <TableCell align='center' space='10px'>Date</TableCell>
              <TableCell align='left' space='10px'>Course</TableCell>
              <TableCell align='center' space='10px'>Par</TableCell>
              <TableCell align='center' space='10px'>HCP</TableCell>
              <TableCell align='center' space='10px'>Points</TableCell>
              <TableCell align='center' space='10px'>Score</TableCell>
              <TableCell align='center' space='10px'>vs. Par</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds.map((round) => {
              const totalScore = Number(round.totals?.score?.totals || 0);
              const par = Number(round.roundPar);
              const roundPlayingHCP = Number(round.roundPlayingHCP);

              const netScore = totalScore - par;
              const grossScore = totalScore - (par + roundPlayingHCP);

              const props = {
                netScore,
                grossScore
              };

              return (
                <TableRow key={round.id} onClick={() => handleClick(round.id.toString())} sx={{ cursor: 'pointer' }}>
                  <TableCell component="th" scope="row" align='center'>
                    {dayjs(round.roundDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      maxWidth: '150px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={round.roundCourse}
                  >
                    {round.roundCourse}
                  </TableCell>
                  <TableCell align='center' space='10px'>{round.roundPar}</TableCell>
                  <TableCell align='center' space='10px'>{round.roundPlayingHCP}</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>{round.totals?.points?.totals}</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>{totalScore}</TableCell>
                  <TableCell align='center'>
                    <BoxRoundsTable props={props} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RoundsTable
