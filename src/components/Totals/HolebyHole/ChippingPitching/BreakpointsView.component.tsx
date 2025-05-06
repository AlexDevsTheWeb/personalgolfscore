import { CHIPPING } from "@/enum/shots.enum";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IChipCategoryStatsProps, IChipMobileViewProps } from "@/types/props.types";
import { Box, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Grid2Props } from "@mui/material/Grid2";
import React from "react";

export const CategoryStats: React.FC<IChipCategoryStatsProps> = React.memo(({ value }) => {
  return (
    <Stack spacing={1}>
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='U&D made' value={value.upDownMade} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={value.attempts} />
        <GridPuttsStat size={{ xs: 4 }} string='Shots holed' value={value.shotsHoled} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat
          size={{ xs: 4 }}
          string='Average shots'
          value={(typeof value.averageShot === 'number' ? value.averageShot : 0).toFixed(2)} />
        <GridPuttsStat
          size={{ xs: 4 }}
          string='Avg. distance'
          value={(typeof value.averageHoleDistance === 'number' ? value.averageHoleDistance : 0).toFixed(2)} />
        <GridPuttsStat size={{ xs: 4 }} string='Green missed' value={value.greensMissed} />
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

export const UnifiedChippingPitchingView: React.FC<IChipMobileViewProps> = ({ chipPitch }) => {
  const entries = Object.entries(chipPitch);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No Chipping & Pitching data available.</Typography>;
  }

  return (
    <Grid2 container spacing={2} sx={{ p: 2 }}>
      {entries.map(([key, value]) => {
        // Filter out categories if they have no attempts or data
        // if (!value || value.attempts === 0) {
        //   return null;
        // }
        const clubType = CHIPPING[key.toUpperCase() as keyof typeof CHIPPING] || key;
        return (
          <StatBlock
            key={key}
            title={clubType as string}
            gridProps={{ size: { xs: 12, sm: 6, md: 4 } }} // 1 on xs, 2 on sm, 3 on md/lg
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid2>
  );
};