import { CHIPPING } from "@/enum/shots.enum";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IChipCategoryStatsProps, IChipMobileViewProps } from "@/types/props.types";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import StatBlock from "../components/StackBlock.component";

export const CategoryStats: React.FC<IChipCategoryStatsProps> = React.memo(({ value }) => {
  return (
    <Stack spacing={1}>
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='U&D made' value={value.upDownMade} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={value.attempts} />
        <GridPuttsStat size={{ xs: 4 }} string='Shots holed' value={value.shotsHoled} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat
          size={{ xs: 4 }}
          string='Average shots'
          value={(typeof value.averageShots === 'number' ? value.averageShots : 0).toFixed(2)} />
        <GridPuttsStat
          size={{ xs: 4 }}
          string='Avg. distance'
          value={(typeof value.averageHoleDistanceShot === 'number' ? value.averageHoleDistanceShot : 0).toFixed(2)} />
        <GridPuttsStat size={{ xs: 4 }} string='Green missed' value={value.greensMissed ? value.greensMissed : 0} />
      </Grid>
    </Stack>
  );
});

export const UnifiedChippingPitchingView: React.FC<IChipMobileViewProps> = ({ chipPitch }) => {
  const entries = Object.entries(chipPitch);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No Chipping & Pitching data available.</Typography>;
  }

  return (
    <Grid container spacing={1} sx={{ py: 1 }}>
      {entries.map(([key, value]) => {
        const clubType = CHIPPING[key.toUpperCase() as keyof typeof CHIPPING] || key;
        return (
          <StatBlock
            key={key}
            title={clubType as string}
            gridProps={{ size: { xs: 12, sm: 6, md: 3 } }} // 1 on xs, 2 on sm, 3 on md/lg
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid>
  );
};