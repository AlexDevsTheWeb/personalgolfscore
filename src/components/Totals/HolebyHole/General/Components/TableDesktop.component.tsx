import { Paper, Table, TableContainer } from "@mui/material"
import ShotsTableHeader from "../../../../RoundsData/components/shotsTable/ShotsTableHeader.component"
import ShotsTableTotalsBody from "../../../../RoundsData/components/shotsTable/ShotsTableTotalsBody.component"


const TableDesktop = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
        <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={false} />
        <ShotsTableTotalsBody firstColumn={false} />
      </Table>
    </TableContainer>
  )
}

export default TableDesktop
