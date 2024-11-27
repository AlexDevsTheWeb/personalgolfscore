import { IPlayer } from "./player.types";
import { IRounds } from "./round.types";
import { IRoundTotals } from "./roundTotals.types";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export interface IRoundTotalsProps {
  roundTotals: IRoundTotals;
}

export interface IShotsTableProps {
  firstColumn: boolean;
  roundTotals: IRoundTotals;
}

export interface IRoundMainDataProp {
  round: IRounds;
}

export interface IPlayerProps {
  player: IPlayer,
}

