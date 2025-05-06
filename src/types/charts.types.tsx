
export interface IRecentRoundData {
  score: number | null;
  netScore: number | null;
  grossScore: number | null;
  date: string;
  course: string | undefined;
}
// Represents a series for a specific score type (e.g., Total Score, Net Score)
export interface ICustomChartSeries {
  id: string;
  type: 'bar'; // Specify the series type
  data: (number | null)[]; // Array of scores for this series type
  label: string; // For legend (e.g., "Total Score")
  valueFormatter: (value: number | null) => string; // For value on bar
  color?: string; // Optional: for custom bar colors
}

// Interface for the ownerState part of the props
export interface ICustomBarOwnerState {
  value?: number | null;
  id: string | number; // Series ID can be string or number
  color: string; // Default color for the series from the theme/series config
  dataIndex: number; // Index of the data point within the series
  // Potentially other states like isHighlighted, isFaded if needed
}

// Interface for the props expected by the CustomBarItem slot component
export interface ICustomBarItemProps {
  // The BarChart passes layout information within a 'style' object
  style?: {
    x?: number | string | any; // Can be number, string (e.g., "100px"), or complex type for animations
    y?: number | string | any;
    height?: number | string | any;
    width?: number | string | any; // This is the width of the slot allocated by the chart
  };
  ownerState: ICustomBarOwnerState;
  className?: string; // Standard prop often passed to slots
}

// Define a type for the payload attached to each series for tooltip information
export interface ITooltipPayload {
  points: number;
  date: string;
  course: string | undefined;
}
