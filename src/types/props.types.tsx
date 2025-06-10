import { BoxProps, SelectChangeEvent, StackProps } from "@mui/material";
import { IShots } from "./roundData.types";
import { IRoundDetails } from "./roundDetails.types";
import { IAllRoundsTotals, INewTotals, IPuttsBreakDownStatistics, IPuttsStatistics, IRoundChipPitch, IRoundChipPitchTotals, IRoundFairwayTotals, IRoundFWAndIrons, IRoundFwAndIronsTotals, IRoundInside100Mt, IRoundPointsTotalsAvg, IRoundScoreTotalsAvg, IRoundTeeShotClubTotals, IRoundTeeShotsTotals, IRoundTotals, IRoundTotalsAvgINOUT, IRoundTotalsAvgSand, IRoundTotalsPutts, IRoundTotalsUpDown } from "./roundTotals.types";

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
  puttLengths?: number[], // Add this to pass current lengths for pre-filling
  setPuttDistance: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, puttIndex: number) => void
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

export interface IHoleGeneralInfoFormProps {
  holeData: Pick<IShots, 'hcp' | 'par' | 'distance' | 'strokes' | 'putts' | 'water' | 'out' | 'teeClub' | 'toGreen'>;
  hcpList: string[];
  parList: string[];
  teeClubs: string[];
  greenClubs: string[]; // Added for approach club selection
  fairwayValues: FairwayOption[];
  currentHoleNumber: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

export interface IHolePenaltiesFormProps {
  holeData: Pick<IShots, 'water' | 'out'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
}

// Define the structure for fairway options used in Autocomplete
export type FairwayOption = {
  label: string;
  value: number;
};

export interface IHoleTeeShotFormProps {
  holeData: Pick<IShots, 'teeClub' | 'par' | 'fairway' | 'driveDistance'>; // fairway & driveDistance needed for AddSingleHole to pass to dialog
  teeClubs: string[];
  fairwayValues: FairwayOption[]; // Update the type here
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

export interface IFairwayPieData {
  totFairwaysCenter?: number;
  totFairwaysLeft?: number;
  totFairwaysRight?: number;
}
export interface IFairwayPieChartProps {
  values: { name: string; value: IFairwayPieData; holes: number; };
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

export interface ICategoryStatsProps {
  value: IRoundInside100Mt;
}
export interface IDesktopViewProps {
  inside100Mt: IRoundTotalsProps['roundTotals']['inside100Mt'];
}
export interface IMobileViewProps {
  inside100Mt: IRoundTotalsProps['roundTotals']['inside100Mt'];
}

export interface IChipCategoryStatsProps {
  value: IRoundChipPitch;
}
export interface IChipDesktopViewProps {
  chipPitch: IRoundChipPitchTotals;
}



export interface IChipMobileViewProps {
  chipPitch: IRoundChipPitchTotals;
}

export interface IStatAccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export interface ISimpleStatDisplayProps {
  title?: string; // Made title optional
  total: number | string;
  avg?: number | string;
  inTotal: number | string;
  inAvg?: number | string;
  outTotal: number | string;
  outAvg?: number | string;
  totalSuffix?: string;
  inSuffix?: string;
  outSuffix?: string;
}

export interface ISimpleParStatDisplayProps {
  title?: string;
  scorePar3: number;
  scorePar4: number;
  scorePar5: number;
}

export interface ISimpleScoreParStatDisplayProps {
  title?: string;
  scoreBirdie: number;
  scoreBogey: number;
  scoreDoubleBogeyWorst: number;
  scoreEagleBetter: number;
  scorePar: number;
}

export interface IPercentageStatDisplayProps {
  saved: number;
  total: number;
  percentage: number;
}

export interface IGeneralDesktopViewProps {
  roundTotals: IRoundTotalsProps['roundTotals'];
  dashboard?: boolean;
}

export interface IGeneralMobileViewProps {
  score: IRoundScoreTotalsAvg;
  points: IRoundPointsTotalsAvg;
  putts: IRoundTotalsPutts;
  sand: IRoundTotalsAvgSand;
  gir: IRoundTotalsAvgINOUT;
  girBogey: IRoundTotalsAvgINOUT;
  fairway: IRoundFairwayTotals;
  upDown: IRoundTotalsUpDown;
  scramble: IRoundTotalsUpDown;
  water: IRoundTotalsAvgINOUT;
  out: IRoundTotalsAvgINOUT;
}

export interface ITeeshotsCategoryStatsProps {
  value: IRoundTeeShotClubTotals; // Use the specific type
}

export interface ITeeshotsDesktopViewProps {
  teeShots: IRoundTeeShotsTotals;
}

export interface ITeeshotsMobileViewProps {
  teeShots: IRoundTeeShotsTotals;
}

export interface IFwAndIronsCategoryStatsProps {
  value: IRoundFWAndIrons; // Use the specific type
}
export interface IFwAndIronsDesktopViewProps {
  fwAndIrons: IRoundFwAndIronsTotals;
}

export interface IFwAndIronsMobileViewProps {
  fwAndIrons: IRoundFwAndIronsTotals;
}

export interface IPuttsOverallStatsProps {
  value: IPuttsStatistics['_puttsOverall'];
}

export interface IPuttsRangeStatsProps {
  value: IPuttsBreakDownStatistics;
}

export interface IPuttsDesktopViewProps {
  puttsStatistics: IPuttsStatistics;
}

export interface IPuttsMobileViewProps {
  puttsStatistics: IPuttsStatistics;
}