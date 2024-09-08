import { Table, TableBody } from "@mui/material"
import BoxGeneralShadow from "../../../styles/box/BoxGeneralShadow.styles"
import { IShots } from "../../../types/roundData.types"
import ShotsTableBody from "../../RoundsData/components/shotsTable/ShotsTableBody.component"
import ShotsTableHeader from "../../RoundsData/components/shotsTable/ShotsTableHeader.component"

interface IHolebyHoleProps {
  holes: IShots[],
}

const HolebyHoleTable = ({ holes }: IHolebyHoleProps) => {
  return (
    <BoxGeneralShadow>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <ShotsTableHeader firstLabel='#' singleHole={true} firstColumn={true} />
        <TableBody>
          {holes.map((hole: IShots, index: number) => {
            return (<ShotsTableBody shot={hole} key={index} />)
          })}
        </TableBody>
      </Table>
    </BoxGeneralShadow>
  )
}

export default HolebyHoleTable
