import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { UnifiedTeeShotsView } from "./BreakpointsView.component";

const HolebyHoleTeeShots: React.FC<IRoundTotalsProps> = ({ roundTotals }) => {
  const { teeShots } = roundTotals;

  // Basic validation or loading state
  if (!teeShots || Object.keys(teeShots).length === 0) {
    return <Box>No Tee Shot data available.</Box>; // Or a loading indicator
  }

  return <UnifiedTeeShotsView teeShots={teeShots} />;
};

export default HolebyHoleTeeShots
