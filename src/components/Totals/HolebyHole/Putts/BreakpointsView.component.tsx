import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IPuttsMobileViewProps, IPuttsOverallStatsProps, IPuttsRangeStatsProps } from "@/types/props.types";
import { IPuttsBreakDownStatistics } from "@/types/roundTotals.types";
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import StatBlock from "../components/StackBlock.component";

const displayValue = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? val : '-';
const displayAverage = (val: number | undefined | null, precision: number = 2) => (val !== undefined && val !== null && val !== 0) ? val.toFixed(precision) : '-';
const displayPercentage = (val: number | undefined | null) => (val !== undefined && val !== null && val !== 0) ? formatPerc(val) : '-';



const OverallStats: React.FC<IPuttsOverallStatsProps> = React.memo(({ value }) => (
  <Stack spacing={1}>
    <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='Putts' value={displayValue(value.totalPutts)} />
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='Putts/GIR' value={displayAverage(value.puttsInGIR)} />
    </Grid>
    <Divider />
    <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='Birdie conv.' value={displayPercentage(value.birdieConversion)} />
      <GridPuttsStat size={{ xs: 6, md: 12 }} string='3 putts (tot)' value={displayValue(value.threePutts)} />
    </Grid>
  </Stack>
));

const RangeStats: React.FC<IPuttsRangeStatsProps> = React.memo(({ value }) => {
  const twoPuttPerc = (value.putt1Perc === 0 && value.putt3Perc === 0) ? 0 : 1 - value.putt1Perc - value.putt3Perc;

  return (
    <Stack spacing={1}>
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='1 putt %' value={displayPercentage(value.putt1Perc)} />
        <GridPuttsStat size={{ xs: 4 }} string='2 putt %' value={displayPercentage(twoPuttPerc)} />
        <GridPuttsStat size={{ xs: 4 }} string='3 putt %' value={displayPercentage(value.putt3Perc)} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Holed' value={displayValue(value.puttsHoled)} />
        <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={displayValue(value.puttsAttempts)} />
        <GridPuttsStat size={{ xs: 4 }} string='Average' value={displayAverage(value.puttsAverage)} />
      </Grid>
      <Divider />
      <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
        <GridPuttsStat size={{ xs: 4 }} string='Avg. dist.' value={displayAverage(value.puttsAverageDistance)} />
        <GridPuttsStat size={{ xs: 4 }} string='2° putt avg.' value={displayAverage(value.puttsSecondAverageLength)} />
        <GridPuttsStat size={{ xs: 4 }} string='3 putts' value={displayValue(value.putts3)} />
      </Grid>
    </Stack>
  );
});

export const UnifiedPuttsView: React.FC<IPuttsMobileViewProps> = ({ puttsStatistics }) => {
  const overallStats = puttsStatistics._puttsOverall;
  const rangeEntries = Object.entries(puttsStatistics).filter(([key]) => key !== '_puttsOverall') as [string, IPuttsBreakDownStatistics][];

  if (!overallStats && rangeEntries.length === 0) {
    return <Typography sx={{ p: 2, textAlign: 'center' }}>No Putting data available.</Typography>;
  }

  console.log("overallStats: ", overallStats)

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {overallStats && (
        <StatBlock
          title={catConversion('_puttsOverall')}
          gridProps={{ size: { xs: 12, sm: 6, md: 4 } }}
        >
          <OverallStats value={overallStats} />
        </StatBlock>
      )}
      {rangeEntries.map(([key, value]) => {
        // if (!value || value.puttsAttempts === 0) { // Assuming puttsAttempts indicates if there's data
        //   return null;
        // }
        return (
          <StatBlock
            key={key}
            title={catConversion(key)}
            gridProps={{ size: { xs: 12, sm: 6, md: 4 } }}
          >
            <RangeStats value={value} />
          </StatBlock>
        );
      })}
    </Grid>
  );
};