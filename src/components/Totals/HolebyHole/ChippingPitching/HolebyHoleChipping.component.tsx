import useDeviceDetection from "../../../../hooks/useDeviceDetection.hook";
import { IRoundTotals } from "../../../../types/roundTotals.types";
import TableDesktop from "./Components/TableDesktop.component";
import TableMobile from "./Components/TableMobile.component";

interface IHolebyHoleChipping {
  totals: IRoundTotals
}

const HolebyHoleChipping = ({ totals }: IHolebyHoleChipping) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop totals={totals} />
      :
      <TableMobile totals={totals} />
  )


}

export default HolebyHoleChipping
