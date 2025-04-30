import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IPuttsDesktopViewProps, IPuttsMobileViewProps, IPuttsOverallStatsProps, IPuttsRangeStatsProps } from "@/types/props.types";
import { IPuttsBreakDownStatistics } from "@/types/roundTotals.types";
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : '-';
const displayAverage = (val: number | undefined | null, precision: number = 2) => (val !== undefined && val !== null && val !== 0) ? val.toFixed(precision) : '-';
const displayPercentage = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? formatPerc(val) : '-';


const OverallStats: React.FC<IPuttsOverallStatsProps> = React.memo(({ value }) => (
  <Stack spacing={1}>
    <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='Putts' value={displayValue(value.totalPutts)} />
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='Putts/GIR' value={displayAverage(value.puttsInGIR)} />
    </Grid2>
    <Divider />
    <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='Birdie conv.' value={displayPercentage(value.birdieConversion)} />
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='3 putts (tot)' value={displayValue(value.threePutts)} />
    </Grid2>
  </Stack>
));

const RangeStats: React.FC<IPuttsRangeStatsProps> = React.memo(({ value }) => {
  const twoPuttPerc = (value.putt1Perc === 0 && value.putt3Perc === 0) ? 0 : 1 - value.putt1Perc - value.putt3Perc;

  return (
    <Stack spacing={1}>
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='1 putt %' value={displayPercentage(value.putt1Perc)} />
        <GridPuttsStat size={{ xs: 4 }} string='2 putt %' value={displayPercentage(twoPuttPerc)} />
        <GridPuttsStat size={{ xs: 4 }} string='3 putt %' value={displayPercentage(value.putt3Perc)} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Holed' value={displayValue(value.puttsHoled)} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={displayValue(value.puttsAttempts)} />
        <GridPuttsStat size={{ xs: 4 }} string='Average' value={displayAverage(value.puttsAverage)} />
      </Grid2>
      <Divider />
      <Grid2 container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Avg. dist.' value={displayAverage(value.puttsAverageDistance)} />
        <GridPuttsStat size={{ xs: 4 }} string='2° putt avg.' value={displayAverage(value.puttsSecondAverageLength)} />
        <GridPuttsStat size={{ xs: 4 }} string='3 putts' value={displayValue(value.putts3)} />
      </Grid2>
    </Stack>
  );
});

export const DesktopView: React.FC<IPuttsDesktopViewProps> = ({ puttsStatistics }) => {
  const overallStats = puttsStatistics._puttsOverall;
  const rangeEntries = Object.entries(puttsStatistics).filter(([key]) => key !== '_puttsOverall') as [string, IPuttsBreakDownStatistics][];
  const rangeKeys = rangeEntries.map(([key]) => key);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="putts statistics table">
        <TableHead>
          <TableRow>
            <TableCell align='center' key="header-overall" variant='putt'>
              <ShotsTableHeaderStack firstRow={catConversion('_puttsOverall')} secondRow={''} />
            </TableCell>
            {rangeKeys.map((rangeKey) => (
              <TableCell align='center' key={`header-${rangeKey}`} variant='putt'>
                <ShotsTableHeaderStack firstRow={catConversion(rangeKey)} secondRow={''} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center' key="data-overall" sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', verticalAlign: 'top', padding: 1 }}>
              <OverallStats value={overallStats} />
            </TableCell>
            {rangeEntries.map(([key, value]) => (
              <TableCell align='center' key={`data-${key}`} sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', verticalAlign: 'top', padding: 1 }}>
                <RangeStats value={value} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const MobileView: React.FC<IPuttsMobileViewProps> = ({ puttsStatistics }) => {
  const overallStats = puttsStatistics._puttsOverall;
  const rangeEntries = Object.entries(puttsStatistics).filter(([key]) => key !== '_puttsOverall') as [string, IPuttsBreakDownStatistics][];

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Accordion key="accordion-overall">
        <AccordionSummary>
          <ShotsTableHeaderStack firstRow={catConversion('_puttsOverall')} secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          {/* Use GridAccordion if needed for consistent styling */}
          <OverallStats value={overallStats} />
        </AccordionDetails>
      </Accordion>
      {rangeEntries.map(([key, value]) => (
        <Accordion key={`accordion-${key}`}>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            {/* Use GridAccordion if needed for consistent styling */}
            <RangeStats value={value} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};