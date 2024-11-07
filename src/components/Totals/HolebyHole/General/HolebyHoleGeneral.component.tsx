import { IRoundTotals } from "../../../../types/roundTotals.types";

import useDeviceDetection from "../../../../hooks/useDeviceDetection.hook";
import TableDesktop from "./Components/TableDesktop.component";
import TableMobile from "./Components/TableMobile.component";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}

const HolebyHoleGeneral = ({ totals }: IHolebyHoleTeeShots) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop />
      :
      <TableMobile totals={totals} />
  )

}

export default HolebyHoleGeneral
