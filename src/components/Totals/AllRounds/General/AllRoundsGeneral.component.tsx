import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IAllRoundsTotals } from "@/types/roundTotals.types";
import TableDesktop from "./Components/TableDesktop.component";
import TableMobile from "./Components/TableMobile.component";

const HolebyHoleGeneral = ({ newTotals }: IAllRoundsTotals) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop newTotals={newTotals} />
      :
      <TableMobile newTotals={newTotals} />
  )

}

export default HolebyHoleGeneral
