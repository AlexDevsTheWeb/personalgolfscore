import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { UnifiedInside100View } from "./BreakpointsView.component";

const HolebyHoleInside100: React.FC<IRoundTotalsProps> = ({ roundTotals }) => {
  const { inside100Mt } = roundTotals;

  // Basic validation or loading state could be added here if needed
  if (!inside100Mt || Object.keys(inside100Mt).length === 0) {
    return <Box>No "Inside 100mt" data available.</Box>; // Or a loading indicator
  }

  return <UnifiedInside100View inside100Mt={inside100Mt} />;
};

export default HolebyHoleInside100
