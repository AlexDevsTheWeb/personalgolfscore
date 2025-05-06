import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ITeeshotsCategoryStatsProps, ITeeshotsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Box, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Grid2Props } from "@mui/material/Grid2";
import React from "react";


export const CategoryStats: React.FC<ITeeshotsCategoryStatsProps> = React.memo(({ value }) => {
  const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : '-';
  const displayPercentage = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? formatPerc(val / 100) : '-';

  return (
    <Stack spacing={1}>
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Left %' value={displayPercentage(value.missLeftPCT)} />
        <GridPuttsStat size={{ xs: 4 }} string='Center %' value={displayPercentage(value.fairwayCenterPCT)} />
        <GridPuttsStat size={{ xs: 4 }} string='Right %' value={displayPercentage(value.missRightPCT)} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Fws hits' value={displayValue(value.fairwayHits)} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={displayValue(value.attempts)} />
        {/* Format average distance */}
        <GridPuttsStat size={{ xs: 4 }} string='Avg. dis.' value={value.averageDistance > 0 ? `${value.averageDistance.toFixed(1)}m` : '-'} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Missed L' value={displayValue(value.missLeft)} />
        <GridPuttsStat size={{ xs: 4 }} string='Missed R' value={displayValue(value.missRight)} />
        {/* Assuming noGreen maps to FIR Miss */}
        <GridPuttsStat size={{ xs: 4 }} string='FIR Miss' value={displayValue(value.noGreen)} />
      </Grid2>
    </Stack>
  );
});

interface StatBlockProps {
  title: string;
  children: React.ReactNode;
  gridProps?: Grid2Props;
}

const StatBlock: React.FC<StatBlockProps> = ({ title, children, gridProps }) => (
  <Grid2 {...gridProps}>
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h3" gutterBottom sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </Box>
    </Paper>
  </Grid2>
);

export const UnifiedTeeShotsView: React.FC<ITeeshotsMobileViewProps> = ({ teeShots }) => {
  const entries = Object.entries(teeShots);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No tee shot data available for these categories.</Typography>;
  }

  return (
    <Grid2 container spacing={2} sx={{ p: 2 }}>
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
    </Grid2>
  );
};