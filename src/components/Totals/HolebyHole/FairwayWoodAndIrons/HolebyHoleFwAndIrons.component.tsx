import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import AccordionSummary from "@/styles/accordion/AccordionSummary.styles";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from "@/types/props.types";
import { catConversion } from "@/utils/constant.utils";
import { Accordion, AccordionDetails, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
import Cross from "../components/Cross.component";

const HolebyHoleFwAndIrons = ({ roundTotals }: IRoundTotalsProps) => {

  const { fwAndIrons } = roundTotals;
  const categories = Object.keys(fwAndIrons);

  return (
    !useDeviceDetection().isMobile ?
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent', overflowX: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                categories.map((cat: string, index: number) => {
                  return (
                    <TableCell align='center' key={index} variant='putt' sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                      <ShotsTableHeaderStack firstRow={catConversion(cat)} secondRow={''} />
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>

          <TableBody key={_.uniqueId("fwIrons_")}>
            <TableRow>
              {
                Object.entries(fwAndIrons).map(([key, value], index: number) => {
                  return (
                    <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                      <Stack>
                        <Cross left={value.missedLeft} right={value.missedRight} center={value.greenHits} short={value.missedShort} over={value.missedOver} totals={value.attempts} />
                        <Divider />
                        <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
                          <GridPuttsStat item xs={3} string='Greens hit' value={value.greenHits} />
                          <GridPuttsStat item xs={3} string='Attempts' value={value.attempts} />
                          <GridPuttsStat item xs={3} string='Avg. shots' value={value.averageShots} />
                          <GridPuttsStat item xs={3} string='Avg. dist. GIR' value={value.averageDistGIR} />
                        </Grid2>
                        <Divider />
                        <Grid2 container spacing={1} sx={{ justifyContent: 'space-between' }}>
                          <GridPuttsStat item xs={3} string='Left' value={value.missedLeft} />
                          <GridPuttsStat item xs={3} string='Right' value={value.missedRight} />
                          <GridPuttsStat item xs={3} string='Short' value={value.missedShort} />
                          <GridPuttsStat item xs={3} string='Long' value={value.missedOver} />
                        </Grid2>
                      </Stack>
                    </TableCell>
                  )
                })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >
      :
      <Box key={_.uniqueId("fwIrons_")} sx={{ gap: '10px' }}>
        {
          Object.entries(fwAndIrons).map(([key, value], index: number) => {
            return (
              <Accordion>
                <AccordionSummary>
                  <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <Cross left={value.missedLeft} right={value.missedRight} center={value.greenHits} short={value.missedShort} over={value.missedOver} totals={value.attempts} />
                    <Divider />
                    <GridAccordion>
                      <GridPuttsStat item xs={3} string='Greens hit' value={value.greenHits} />
                      <GridPuttsStat item xs={3} string='Attempts' value={value.attempts} />
                      <GridPuttsStat item xs={3} string='Avg. shots' value={value.averageShots} />
                      <GridPuttsStat item xs={3} string='Avg. dist. GIR' value={value.averageDistGIR} />
                    </GridAccordion>
                    <Divider />
                    <GridAccordion>
                      <GridPuttsStat item xs={3} string='Left' value={value.missedLeft} />
                      <GridPuttsStat item xs={3} string='Right' value={value.missedRight} />
                      <GridPuttsStat item xs={3} string='Short' value={value.missedShort} />
                      <GridPuttsStat item xs={3} string='Long' value={value.missedOver} />
                    </GridAccordion>
                  </Stack>
                </AccordionDetails>
              </Accordion>

            )
          })
        }
      </Box >
  )
}

export default HolebyHoleFwAndIrons