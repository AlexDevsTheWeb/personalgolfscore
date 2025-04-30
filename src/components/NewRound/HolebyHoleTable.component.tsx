import { BoxOverflow } from "@/styles/index";
import { IHolebyHoleProps } from "@/types/props.types";
import { IShots } from "@/types/roundData.types";
import { Table, TableBody } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ShotsTableBody from "../RoundsData/components/shotsTable/ShotsTableBody.component";
import ShotsTableHeader from "../RoundsData/components/shotsTable/ShotsTableHeader.component";

const HolebyHoleTable = ({ holes }: IHolebyHoleProps) => {
  const params = useParams<{ roundID: string }>();

  const navigate = useNavigate();


  const handleEditHole = (holeNumber: number) => {
    console.log(`Editing hole ${holeNumber} for round ${params.roundID}`);
    // Navigate to the edit page/modal for this specific hole
    navigate(`/round/${params.roundID}/hole/${holeNumber}/edit`); // Example route
  };

  return (
    <BoxOverflow direction="horizontal" variant="table" sx={{ marginBottom: '20px' }}>
      <Table sx={{ width: '100%', overflow: 'auto' }} aria-label="customized table">
        <ShotsTableHeader firstLabel='#' singleHole={true} firstColumn={true} viewPar={true} />
        <TableBody>
          {holes.map((hole: IShots, index: number) => {
            return (<ShotsTableBody shot={hole} key={index} onEdit={handleEditHole} />)
          })}
        </TableBody>
      </Table>
    </BoxOverflow>
  )
}

export default HolebyHoleTable;
