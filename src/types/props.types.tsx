import { BoxProps, SelectChangeEvent, StackProps } from "@mui/material";
import { IShots } from "./roundData.types";
import { IRoundDetails } from "./roundDetails.types";
import { IAllRoundsTotals, INewTotals, IRoundTotals } from "./roundTotals.types";

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

export interface IMainLayoutProps {
  window?: () => Window;
}

export interface IBoxProps extends BoxProps { };

export interface IHolebyHoleProps {
  holes: IShots[],
}
export interface IPuttsProps {
  puttsNumber: number[],
  setPuttDistance: any,
}

export interface ISelectProps {
  name: string,
  list: string[],
  onChange: any,
  par?: number,
  value?: string,
  label?: string,
  disabled?: boolean
}

export interface IHoleApproachFormProps {
  holeData: Pick<IShots, 'teeClub' | 'driveDistance' | 'toGreenMeters' | 'toGreen' | 'greenSide' | 'chipClub' | 'gir' | 'par' | 'distance' | 'strokes'>;
  greenClubs: string[];
  chipClubs: string[];
  greenSideValues: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export interface IHoleGeneralInfoFormProps {
  holeData: Pick<IShots, 'hcp' | 'par' | 'distance' | 'strokes' | 'putts'>;
  hcpList: string[];
  parList: string[];
  puttsNumber: number[];
  currentHoleNumber: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
  onChangePutts: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, puttIndex: number) => void;
}

export interface IHolePenaltiesFormProps {
  holeData: Pick<IShots, 'water' | 'out'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export interface IHoleTeeShotFormProps {
  holeData: Pick<IShots, 'teeClub' | 'fairway' | 'driveDistance' | 'par' | 'distance'>;
  teeClubs: string[];
  fairwayValues: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export interface IShotsTableBody {
  shot: IShots,
}
export interface IShotsTableHeaderProps {
  firstLabel: string;
  singleHole: boolean;
  firstColumn: boolean,
  dashboard?: boolean,
  viewPar?: boolean
}

export interface IShotsTableHeaderStack {
  firstRow: string,
  secondRow: string,
}

export interface IPenaltiesPie {
  name: string;
  value: INewTotals;
  holes: number;
}
export interface IPenaltiesPieValues {
  values: IPenaltiesPie;
}

export interface IPointsGauge {
  name: string;
  value: number;
  holes: number;
  percentage: boolean;
}
export interface IPointsGaugeValues {
  values: IPointsGauge;
}


export interface ICrossProps {
  left: number,
  over: number,
  right: number,
  short: number,
  center: number,
  totals: number
};

export interface IStackProps extends StackProps {
  isMobile?: boolean;
}