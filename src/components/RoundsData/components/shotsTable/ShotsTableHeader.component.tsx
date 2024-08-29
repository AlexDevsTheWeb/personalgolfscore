import { TableCell, TableHead, TableRow } from "@mui/material";
import ShotsTableHeaderStack from "./ShotsTableHeaderStack.component";

interface IShotsTableHeaderProps {
  firstLabel: string;
  singleHole: boolean;
}

const ShotsTableHeader = ({ firstLabel, singleHole }: IShotsTableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='center'><ShotsTableHeaderStack firstRow={firstLabel} secondRow={!!singleHole ? '' : ''} /></TableCell>
        <TableCell align='center'><ShotsTableHeaderStack firstRow='par' secondRow={!!singleHole ? '' : ''} /></TableCell>
        <TableCell align='center'><ShotsTableHeaderStack firstRow='hcp' secondRow={!!singleHole ? '' : ''} /></TableCell>
        <TableCell align='center'>
          <ShotsTableHeaderStack firstRow='score' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
        </TableCell>
        <TableCell align='center'>
          <ShotsTableHeaderStack firstRow='points' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
        </TableCell>
        <TableCell align='center'><ShotsTableHeaderStack firstRow='fairways' secondRow={!!singleHole ? '' : 'center total'} /></TableCell>
        <TableCell align='center'><ShotsTableHeaderStack firstRow='gir' secondRow={!!singleHole ? '' : 'TOT IN OUT'} /></TableCell>
        <TableCell align='center'><ShotsTableHeaderStack firstRow='gir bogey' secondRow={!!singleHole ? '' : 'TOT IN OUT'} /></TableCell>
        <TableCell align='center' sx={{ borderLeft: '1px solid #ccc', borderTop: '1px solid #ccc' }}>
          <ShotsTableHeaderStack firstRow='scramble' secondRow={!!singleHole ? '' : 'saved made'} />
        </TableCell>
        <TableCell align='center' sx={{ borderTop: '1px solid #ccc' }}>
          <ShotsTableHeaderStack firstRow='up & down' secondRow={!!singleHole ? '' : 'saved made'} />
        </TableCell>
        <TableCell align='center' sx={{ borderRight: '1px solid #ccc', borderTop: '1px solid #ccc' }}>
          <ShotsTableHeaderStack firstRow='sand' secondRow={!!singleHole ? '' : 'saved made'} />
        </TableCell>
        <TableCell align='center'>
          <ShotsTableHeaderStack firstRow='putts' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
        </TableCell>
        <TableCell align='center'>
          <ShotsTableHeaderStack firstRow='putts/gir' secondRow={!!singleHole ? '' : 'TOT IN OUT'} />
        </TableCell>

        {/* <TableCell align='center'>
          <ShotsTableHeaderStack label='penalties' />
        </TableCell> */}
      </TableRow>
    </TableHead>
  )
}

export default ShotsTableHeader
