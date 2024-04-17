import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { BoxPlayer, Grid, RowCard } from '../../styles';

import { PieChart } from '@mui/x-charts/PieChart';

const RoundsDataShotsTotals = () => {
  const params = useParams();
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const actualTotals = totals.filter((totals) => totals.roundID === params.roundID)

  return (

    <BoxPlayer>
      <Grid container spacing={0}>
        {
          actualTotals.map((total) => {
            const { distance, par, strokes, points, fir, left, right, gir, putts, sand, water, out } = total;
            const data = [
              { id: 0, value: fir, label: 'F.I.R.' },
              { id: 1, value: left, label: 'Left' },
              { id: 2, value: right, label: 'Right' }
            ]
            return (
              <Grid item md={10} key={total.roundID} sx={{ flexGrow: 1, flexBasis: '100% !important', width: '100% !important', maxWidth: '100% !important' }}>
                <PieChart
                  series={[
                    {
                      data,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

                    },
                  ]}
                  height={200}
                />
                <RowCard label='Total meters' value={distance} name='Total meters' head={true} />
                <RowCard label='Course Par' value={par} name='Course Par' head={true} />
                <RowCard label='Player Strokes' value={strokes} name='Player Strokes' head={true} />
                <RowCard label='Points' value={points} name='Points' head={true} />
                <RowCard label='FIR' value={`${fir}%`} name='FIR' head={true} />
                <RowCard label='Left' value={`${left}%`} name='Left' head={true} />
                <RowCard label='Right' value={`${right}%`} name='Right' head={true} />
                <RowCard label='GIR' value={`${gir}%`} name='GIR' head={true} />
                <RowCard label='Putts' value={putts} name='Putts' head={true} />
                <RowCard label='Sands' value={sand !== 0 ? sand : '-'} name='Sands' head={true} />
                <RowCard label='Waters' value={water !== 0 ? water : '-'} name='Waters' head={true} />
                <RowCard label='Penalties' value={out !== 0 ? out : '-'} name='Penalties' head={true} />
              </Grid>
            )
          })
        }

      </Grid>
    </BoxPlayer>


    // <TableBody sx={{ border: 'none' }}>
    //   {actualTotals.map((total) => {
    //     const { holeNumber, distance, hcp, par, strokes, teeClub, fir, gir, putts, sand, water, out } = total;
    //     return (
    //       <TableRow key={holeNumber} sx={{ padding: 0, border: 'none' }}>
    //         <TableCell component="th" scope="row" align='center' width={'5%'} sx={{ border: 'none' }}>
    //           {holeNumber}
    //         </TableCell>
    //         <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{`${distance} mt.`}</TableCell>
    //         <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{hcp !== 0 ? hcp : '-'}</TableCell>
    //         <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{}</TableCell>
    //         <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{strokes}</TableCell>
    //         <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{teeClub ? teeClub : '-'}</TableCell>
    //         <TableCell align='center' width={'20%'} sx={{ border: 'none' }}>{`${fir}%`}</TableCell>
    //         <TableCell align='center' width={'10%'} sx={{ border: 'none' }}>{`${gir}%`}</TableCell>
    //         <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{putts}</TableCell>
    //         <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{sand !== 0 ? sand : '-'}</TableCell>
    //         <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{water !== 0 ? water : '-'}</TableCell>
    //         <TableCell align='center' width={'5%'} sx={{ border: 'none' }}>{out !== 0 ? out : '-'}</TableCell>
    //       </TableRow>
    //     )
    //   })}
    // </TableBody>
  )
}

export default RoundsDataShotsTotals