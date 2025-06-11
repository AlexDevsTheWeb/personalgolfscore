import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IFwAndIronsCategoryStatsProps, IFwAndIronsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import Cross from "../components/Cross.component";
import StatBlock from "../components/StackBlock.component";


export const CategoryStats: React.FC<IFwAndIronsCategoryStatsProps> = React.memo(({ value }) => {
  const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : 0;
  const displayAverage = (val: number | undefined | null, precision: number = 2) => (val !== undefined && val !== null && val !== 0) ? val.toFixed(precision) : 0;

  return (
    <Stack spacing={1}>
      {/* Use missedLong from type */}
      <Cross
        left={value.missedLeft}
        right={value.missedRight}
        center={value.girHits}
        short={value.missedShort}
        over={value.missedLong}
        totals={value.attempts}
      />
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='GIR hit' value={displayValue(value.girHits ? value.girHits : 0)} />
        <GridPuttsStat size={{ xs: 3 }} string='Attempts' value={displayValue(value.attempts ? value.attempts : 0)} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. shots' value={displayAverage(value.averageShots ? value.averageShots : 0)} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. dist. GIR' value={displayAverage(value.averageDistGIR ? value.averageDistGIR : 0)} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Left' value={displayValue(value.missedLeft ? value.missedLeft : 0)} />
        <GridPuttsStat size={{ xs: 3 }} string='Right' value={displayValue(value.missedRight ? value.missedRight : 0)} />
        <GridPuttsStat size={{ xs: 3 }} string='Short' value={displayValue(value.missedShort ? value.missedShort : 0)} />
        <GridPuttsStat size={{ xs: 3 }} string='Long' value={displayValue(value.missedLong ? value.missedLong : 0)} />
      </Grid>
    </Stack>
  );
});

export const UnifiedFwAndIronsView: React.FC<IFwAndIronsMobileViewProps> = ({ fwAndIrons }) => {
  const entries = Object.entries(fwAndIrons);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No Fairway Wood & Irons data available.</Typography>;
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