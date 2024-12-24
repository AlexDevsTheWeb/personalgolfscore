import { IPlayer } from "./player.types";
import { IRounds } from "./round.types";
import { IAllRoundsTotals, IRoundTotals } from "./roundTotals.types";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export interface IRoundTotalsProps {
  dashboard?: boolean,
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
  round: IRounds;
}

export interface IPlayerProps {
  player: IPlayer,
}

