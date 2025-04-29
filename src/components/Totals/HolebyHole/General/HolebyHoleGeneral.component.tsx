import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsProps } from "@/types/props.types";
import { Box } from "@mui/material";
import React from "react";
import { DesktopView, MobileView } from "./BreakpointsView.component";

const HolebyHoleGeneral: React.FC<IRoundTotalsProps> = ({ roundTotals, dashboard, par }) => {
  const { isMobile } = useDeviceDetection();
  const { score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out } = roundTotals;

  if (!roundTotals || Object.keys(roundTotals).length === 0) {
    return <Box>No General data available.</Box>; // Or a loading indicator
  }

  return isMobile
    ? <MobileView {...{ score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out }} />
    : <DesktopView roundTotals={roundTotals} dashboard={dashboard} />;
};

export default HolebyHoleGeneral
