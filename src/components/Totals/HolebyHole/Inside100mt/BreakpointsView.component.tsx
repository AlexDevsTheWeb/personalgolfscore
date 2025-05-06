import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ICategoryStatsProps, IDesktopViewProps, IMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Box, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Grid2Props } from "@mui/material/Grid2";
import React from "react";
import Cross from "../components/Cross.component";


export const DesktopView: React.FC<IDesktopViewProps> = ({ inside100Mt }) => {
  const categories = Object.keys(inside100Mt);
  const entries = Object.entries(inside100Mt);

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
        over={value.missedLong}
        totals={value.attempts}
      />
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Greens hit' value={value.greensHits} />
        <GridPuttsStat size={{ xs: 3 }} string='Attempts' value={value.attempts} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. shots' value={value.averageShots.toFixed(2)} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. dist. GIR' value={value.averageDistGIR.toFixed(2)} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Left' value={value.missedLeft} />
        <GridPuttsStat size={{ xs: 3 }} string='Right' value={value.missedRight} />
        <GridPuttsStat size={{ xs: 3 }} string='Short' value={value.missedShort} />
        <GridPuttsStat size={{ xs: 3 }} string='Long' value={value.missedLong} />
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

export const UnifiedInside100View: React.FC<IMobileViewProps> = ({ inside100Mt }) => {
  const entries = Object.entries(inside100Mt);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No "Inside 100mt" data available.</Typography>;
  }

  return (
    <Grid2 container spacing={2} sx={{ p: 2 }}>
      {entries.map(([key, value]) => {
        // Filter out categories if they have no attempts
        // if (!value || value.attempts === 0) {
        //   return null;
        // }
        return (
          <StatBlock
            key={key}
            title={`${catConversion(key)}`} // Use catConversion for a user-friendly title
            gridProps={{ size: { xs: 12, sm: 6, md: 3 } }} // Adjust for 2-4 items per row
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid2>
  );
};