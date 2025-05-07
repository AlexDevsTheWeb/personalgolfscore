import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { UnifiedFwAndIronsView } from "./BreakpointsView.component";

const HolebyHoleFwAndIrons: React.FC<IRoundTotalsProps> = ({ roundTotals }) => {
  const { fwAndIrons } = roundTotals;

  // Basic validation or loading state
  if (!fwAndIrons || Object.keys(fwAndIrons).length === 0) {
    return <Box>No Fairway Wood/Iron data available.</Box>; // Or a loading indicator
  }

  return <UnifiedFwAndIronsView fwAndIrons={fwAndIrons} />;
};

export default HolebyHoleFwAndIrons