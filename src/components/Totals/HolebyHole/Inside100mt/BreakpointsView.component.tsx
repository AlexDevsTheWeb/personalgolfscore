import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ICategoryStatsProps, IDesktopViewProps, IMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Cross from "../components/Cross.component";
import StatBlock from "../components/StackBlock.component";

export const DesktopView: React.FC<IDesktopViewProps> = ({ inside100Mt }) => {
  return (
    <UnifiedInside100View inside100Mt={inside100Mt} />
  );
};

export const CategoryStats: React.FC<ICategoryStatsProps> = React.memo(({ value }) => {
  return (
    <Stack spacing={1}>
      <Cross
        left={value.missedLeft}
        right={value.missedRight}
        center={value.greensHits}
        short={value.missedShort}
        over={value.missedOver}
        totals={value.attempts}
      />
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Greens hit' value={value.greensHits ? value.greensHits : '0'} />
        <GridPuttsStat size={{ xs: 3 }} string='Attempts' value={value.attempts} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. shots' value={value.averageShots.toFixed(2)} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. dist. GIR' value={value.averageDistGIR.toFixed(2)} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Left' value={value.missedLeft} />
        <GridPuttsStat size={{ xs: 3 }} string='Right' value={value.missedRight} />
        <GridPuttsStat size={{ xs: 3 }} string='Short' value={value.missedShort} />
        <GridPuttsStat size={{ xs: 3 }} string='Long' value={value.missedOver} />
      </Grid>
    </Stack>
  );
});

export const UnifiedInside100View: React.FC<IMobileViewProps> = ({ inside100Mt }) => {
  const entries = Object.entries(inside100Mt);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No "Inside 100mt" data available.</Typography>;
  }

  return (
    <Grid container spacing={1} sx={{ py: 1 }}>
      {entries.map(([key, value]) => {
        return (
          <StatBlock
            key={key}
            title={`${catConversion(key)}`}
            gridProps={{ size: { xs: 12, sm: 6, md: 3 } }}
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid>
  );
};