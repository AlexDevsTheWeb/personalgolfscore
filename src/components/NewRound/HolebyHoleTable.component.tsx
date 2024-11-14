import { Table, TableBody } from "@mui/material";
import { BoxOverflow } from "../../styles";
import { IShots } from "../../types/roundData.types";
import ShotsTableBody from "../RoundsData/components/shotsTable/ShotsTableBody.component";
import ShotsTableHeader from "../RoundsData/components/shotsTable/ShotsTableHeader.component";

interface IHolebyHoleProps {
  holes: IShots[],
}

const HolebyHoleTable = ({ holes }: IHolebyHoleProps) => {

  console.log("holes:", JSON.stringify(holes));

  return (
    <BoxOverflow direction="horizontal" variant="table" sx={{ marginBottom: '20px' }}>
      <Table sx={{ width: '100%', overflow: 'auto' }} aria-label="customized table">
        <ShotsTableHeader firstLabel='#' singleHole={true} firstColumn={true} />
        <TableBody>
          {holes.map((hole: IShots, index: number) => {
            return (<ShotsTableBody shot={hole} key={index} />)
          })}
        </TableBody>
      </Table>
    </BoxOverflow>
  )
}

export default HolebyHoleTable;
