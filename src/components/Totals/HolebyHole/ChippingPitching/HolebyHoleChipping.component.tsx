import { IRoundTotals } from "../../../../types/roundTotals.types";

interface IHolebyHoleChipping {
  totals: IRoundTotals
}

const HolebyHoleChipping = ({ totals }: IHolebyHoleChipping) => {

  const { teeShots } = totals;
  const teeShotsCat = Object.keys(teeShots);


  return (
    <div>

    </div>
  )
}

export default HolebyHoleChipping
