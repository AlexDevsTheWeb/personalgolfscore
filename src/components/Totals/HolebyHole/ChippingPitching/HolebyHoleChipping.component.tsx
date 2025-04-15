import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import { CHIPPING } from "@/enum/shots.enum";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import AccordionSummary from "@/styles/accordion/AccordionSummary.styles";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from "@/types/props.types";
import { Accordion, AccordionDetails, Box, Divider, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";


const HolebyHoleChipping = ({ roundTotals }: IRoundTotalsProps) => {
  const { chipPitch } = roundTotals;
  const chipPitchCat = Object.keys(chipPitch);

  return (
    !useDeviceDetection().isMobile ?
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
        <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                chipPitchCat.map((club: string, index: number) => {
                  const clubType = CHIPPING[club.toUpperCase() as keyof typeof CHIPPING] || club;
                  return (
                    <TableCell align='center' key={index} variant='putt'>
                      <ShotsTableHeaderStack firstRow={clubType as string} secondRow={''} />
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>

          <TableBody key={_.uniqueId("putts_")}>
            <TableRow>
              {
                Object.entries(chipPitch).map(([key, value], index: number) => {
                  return (
                    <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                      <Stack >
                        <Grid2 container spacing={1}>
                          <GridPuttsStat size={{ xs: 4 }} string='U&D made' value={value.upDownMade} />
                          <GridPuttsStat size={{ xs: 4 }} string='Attempts made' value={value.attempts} />
                          <GridPuttsStat size={{ xs: 4 }} string='Shots holed' value={value.shotsHoled} />
                        </Grid2>
                        <Divider />
                        <Grid2 container spacing={1}>
                          <GridPuttsStat size={{ xs: 4 }} string='Average shots' value={value.averageShots} />
                          <GridPuttsStat size={{ xs: 4 }} string='Avg. distance' value={value.averageHoleDistanceShot} />
                          <GridPuttsStat size={{ xs: 4 }} string='Green missed' value={value.greenMissed} />
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
      <Box key={_.uniqueId("chipPitch_")} sx={{ gap: '10px' }}>
        {
          Object.entries(chipPitch).map(([key, value], index: number) => {
            const clubType = CHIPPING[key.toUpperCase() as keyof typeof CHIPPING] || key;
            return (
              <Box key={_.uniqueId("chipPitch_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>
                <Accordion>
                  <AccordionSummary>
                    <ShotsTableHeaderStack firstRow={clubType as string} secondRow={''} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      <GridAccordion>
                        <GridPuttsStat size={{ xs: 4 }} string='U&D made' value={value.upDownMade} />
                        <GridPuttsStat size={{ xs: 4 }} string='Attempts made' value={value.attempts} />
                        <GridPuttsStat size={{ xs: 4 }} string='Shots holed' value={value.shotsHoled} />
                      </GridAccordion>
                      <Divider />
                      <GridAccordion>
                        <GridPuttsStat size={{ xs: 4 }} string='Avgerage shots' value={value.averageShots} />
                        <GridPuttsStat size={{ xs: 4 }} string='Avg. distance' value={value.averageHoleDistanceShot} />
                        <GridPuttsStat size={{ xs: 4 }} string='Green missed' value={value.greenMissed} />
                      </GridAccordion>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )
          })}

      </Box>
  )
}

export default HolebyHoleChipping
