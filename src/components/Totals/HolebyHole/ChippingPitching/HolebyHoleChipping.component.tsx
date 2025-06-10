import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { UnifiedChippingPitchingView } from "./BreakpointsView.component";

const HolebyHoleChipping: React.FC<IRoundTotalsProps> = ({ roundTotals }) => {
  const { chipPitch } = roundTotals;

  if (!chipPitch || Object.keys(chipPitch).length === 0) {
    return <Box>No Chipping/Pitching data available.</Box>; // Or a loading indicator
  }

  return <UnifiedChippingPitchingView chipPitch={chipPitch} />;
};

export default HolebyHoleChipping
