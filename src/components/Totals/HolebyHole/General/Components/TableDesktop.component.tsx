import ShotsTableHeader from "@/components/RoundsData/components/shotsTable/ShotsTableHeader.component"
import ShotsTableTotalsBody from "@/components/RoundsData/components/shotsTable/ShotsTableTotalsBody.component"
import { IRoundTotalsProps } from "@/types/props.types"
import { Paper, Table, TableContainer } from "@mui/material"

const TableDesktop = ({ roundTotals, dashboard }: IRoundTotalsProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
        <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={false} dashboard={dashboard} />
        <ShotsTableTotalsBody firstColumn={false} roundTotals={roundTotals} dashboard={dashboard} />
      </Table>
    </TableContainer>
  )
}

export default TableDesktop
