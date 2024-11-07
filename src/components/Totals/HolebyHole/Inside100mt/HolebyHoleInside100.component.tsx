import useDeviceDetection from "../../../../hooks/useDeviceDetection.hook";
import { IRoundTotals } from "../../../../types/roundTotals.types";
import TableDesktop from "./Components/TableDesktop.components";
import TableMobile from "./Components/TableMobile.component";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}

const HolebyHoleInside100 = ({ totals }: IHolebyHoleTeeShots) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop totals={totals} />
      :
      <TableMobile totals={totals} />
  )
}

export default HolebyHoleInside100
