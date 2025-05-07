import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ITeeshotsCategoryStatsProps, ITeeshotsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import StatBlock from "../components/StackBlock.component";


export const CategoryStats: React.FC<ITeeshotsCategoryStatsProps> = React.memo(({ value }) => {
  const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : '0';
  const displayPercentage = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? formatPerc(val / 100) : '0%';

  return (
    <Stack spacing={1}>
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Left %' value={displayPercentage(value.fairwayLeftPCT)} />
        <GridPuttsStat size={{ xs: 4 }} string='Center %' value={displayPercentage(value.fairwayCenterPCT)} />
        <GridPuttsStat size={{ xs: 4 }} string='Right %' value={displayPercentage(value.fairwayRightPCT)} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Fws hits' value={displayValue(value.fairwayHits)} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={displayValue(value.attempts)} />
        {/* Format average distance */}
        <GridPuttsStat size={{ xs: 4 }} string='Avg. dis.' value={value.averageDistance > 0 ? `${value.averageDistance.toFixed(1)}m` : '-'} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Missed L' value={displayValue(value.missLeft)} />
        <GridPuttsStat size={{ xs: 4 }} string='Missed R' value={displayValue(value.missRight)} />
        {/* Assuming noGreen maps to FIR Miss */}
        <GridPuttsStat size={{ xs: 4 }} string='FIR Miss' value={displayValue(value.noGreen)} />
      </Grid>
    </Stack>
  );
});

export const UnifiedTeeShotsView: React.FC<ITeeshotsMobileViewProps> = ({ teeShots }) => {
  const entries = Object.entries(teeShots);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No tee shot data available for these categories.</Typography>;
  }

  return (
    <Grid container spacing={1} sx={{ py: 1 }}>
      {entries.map(([key, value]) => {
        // Filter out categories if they have no attempts (or other relevant zero check)
        // if (!value || value.attempts === 0) {
        //   return null;
        // }
        return (
          <StatBlock
            key={key}
            title={`${catConversion(key)} Tee Shots`}
            gridProps={{ size: { xs: 12, sm: 6, md: 3, lg: 3 } }} // 1 on xs, 2 on sm, 4 on md/lg
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid>
  );
};