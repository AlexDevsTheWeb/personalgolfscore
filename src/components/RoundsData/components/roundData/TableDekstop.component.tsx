import { IRoundMainDataProp } from "@/types/props.types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ShotsTableHeaderStack from "../shotsTable/ShotsTableHeaderStack.component";

const TableDekstop = ({ round }: IRoundMainDataProp) => {
  const { roundCourse, roundDate, roundHoles, roundPar, roundTee, roundPlayingHCP, roundStrokes } = round

  const score = roundStrokes;
  const overParNet = roundStrokes - roundPar;
  const overParGross = roundStrokes - (roundPar + roundPlayingHCP);
  const overParNetString = overParNet > 0 ? `+${overParNet}` : `${overParNet}`;
  const overParGrossString = overParGross > 0 ? `+${overParGross}` : `${overParGross}`;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Course' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Date' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Starting Tees' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Holes' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Par' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Player HCP' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Score' secondRow={'TOT | NET | GROSS'} />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow key={'last'}>
            <TableCell align='center'>
              <Typography>{roundCourse}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{roundDate}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{roundTee}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{roundHoles}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{roundPar}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{roundPlayingHCP}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography fontWeight={'bold'}
                sx={{
                  backgroundColor: roundStrokes <= roundPar + roundPlayingHCP ? '#82b38b' : '#cf8484',
                  padding: '5px !important'
                }}
              >{`${score} | ${overParNetString} | ${overParGrossString}`}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableDekstop
