import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IFwAndIronsCategoryStatsProps, IFwAndIronsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Box, Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Grid2Props } from "@mui/material/Grid2";
import React from "react";
import Cross from "../components/Cross.component";


export const CategoryStats: React.FC<IFwAndIronsCategoryStatsProps> = React.memo(({ value }) => {
  // Helper to display value or '-'
  const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : '-';
  // Helper to display formatted average or '-'
  const displayAverage = (val: number | undefined | null, precision: number = 2) => (val !== undefined && val !== null && val !== 0) ? val.toFixed(precision) : '-';

  return (
    <Stack spacing={1}>
      {/* Use missedLong from type */}
      <Cross
        left={value.missLeft}
        right={value.missRight}
        center={value.girHits} // Use girHits from type
        short={value.missShort}
        over={value.missLong} // Changed from missedOver
        totals={value.attempts}
      />
      <Divider />
      {/* Use GridAccordion for consistency if desired, or Grid2 */}
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Greens hit' value={displayValue(value.girHits)} />
        <GridPuttsStat size={{ xs: 3 }} string='Attempts' value={displayValue(value.attempts)} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. shots' value={displayAverage(value.averageShots)} />
        <GridPuttsStat size={{ xs: 3 }} string='Avg. dist. GIR' value={displayAverage(value.averageDistGIR)} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 3 }} string='Left' value={displayValue(value.missLeft)} />
        <GridPuttsStat size={{ xs: 3 }} string='Right' value={displayValue(value.missRight)} />
        <GridPuttsStat size={{ xs: 3 }} string='Short' value={displayValue(value.missShort)} />
        <GridPuttsStat size={{ xs: 3 }} string='Long' value={displayValue(value.missLong)} />
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

export const UnifiedFwAndIronsView: React.FC<IFwAndIronsMobileViewProps> = ({ fwAndIrons }) => {
  const entries = Object.entries(fwAndIrons);

  if (entries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No Fairway Wood & Irons data available.</Typography>;
  }

  return (
    <Grid2 container spacing={2} sx={{ p: 2 }}>
      {entries.map(([key, value]) => {
        // Handle potential undefined value for a category (like fwMidIron if optional)
        // or categories with no attempts
        // if (!value || value.attempts === 0) {
        //   return null;
        // }
        return (
          <StatBlock
            key={key}
            title={`${catConversion(key)}`}
            gridProps={{ size: { xs: 12, sm: 6, md: 4 } }} // Adjust for 2-3 items per row on larger screens
          >
            <CategoryStats value={value} />
          </StatBlock>
        );
      })}
    </Grid2>
  );
};