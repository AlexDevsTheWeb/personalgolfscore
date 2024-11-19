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

export interface IRoundDataTableProps {
  roundDate?: any,
  roundCourse?: string,
  roundPar?: number,
  roundTotals: IRoundTotals,
  onClick?: any,
}

export interface IShotsTableProps {
  firstColumn: boolean;
  roundTotals: IRoundTotals;
}

