import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { DesktopView, MobileView } from "./BreakpointsView.component";

const HolebyHoleTeeShots: React.FC<IRoundTotalsProps> = ({ roundTotals }) => {
  const { isMobile } = useDeviceDetection();
  const { teeShots } = roundTotals;

  // Basic validation or loading state
  if (!teeShots || Object.keys(teeShots).length === 0) {
    return <Box>No Tee Shot data available.</Box>; // Or a loading indicator
  }

  return isMobile
    ? <MobileView teeShots={teeShots} />
    : <DesktopView teeShots={teeShots} />;
};

export default HolebyHoleTeeShots
