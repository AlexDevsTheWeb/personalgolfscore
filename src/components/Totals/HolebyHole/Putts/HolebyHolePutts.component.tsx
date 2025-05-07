import { IHolebyHolePutts } from "@/types/round.types";
import { Box } from "@mui/material";
import React from "react";
import { UnifiedPuttsView } from "./BreakpointsView.component";

const HolebyHolePutts: React.FC<IHolebyHolePutts> = ({ totalsPutts }) => {
  const { puttsStatistics } = totalsPutts;

  console.log("totalsPutts -> ", totalsPutts);

  // Basic validation or loading state
  if (!puttsStatistics || Object.keys(puttsStatistics).length === 0) {
    return <Box>No Putting data available.</Box>; // Or a loading indicator
  }

  return <UnifiedPuttsView puttsStatistics={puttsStatistics} />;
};

export default HolebyHolePutts
