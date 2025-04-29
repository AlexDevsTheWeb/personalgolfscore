import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { DesktopView, MobileView } from "./BreakpointsView.component";

const HolebyHoleFwAndIrons: React.FC<IRoundTotalsProps> = ({ roundTotals }) => {
  const { isMobile } = useDeviceDetection();
  const { fwAndIrons } = roundTotals;

  // Basic validation or loading state
  if (!fwAndIrons || Object.keys(fwAndIrons).length === 0) {
    return <Box>No Fairway Wood/Iron data available.</Box>; // Or a loading indicator
  }

  return isMobile
    ? <MobileView fwAndIrons={fwAndIrons} />
    : <DesktopView fwAndIrons={fwAndIrons} />;
};

export default HolebyHoleFwAndIrons