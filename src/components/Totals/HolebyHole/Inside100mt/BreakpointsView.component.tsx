import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { ICategoryStatsProps, IDesktopViewProps, IMobileViewProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import Cross from "../components/Cross.component";


export const DesktopView: React.FC<IDesktopViewProps> = ({ inside100Mt }) => {
  const categories = Object.keys(inside100Mt);
  const entries = Object.entries(inside100Mt);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="inside 100mt statistics table">
        <TableHead>
          <TableRow>
            {categories.map((categoryKey) => (
              <TableCell
                align='center'
                key={`header-${categoryKey}`}
                variant='putt'
                sx={(theme) => ({
                  padding: '0px'
                })}

              >
                <ShotsTableHeaderStack firstRow={catConversion(categoryKey)} secondRow={''} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {entries.map(([key, value]) => {
              return (
                <TableCell
                  align='center'
                  key={`data-${key}`}
                  sx={(theme) => ({
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    verticalAlign: 'top'
                  })}

                >
                  <CategoryStats value={value} />
                </TableCell>
              )
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const MobileView: React.FC<IMobileViewProps> = ({ inside100Mt }) => {
  const entries = Object.entries(inside100Mt);

  return (
    <Box sx={{ width: '100%' }}>
      {entries.map(([key, value]) => (
        <Accordion key={`accordion-${key}`}>
          <AccordionSummary>
            {/* Ensure AccordionSummary expands on click */}
            <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            {/* Removed redundant Box */}
            <CategoryStats value={value} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
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