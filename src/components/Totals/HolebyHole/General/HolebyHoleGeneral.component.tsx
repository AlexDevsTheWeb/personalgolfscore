import { Paper, Table, TableContainer } from "@mui/material"
import BoxBetween from "../../../../styles/box/BoxBetween.styles"
import ShotsTableHeader from "../../../RoundsData/components/shotsTable/ShotsTableHeader.component"
import ShotsTableTotalsBody from "../../../RoundsData/components/shotsTable/ShotsTableTotalsBody.component"

const HolebyHoleGeneral = () => {
  return (
    <BoxBetween>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={false} />
          <ShotsTableTotalsBody firstColumn={false} />
        </Table>
      </TableContainer>
    </BoxBetween>
  )
}

export default HolebyHoleGeneral
