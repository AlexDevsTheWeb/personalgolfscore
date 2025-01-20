import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import Spinner from "@/components/spinner/Spinner.component";
import { IPlayerProps } from "@/types/props.types";
import { Grid2, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";

const PlayerDesktop = ({ player }: IPlayerProps) => {

  if (_.isEmpty(player)) {
    return <Spinner />
  }

  return (
    <Grid2 container spacing={2} width={'100%'}>
      <Grid2 size={3}>
        <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='Name' secondRow={''} />
          <Typography>{`${player.firstName} ${player.lastName}`}</Typography>
        </Stack>
      </Grid2>
      <Grid2 size={3}>
        <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='email' secondRow={''} />
          <Typography>{player.email}</Typography>
        </Stack>
      </Grid2>
      <Grid2 size={3}>
        <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='Handicap' secondRow={''} />
          <Typography>{player.HCP}</Typography>
        </Stack>
      </Grid2>
      <Grid2 size={3}>
        <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='Date of birth' secondRow={''} />
          <Typography>{player.DOB.seconds ? dayjs.unix(player.DOB.seconds).format('DD/MM/YYYY') : '-'}</Typography>
        </Stack>
      </Grid2>
    </Grid2>
  )

  {/* <TableContainer component={Paper}>
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
                <Typography>{`${player.firstName} ${player.lastName}`}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>{player.email}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>{player.HCP}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography>{player.DOB.seconds ? dayjs.unix(player.DOB.seconds).format('DD/MM/YYYY') : '-'}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
}

export default PlayerDesktop
