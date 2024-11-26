import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsPutts } from "@/types/roundTotals.types";
import TableDesktop from "./Components/TableDesktop.component";
import TableMobile from "./Components/TableMobile.component";

interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

const HolebyHolePutts = ({ totalsPutts }: IHolebyHolePutts) => {

  return (
    !useDeviceDetection().isMobile ?
      <TableDesktop totalsPutts={totalsPutts} />
      :
      <TableMobile totalsPutts={totalsPutts} />
  )
}

export default HolebyHolePutts
