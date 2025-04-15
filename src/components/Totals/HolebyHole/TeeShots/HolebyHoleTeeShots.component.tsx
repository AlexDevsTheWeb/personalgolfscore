import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import AccordionSummary from "@/styles/accordion/AccordionSummary.styles";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from "@/utils/number/number.utils";
import { Accordion, AccordionDetails, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";

const HolebyHoleTeeShots = ({ roundTotals, dashboard, par }: IRoundTotalsProps) => {

  const { teeShots } = roundTotals;
  const categories = Object.keys(teeShots);

  return (
    !useDeviceDetection().isMobile ?
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                categories.map((teeShot: string, index: number) => {
                  return (
                    <TableCell align='center' key={index} variant='putt' sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                      <ShotsTableHeaderStack firstRow={catConversion(teeShot)} secondRow={''} />
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>

          <TableBody key={_.uniqueId("putts_")}>
            <TableRow>
              {
                Object.entries(teeShots).map(([key, value], index: number) => {
                  return (
                    <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                      <Stack>
                        <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
                          <GridPuttsStat size={{ xs: 4 }} string='Left %' value={formatPerc(value.fairwayLeftPCT)} />
                          <GridPuttsStat size={{ xs: 4 }} string='Center %' value={formatPerc(value.fairwayCenterPCT)} />
                          <GridPuttsStat size={{ xs: 4 }} string='Right %' value={formatPerc(value.fairwayRightPCT)} />
                        </Grid2>
                        <Divider />
                        <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
                          <GridPuttsStat size={{ xs: 4 }} string='Fws hits' value={value.fairwayHits !== 0 ? value.fairwayHits : '-'} />
                          <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={value.attempts !== 0 ? value.attempts : '-'} />
                          <GridPuttsStat size={{ xs: 4 }} string='Avg. dis.' value={value.averageDistance !== 0 ? value.averageDistance : '-'} />
                        </Grid2>
                        <Divider />
                        <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
                          <GridPuttsStat size={{ xs: 4 }} string='Missed L' value={value.missLeft !== 0 ? value.missLeft : '-'} />
                          <GridPuttsStat size={{ xs: 4 }} string='Missed R' value={value.missRight !== 0 ? value.missRight : '-'} />
                          <GridPuttsStat size={{ xs: 4 }} string='No green' value={value.noGreen !== 0 ? value.noGreen : '-'} />
                        </Grid2>
                      </Stack>
                    </TableCell>
                  )
                })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      :
      <Box key={_.uniqueId("teeShots_")} sx={{ gap: '10px' }}>
        {
          Object.entries(teeShots).map(([key, value], index: number) => {
            return (

              <Accordion key={key}>
                <AccordionSummary>
                  <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <GridAccordion>
                      <GridPuttsStat size={{ xs: 4 }} string='Left %' value={formatPerc(value.fairwayLeftPCT)} />
                      <GridPuttsStat size={{ xs: 4 }} string='Center %' value={formatPerc(value.fairwayCenterPCT)} />
                      <GridPuttsStat size={{ xs: 4 }} string='Right %' value={formatPerc(value.fairwayRightPCT)} />
                    </GridAccordion>
                    <Divider />
                    <GridAccordion container spacing={1}>
                      <GridPuttsStat size={{ xs: 4 }} string='Fws hits' value={value.fairwayHits !== 0 ? value.fairwayHits : '-'} />
                      <GridPuttsStat size={{ xs: 4 }} string='Attempts' value={value.attempts !== 0 ? value.attempts : '-'} />
                      <GridPuttsStat size={{ xs: 4 }} string='Avg. dis.' value={value.averageDistance !== 0 ? value.averageDistance : '-'} />
                    </GridAccordion>
                    <Divider />
                    <GridAccordion container spacing={1}>
                      <GridPuttsStat size={{ xs: 4 }} string='Missed L' value={value.missLeft !== 0 ? value.missLeft : '-'} />
                      <GridPuttsStat size={{ xs: 4 }} string='Missed R' value={value.missRight !== 0 ? value.missRight : '-'} />
                      <GridPuttsStat size={{ xs: 4 }} string='No green' value={value.noGreen !== 0 ? value.noGreen : '-'} />
                    </GridAccordion>
                  </Stack>
                </AccordionDetails>
              </Accordion>

            )
          })}
      </Box>
  )
}

export default HolebyHoleTeeShots
