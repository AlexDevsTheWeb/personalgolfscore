import { Box, Stack, TableCell, TableRow } from "@mui/material";
import { useGetVsPar } from "../../../../hooks/singleHoleCalculator.hook";
import { IShots } from "../../../../types/roundData.types";
import { ShotPosition } from "../../../common/shotPositions/ShotPosition.component";

interface IShotsTableBody {
  shot: IShots,
}

const ShotsTableBody = ({ shot }: IShotsTableBody) => {

  const { holeNumber, hcp, par, strokes, points, fairway, gir, girBogey, upDown, putts, sand } = shot;

  const vspar = useGetVsPar(strokes, par, true);

  return (
    <TableRow key={holeNumber}>
      <TableCell align='center'>{holeNumber}</TableCell>
      <TableCell align='center'>{hcp}</TableCell>
      <TableCell align='center'>{par}</TableCell>
      <TableCell align='center'
        variant={vspar.value.includes('-') ? 'green' : vspar.value.includes('+') ? 'red' : 'yellow'}>
        <Stack>
          <Box>
            {`${strokes} (${vspar.value}) | ${vspar.string}`}
          </Box>
        </Stack>
      </TableCell>
      <TableCell align='center'
        variant={points && points >= 2 ? 'green' : points === 1 ? 'yellow' : 'red'}>
        {points}
      </TableCell>
      <TableCell align='center'><ShotPosition position={Number(fairway)} /></TableCell>
      <TableCell align='center'>{gir ? 'Yes' : 'No'}</TableCell>
      <TableCell align='center'>{girBogey ? 'Yes' : 'No'}</TableCell>
      <TableCell align='center'>{upDown !== '' ? upDown.toUpperCase() : '-'}</TableCell>
      <TableCell align='center'>{upDown !== '' ? upDown.toUpperCase() : '-'}</TableCell>
      <TableCell align='center'>{putts}</TableCell>
      <TableCell align='center'>{sand !== 0 ? sand : '-'}</TableCell>


    </TableRow>
  )
}

export default ShotsTableBody
