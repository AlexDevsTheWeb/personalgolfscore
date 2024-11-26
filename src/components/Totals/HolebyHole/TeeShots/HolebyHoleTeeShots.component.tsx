import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsProps } from "@/types/props.types";
import TableDesktop from "./Components/TableDesktop.component";
import TableMobile from "./Components/TableMobile.component";

const HolebyHoleTeeShots = ({ roundTotals }: IRoundTotalsProps) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop roundTotals={roundTotals} />
      :
      <TableMobile roundTotals={roundTotals} />
  )
}

export default HolebyHoleTeeShots
