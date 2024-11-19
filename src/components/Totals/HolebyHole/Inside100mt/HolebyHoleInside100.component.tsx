import useDeviceDetection from "../../../../hooks/useDeviceDetection.hook";
import { IRoundTotalsProps } from "../../../../types/props.types";
import TableDesktop from "./Components/TableDesktop.components";
import TableMobile from "./Components/TableMobile.component";

const HolebyHoleInside100 = ({ roundTotals }: IRoundTotalsProps) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop roundTotals={roundTotals} />
      :
      <TableMobile roundTotals={roundTotals} />
  )
}

export default HolebyHoleInside100
