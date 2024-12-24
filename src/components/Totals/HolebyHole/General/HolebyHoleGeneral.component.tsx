import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsProps } from "@/types/props.types";
import TableDesktop from "./Components/TableDesktop.component";
import TableMobile from "./Components/TableMobile.component";

const HolebyHoleGeneral = ({ roundTotals, dashboard }: IRoundTotalsProps) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop roundTotals={roundTotals} dashboard={dashboard} />
      :
      <TableMobile roundTotals={roundTotals} dashboard={dashboard} />
  )

}

export default HolebyHoleGeneral
