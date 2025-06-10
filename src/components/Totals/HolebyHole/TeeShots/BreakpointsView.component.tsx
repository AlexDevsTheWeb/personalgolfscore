import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ITeeshotsCategoryStatsProps, ITeeshotsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import StatBlock from "../components/StackBlock.component";
import TeeShotDispersion from "../components/TeeshotDispersion.component";

export const CategoryStats: React.FC<ITeeshotsCategoryStatsProps> = React.memo(({ value }) => {
  const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : '0';

  return (
    <Stack spacing={1}>
      {/* Add the TeeShotDispersion component */}
      <TeeShotDispersion
        left={value.missLeft}
        center={value.fairwayHits}
        right={value.missRight}
        totals={value.par4_5_Attempts || 0} // Pass the count of attempts on Par 4s/5s
      />
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Missed L' value={displayValue(value.missLeft)} />
        <GridPuttsStat size={{ xs: 4 }} string='Missed R' value={displayValue(value.missRight)} />
        <GridPuttsStat size={{ xs: 4 }} string='FIR Miss' value={displayValue(value.noGreen)} /> {/* Display FIR Miss count */}
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Fws hits' value={displayValue(value.fairwayHits)} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={displayValue(value.attempts)} />
        {/* Format average distance */}
        <GridPuttsStat size={{ xs: 4 }} string='Avg. dis.' value={value.averageDistance > 0 ? `${value.averageDistance.toFixed(1)}m` : '0m'} />
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
    <Grid container spacing={1} sx={{ py: 1 }}> {/* Removed filter to include teeIron */}
      {entries.filter(([key]) => key !== 'teeIron').map(([key, value]) => {
        return (
          <StatBlock
            key={key}
            title={`${catConversion(key)} Tee Shots`}
            gridProps={{ size: { xs: 12, sm: 4, md: 4, lg: 4 } }} // 1 on xs, 2 on sm, 4 on md/lg
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid>
  );
};