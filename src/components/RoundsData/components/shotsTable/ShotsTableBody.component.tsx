import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import { useGetVsPar } from "@/hooks/singleHoleCalculator.hook";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import TableCellHolebyHole from "@/styles/table/TableCellHolebyHole.styles";
import TableRowHolebyHole from "@/styles/table/TableRowHolebyHole.styles";
import VsParTypography from "@/styles/typography/VsParTypography.styles";
import { IShotsTableBody } from "@/types/props.types";

const ShotsTableBody = ({ shot }: IShotsTableBody) => {

  const { holeNumber, par, strokes, points, fairway, gir, girBogey, upDown, putts, sand, scramble, out, water } = shot;


  const vspar = useGetVsPar(strokes, par, true);

  return (
    useDeviceDetection().isMobile
      ?
      <TableRowHolebyHole key={holeNumber} value={holeNumber}>
        <TableCellHolebyHole>{holeNumber}</TableCellHolebyHole>
        <TableCellHolebyHole>{par}</TableCellHolebyHole>
        <TableCellHolebyHole
          variant={vspar.value.includes('-') ? 'green' : vspar.value.includes('+') ? 'red' : 'yellow'} width={80}>
          <VsParTypography strokes={strokes} value={vspar.string} vspar={vspar.value} />
        </TableCellHolebyHole>
        <TableCellHolebyHole
          variant={points && points >= 2 ? 'green' : points === 1 ? 'yellow' : 'red'}>
          {points}
        </TableCellHolebyHole>
        <TableCellHolebyHole>
          <ShotPosition position={Number(fairway) ? Number(fairway) : 0} />
        </TableCellHolebyHole>
        <TableCellHolebyHole>{gir ? 'Yes' : 'No'}</TableCellHolebyHole>
        <TableCellHolebyHole>{putts}</TableCellHolebyHole>
      </TableRowHolebyHole>
      :
      <TableRowHolebyHole key={holeNumber} value={holeNumber}>
        <TableCellHolebyHole>{holeNumber}</TableCellHolebyHole>
        <TableCellHolebyHole>{par}</TableCellHolebyHole>
        <TableCellHolebyHole
          variant={vspar.value.includes('-') ? 'green' : vspar.value.includes('+') ? 'red' : 'yellow'} width={80}>
          <VsParTypography strokes={strokes} value={vspar.string} vspar={vspar.value} />
        </TableCellHolebyHole>

        <TableCellHolebyHole
          variant={points && points >= 2 ? 'green' : points === 1 ? 'yellow' : 'red'}>
          {points}
        </TableCellHolebyHole>
        <TableCellHolebyHole>
          <ShotPosition position={Number(fairway) ? Number(fairway) : 0} />
        </TableCellHolebyHole>
        <TableCellHolebyHole>{gir ? 'Yes' : 'No'}</TableCellHolebyHole>
        <TableCellHolebyHole>{girBogey ? 'Yes' : 'No'}</TableCellHolebyHole>
        <TableCellHolebyHole>
          {
            scramble.attempts === 0 ? '-' : scramble.made === 1 ? 'Y' : 'N'
          }
        </TableCellHolebyHole>
        <TableCellHolebyHole>
          {
            upDown.attempts === 0 ? '-' : upDown.made === 1 ? 'Y' : 'N'
          }
        </TableCellHolebyHole>
        <TableCellHolebyHole>{putts}</TableCellHolebyHole>
        <TableCellHolebyHole>{sand}</TableCellHolebyHole>
        <TableCellHolebyHole>{`${water} | ${out}`}</TableCellHolebyHole>

      </TableRowHolebyHole >



  )
}

export default ShotsTableBody
