import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ITeeshotsCategoryStatsProps, ITeeshotsDesktopViewProps, ITeeshotsMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
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

export const DesktopView: React.FC<ITeeshotsDesktopViewProps> = ({ teeShots }) => {
  const categories = Object.keys(teeShots);
  const entries = Object.entries(teeShots);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="tee shots statistics table">
        <TableHead>
          <TableRow>
            {categories.map((categoryKey) => (
              <TableCell
                align='center'
                key={`header-${categoryKey}`}
                variant='putt'
                sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}
              >
                <ShotsTableHeaderStack firstRow={catConversion(categoryKey)} secondRow={''} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {entries.map(([key, value]) => (
              <TableCell
                align='center'
                key={`data-${key}`}
                sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', verticalAlign: 'top', padding: 1 }}
              >
                <CategoryStats value={value} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const MobileView: React.FC<ITeeshotsMobileViewProps> = ({ teeShots }) => {
  const entries = Object.entries(teeShots);

  return (
    <Box sx={{ width: '100%' }}>
      {entries.map(([key, value]) => (
        <Accordion key={_.uniqueId()}>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <CategoryStats value={value} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};