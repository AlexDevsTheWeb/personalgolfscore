import GridCross from "@/styles/grid/GridCross.styles";
import CompositeTypography from "@/styles/typography/CompositeTypography.styles";
import { safePercentage } from "@/utils/calculator/math.utils";
import { formatPercNoPer } from "@/utils/number/number.utils";
import { Grid } from "@mui/material";
import React from "react";

interface ITeeShotDispersionProps {
  left: number;
  center: number;
  right: number;
  totals: number; // Total attempts on Par 4s/5s for this club
}

const TeeShotDispersion: React.FC<ITeeShotDispersionProps> = ({ left, center, right, totals }) => {
  // Use totals (par4_5_Attempts) for percentage calculation
  const totalFairwayAttempts = totals;

  return (
    <Grid container sx={{ width: '100%', justifyContent: 'space-between' }}>
      <GridCross>
        <CompositeTypography string='Left' value={formatPercNoPer(safePercentage(left, totalFairwayAttempts))} />
      </GridCross>
      <GridCross>
        {/* Center column - only displays Center hits */}
        <CompositeTypography string='CENTER' value={formatPercNoPer(safePercentage(center, totalFairwayAttempts))} sx={{ padding: '10px', color: 'white !important' }} center='green' />
      </GridCross>
      <GridCross>
        <CompositeTypography string='Right' value={formatPercNoPer(safePercentage(right, totalFairwayAttempts))} />
      </GridCross>
    </Grid>
  );
}

export default TeeShotDispersion;