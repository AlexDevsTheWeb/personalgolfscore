import { Paper, Table, TableContainer } from "@mui/material"
import { BoxOverflow } from "../../../../styles"
import ShotsTableHeader from "../../../RoundsData/components/shotsTable/ShotsTableHeader.component"
import ShotsTableTotalsBody from "../../../RoundsData/components/shotsTable/ShotsTableTotalsBody.component"

const HolebyHoleGeneral = () => {
  return (
    <BoxOverflow direction='horizontal' variant='table'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '1500px', width: '100%' }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={false} />
          <ShotsTableTotalsBody firstColumn={false} />
        </Table>
      </TableContainer>
    </BoxOverflow>
  )
}

export default HolebyHoleGeneral
