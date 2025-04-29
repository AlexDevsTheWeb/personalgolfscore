import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IFwAndIronsCategoryStatsProps, IFwAndIronsDesktopViewProps, IFwAndIronsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

export const DesktopView: React.FC<IFwAndIronsDesktopViewProps> = ({ fwAndIrons }) => {
  const categories = Object.keys(fwAndIrons);
  const entries = Object.entries(fwAndIrons);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="fairway wood and irons statistics table">
        <TableHead>
          <TableRow>
            {categories.map((categoryKey) => (
              <TableCell
                align='center'
                key={`header-${categoryKey}`} // Use category key
                variant='putt' // Assuming this variant exists or is custom
                sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}
              >
                <ShotsTableHeaderStack firstRow={catConversion(categoryKey)} secondRow={''} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {entries.map(([key, value]) => {
              // Handle potential undefined value for fwMidIron if it's optional
              if (!value) return null;
              return (
                <TableCell
                  align='center'
                  key={`data-${key}`} // Use category key
                  sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', verticalAlign: 'top', padding: 1 }} // Added padding
                >
                  <CategoryStats value={value} />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const MobileView: React.FC<IFwAndIronsMobileViewProps> = ({ fwAndIrons }) => {
  const entries = Object.entries(fwAndIrons);

  return (
    <Box sx={{ width: '100%' }}>
      {entries.map(([key, value]) => {
        // Handle potential undefined value for fwMidIron if it's optional
        if (!value) return null;
        return (
          <Accordion key={`accordion-${key}`}> {/* Use category key */}
            <AccordionSummary>
              <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
            </AccordionSummary>
            <AccordionDetails>
              {/* Use GridAccordion if needed for consistent styling, or just Stack */}
              <CategoryStats value={value} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};