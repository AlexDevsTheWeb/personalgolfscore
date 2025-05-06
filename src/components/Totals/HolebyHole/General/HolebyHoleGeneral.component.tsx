import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { UnifiedGeneralStatsView } from "./BreakpointsView.component";

const HolebyHoleGeneral: React.FC<IRoundTotalsProps> = ({ roundTotals, dashboard, par }) => {
  const { score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out } = roundTotals;

  if (!roundTotals || Object.keys(roundTotals).length === 0) {
    return <Box>No General data available.</Box>; // Or a loading indicator
  }

  // Pass all the destructured props to UnifiedGeneralStatsView
  // The dashboard and par props are not directly used by UnifiedGeneralStatsView based on its new structure
  return <UnifiedGeneralStatsView {...{ score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out }} />;
};

export default HolebyHoleGeneral
