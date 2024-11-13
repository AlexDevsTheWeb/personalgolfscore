import { TableCell, TableHead, TableRow } from "@mui/material";
import useDeviceDetection from "../../../../hooks/useDeviceDetection.hook";
import ShotsTableHeaderStack from "./ShotsTableHeaderStack.component";

interface IShotsTableHeaderProps {
  firstLabel: string;
  singleHole: boolean;
  firstColumn: boolean,
}

const ShotsTableHeader = ({ firstColumn, singleHole }: IShotsTableHeaderProps) => {
  return (
    <TableHead>
      {
        useDeviceDetection().isMobile
          ?
          <TableRow>

            {
              firstColumn &&
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow='#' secondRow={!!singleHole ? '' : ''} />
              </TableCell>
            }

            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='par' secondRow={!!singleHole ? '' : ''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='score' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='points' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>

            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='putts' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>

          </TableRow>
          :
          <TableRow>

            {
              firstColumn &&
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow='#' secondRow={!!singleHole ? '' : ''} />
              </TableCell>
            }

            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='par' secondRow={!!singleHole ? '' : ''} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='score' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='points' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='fairways' secondRow={!!singleHole ? '' : 'center total'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='gir' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>

            {!firstColumn &&
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow='putts/gir' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
              </TableCell>
            }
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='gir bogey' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='scramble' secondRow={!!singleHole ? 'Par saved outside green' : 'made attempts'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='up & down' secondRow={!!singleHole ? 'Par saved without GIR' : 'made attempts'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='putts' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='sand' secondRow={!!singleHole ? '' : 'saved made'} />
            </TableCell>
            <TableCell align='center'>
              <ShotsTableHeaderStack firstRow='penalties' secondRow={'water | out'} />
            </TableCell>
          </TableRow>
      }
    </TableHead>
  )
}

export default ShotsTableHeader
