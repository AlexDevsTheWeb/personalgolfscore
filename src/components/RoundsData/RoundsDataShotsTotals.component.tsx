import TableBody from '@mui/material/TableBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TableCell, TableRow } from '../../styles';
import { useParams } from 'react-router-dom';

const RoundsDataShotsTotals = () => {
  const params = useParams();
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const actualTotals = totals.filter((totals) => totals.roundID === params.roundID)

  return (
    <TableBody sx={{ border: 'none' }}>
      {actualTotals.map((total) => {
        const { holeNumber, distance, hcp, par, strokes, teeClub, fir, gir, putts, sand, water, out } = total;
        return (
          <TableRow key={holeNumber} sx={{ padding: 0, border: 'none' }}>
            <TableCell component="th" scope="row" align='center' width={'5%'} sx={{ border: 'none' }}>
              {holeNumber}
            </TableCell>
            <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{`${distance} mt.`}</TableCell>
            <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{hcp !== 0 ? hcp : '-'}</TableCell>
            <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{par}</TableCell>
            <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{strokes}</TableCell>
            <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{teeClub ? teeClub : '-'}</TableCell>
            <TableCell align='center' width={'20%'} sx={{ border: 'none' }}>{`${fir}%`}</TableCell>
            <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{`${gir}%`}</TableCell>
            <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{putts}</TableCell>
            <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{sand !== 0 ? sand : '-'}</TableCell>
            <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{water !== 0 ? water : '-'}</TableCell>
            <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{out !== 0 ? out : '-'}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default RoundsDataShotsTotals