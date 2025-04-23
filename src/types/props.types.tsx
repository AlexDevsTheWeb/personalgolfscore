import { IRoundDetails } from "./roundDetails.types";
import { IAllRoundsTotals, IRoundTotals } from "./roundTotals.types";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export interface IRoundTotalsProps {
  dashboard?: boolean,
  par?: number,
  roundTotals: IRoundTotals;
}
interface IAllRoundsTotalsProps {
  newTotals: IAllRoundsTotals
}

export interface IShotsTableProps {
  dashboard?: boolean;
  firstColumn: boolean;
  roundTotals: IRoundTotals;
}

export interface IRoundMainDataProp {
  round: IRoundDetails;
}

// export interface IPlayerProps {
//   player: IPlayer,
// }

