import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import { IPlayerProps } from "@/types/props.types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const PlayerDesktop = ({ player }: IPlayerProps) => {

  const { firstName, lastName, email, hcp, dob } = player;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Name' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='email' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Handicap' secondRow={''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='Date of birth' secondRow={''} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={'last'}>
            <TableCell align='center'>
              <Typography>{`${firstName} ${lastName}`}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{`${email}`}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{`${hcp}`}</Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography>{`${dob}`}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default PlayerDesktop
