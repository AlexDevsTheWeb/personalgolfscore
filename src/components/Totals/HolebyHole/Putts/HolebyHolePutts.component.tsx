import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IHolebyHolePutts } from "@/types/round.types";
import { Box } from "@mui/material";
import React from "react";
import { DesktopView, MobileView } from "./BreakpointsView.component";

const HolebyHolePutts: React.FC<IHolebyHolePutts> = ({ totalsPutts }) => {
  const { isMobile } = useDeviceDetection();
  const { puttsStatistics } = totalsPutts;

  // Basic validation or loading state
  if (!puttsStatistics || Object.keys(puttsStatistics).length === 0) {
    return <Box>No Putting data available.</Box>; // Or a loading indicator
  }

  return isMobile
    ? <MobileView puttsStatistics={puttsStatistics} />
    : <DesktopView puttsStatistics={puttsStatistics} />;
};

export default HolebyHolePutts
