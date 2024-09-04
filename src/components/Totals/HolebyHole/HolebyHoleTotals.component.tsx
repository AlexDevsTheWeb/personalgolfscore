import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BoxGeneralShadow from "../../../styles/box/BoxGeneralShadow.styles";
import HolebyHolePutts from "./Putts/HolebyHolePutts.component";

const HolebyHoleTotals = () => {

  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);

  return (
    <BoxGeneralShadow>
      <HolebyHolePutts totalsPutts={roundTotals.putts} />
    </BoxGeneralShadow>
  )
}

export default HolebyHoleTotals
