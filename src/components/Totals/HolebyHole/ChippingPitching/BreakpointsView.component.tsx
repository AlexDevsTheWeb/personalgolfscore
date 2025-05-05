import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import { CHIPPING } from "@/enum/shots.enum";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IChipCategoryStatsProps, IChipDesktopViewProps, IChipMobileViewProps } from "@/types/props.types";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";


export const DesktopView: React.FC<IChipDesktopViewProps> = ({ chipPitch }) => {
  const categories = Object.keys(chipPitch);
  const entries = Object.entries(chipPitch);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="chipping and pitching statistics table">
        <TableHead>
          <TableRow>
            {categories.map((categoryKey) => {
              const clubType = CHIPPING[categoryKey.toUpperCase() as keyof typeof CHIPPING] || categoryKey;
              return (
                <TableCell
                  align='center'
                  key={`header-${categoryKey}`}
                  variant='putt'
                  sx={(theme) => ({
                    padding: '0px'
                  })}
                >
                  <ShotsTableHeaderStack firstRow={clubType as string} secondRow={''} />
                </TableCell>
              );
            })}
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
                    verticalAlign: 'top', padding: 1
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

export const MobileView: React.FC<IChipMobileViewProps> = ({ chipPitch }) => {
  const entries = Object.entries(chipPitch);

  return (
    <Box sx={{ width: '100%' }}>
      {entries.map(([key, value]) => {
        const clubType = CHIPPING[key.toUpperCase() as keyof typeof CHIPPING] || key;
        return (
          <Accordion key={`accordion-${key}`}>
            <AccordionSummary>
              <ShotsTableHeaderStack firstRow={clubType as string} secondRow={''} />
            </AccordionSummary>
            <AccordionDetails>
              <CategoryStats value={value} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

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