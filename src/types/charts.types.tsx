
export interface IRecentRoundData {
  score: number | null;
  netScore: number | null;
  grossScore: number | null;
  date: string;
  course: string | undefined;
}
export interface ICustomChartSeries {
  id: string;
  type?: 'bar'; // Made optional, BarChart should infer or default this for its series
  data: (number | null)[];
  label: string;
  valueFormatter: (value: number | null) => string;
  color?: string;
}

export interface ICustomBarOwnerState {
  value?: number | null;
  id: string | number;
  color: string;
  dataIndex: number;
}

export interface ICustomBarItemProps {
  style?: {
    x?: number | string | any;
    y?: number | string | any;
    height?: number | string | any;
    width?: number | string | any;
  };
  ownerState: ICustomBarOwnerState;
  className?: string;
}

export interface ITooltipPayload {
  points: number;
  date: string;
  course: string | undefined;
}
