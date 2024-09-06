import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BoxGeneralShadow from "../../../styles/box/BoxGeneralShadow.styles";
import HolebyHolePutts from "./Putts/HolebyHolePutts.component";
import HolebyHoleTeeShots from "./TeeShots/HolebyHoleTeeShots.component";

const HolebyHoleTotals = () => {

  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);

  return (
    <BoxGeneralShadow>
      <HolebyHoleTeeShots totals={roundTotals} />
      <HolebyHolePutts totalsPutts={roundTotals.putts} />
    </BoxGeneralShadow>
  )
}

export default HolebyHoleTotals
