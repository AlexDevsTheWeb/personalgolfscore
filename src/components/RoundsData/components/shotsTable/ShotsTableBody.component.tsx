import { Box, Stack, TableCell, TableRow } from "@mui/material";
import { useGetVsPar } from "../../../../hooks/singleHoleCalculator.hook";
import { IShots } from "../../../../types/roundData.types";
import { ShotPosition } from "../../../common/shotPositions/ShotPosition.component";

interface IShotsTableBody {
  shot: IShots,
}

const ShotsTableBody = ({ shot }: IShotsTableBody) => {

  const { holeNumber, par, strokes, points, fairway, gir, girBogey, upDown, putts, sand, scramble, out, water } = shot;

  const vspar = useGetVsPar(strokes, par, true);

  return (
    <TableRow key={holeNumber}>
      <TableCell align='center' sx={{ padding: '0px' }}>{holeNumber}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{par}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}
        variant={vspar.value.includes('-') ? 'green' : vspar.value.includes('+') ? 'red' : 'yellow'}>
        <Stack>
          <Box>
            {`${strokes} (${vspar.value}) | ${vspar.string}`}
          </Box>
        </Stack>
      </TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}
        variant={points && points >= 2 ? 'green' : points === 1 ? 'yellow' : 'red'}>
        {points}
      </TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}><ShotPosition position={Number(fairway)} /></TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{gir ? 'Yes' : 'No'}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{girBogey ? 'Yes' : 'No'}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{scramble !== 0 ? scramble : '-'}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{upDown !== '' ? upDown.toUpperCase() : '-'}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{sand}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{putts}</TableCell>
      <TableCell align='center' sx={{ padding: '0px' }}>{`${water} | ${out}`}</TableCell>
    </TableRow>
  )
}

export default ShotsTableBody
