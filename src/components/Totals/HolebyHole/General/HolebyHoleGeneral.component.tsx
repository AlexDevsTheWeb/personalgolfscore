import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import ShotsTableHeader from "@/components/RoundsData/components/shotsTable/ShotsTableHeader.component";
import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import ShotsTableTotalsBody from "@/components/RoundsData/components/shotsTable/ShotsTableTotalsBody.component";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import AccordionSummary from "@/styles/accordion/AccordionSummary.styles";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import NewGridCellStats from "@/styles/grid/NewGridCellStats.style";
import { IRoundTotalsProps } from "@/types/props.types";
import { formatPerc } from "@/utils/number/number.utils";
import { correctVsParString } from "@/utils/shots/shots.utils";
import { Accordion, AccordionDetails, Box, Divider, Paper, Stack, Table, TableContainer, Typography } from "@mui/material";
import _ from "lodash";


const HolebyHoleGeneral = ({ roundTotals, dashboard, par }: IRoundTotalsProps) => {

  const { score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out } = roundTotals;
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    !useDeviceDetection().isMobile
      ?
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
          <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={false} dashboard={dashboard} viewPar={false} />
          <ShotsTableTotalsBody firstColumn={false} roundTotals={roundTotals} dashboard={dashboard} />
        </Table>
      </TableContainer>
      :
      <Box key={_.uniqueId("general_")} sx={{ gap: '10px' }}>
        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Score' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion>
              <NewGridCellStats size={{ xs: 3 }}>
                <Stack sx={{ textAlign: 'center', border: '2px solid #ff9900' }}>
                  <Typography>{'TOT'}</Typography>
                  <Typography fontWeight={'bold'}>{`${score.totals} (${correctScore})`}</Typography>
                  <Typography>{roundTotals.score.avg}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 3 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>{'IN'}</Typography>
                  <Typography fontWeight={'bold'}>{`${score.scoreIN} (${correctScoreIN})`}</Typography>
                  <Typography>{score.avgIN}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 3 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>{'OUT'}</Typography>
                  <Typography fontWeight={'bold'}>{`${score.scoreOUT} (${correctScoreOUT})`}</Typography>
                  <Typography>{score.avgOUT}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Points' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion>
              <NewGridCellStats size={{ xs: 3 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>TOT</Typography>
                  <Typography fontWeight={'bold'}>{points.totals}</Typography>
                  <Typography>{points.avg}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 3 }}>
                <Typography>IN</Typography>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}>{points.pointsIN}</Typography>
                  <Typography>{points.avgIN}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 3 }}>
                <Typography>OUT</Typography>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}>{points.pointsOUT}</Typography>
                  <Typography>{points.avgOUT}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Fairways' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Center</Typography>
                  <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Total</Typography>
                  <Typography fontWeight={'bold'}>{fairway.total}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <Divider />
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Left</Typography>
                  <Typography>{`${fairway.fairwayLeft} (${formatPerc(fairway.fairwayLeft / fairway.total)})`}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Center</Typography>
                  <Typography>{`${fairway.fairwayCenter} (${formatPerc(fairway.fairwayCenter / fairway.total)})`}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Right</Typography>
                  <Typography>{`${fairway.fairwayRight} (${formatPerc(fairway.fairwayRight / fairway.total)})`}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}><ShotPosition position={4} /></Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}><ShotPosition position={5} /></Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}><ShotPosition position={6} /></Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='GIR' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>TOT</Typography>
                  <Typography fontWeight={'bold'}>{gir.totals}</Typography>
                  <Typography>{gir.avg}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>IN</Typography>
                  <Typography fontWeight={'bold'}>{gir.totalsIN}</Typography>
                  <Typography>{gir.avgIN}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>{gir.totalsOUT}</Typography>
                  <Typography>{gir.avgOUT}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Putts/GIR' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>TOT</Typography>
                  <Typography fontWeight={'bold'}>{putts.puttsGir}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>IN</Typography>
                  <Typography fontWeight={'bold'}>{putts.puttsGirIn}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>{putts.puttsGirOut}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='GIR Bogey' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>TOT</Typography>
                  <Typography fontWeight={'bold'}>{girBogey.totals}</Typography>
                  <Typography>{girBogey.avg}</Typography>
                </Stack>

              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>IN</Typography>
                  <Typography fontWeight={'bold'}>{girBogey.totalsIN}</Typography>
                  <Typography>{girBogey.avgIN}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>{girBogey.totalsOUT}</Typography>
                  <Typography>{girBogey.avgOUT}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Scramble' secondRow={'Par saved outside green'} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Saved</Typography>
                  <Typography fontWeight={'bold'}>{scramble.saved}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Totals</Typography>
                  <Typography fontWeight={'bold'}>{scramble.totals}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 12 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}>
                    {scramble.perc !== 0 && `${scramble.perc.toFixed(2)}%`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Up & Down' secondRow={'Par saved without GIR'} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Saved</Typography>
                  <Typography fontWeight={'bold'}>{upDown.saved}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Totals</Typography>
                  <Typography fontWeight={'bold'}>{upDown.totals}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 12 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}>{upDown.perc !== 0 && `${upDown.perc.toFixed(2)}%`}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Putts' secondRow={'TOT IN OUT'} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>TOT</Typography>
                  <Typography fontWeight={'bold'}>{putts.totals}</Typography>
                  <Typography>{putts.avg}</Typography>
                </Stack>

              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>IN</Typography>
                  <Typography fontWeight={'bold'}>{putts.totalsIN}</Typography>
                  <Typography>{putts.avgIN}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>{putts.totalsOUT}</Typography>
                  <Typography>{putts.avgOUT}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Sand' secondRow={'saved made'} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Saved</Typography>
                  <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                  <Typography>{sand.avgSaved}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>Totals</Typography>
                  <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                  <Typography>{sand.avg}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <GridAccordion container spacing={1}>
              <NewGridCellStats size={{ xs: 12 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>{sand.savedPerc !== 0 && `${sand.savedPerc}%`}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>
            <ShotsTableHeaderStack firstRow='Penalties' secondRow={''} />
          </AccordionSummary>
          <AccordionDetails>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 4 }}>
                <Typography>WATER</Typography>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'}>

                    {(water.totals !== 0) ? water.totals : 0}
                  </Typography>
                  <Typography>
                    {`${(water.avg !== 0) ? water.avg : '-'}`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>IN</Typography>
                  <Typography fontWeight={'bold'}>
                    {(water.totalsIN !== 0) ? water.totalsIN : 0}
                  </Typography>
                  <Typography>
                    {`${(water.avgIN !== 0) ? water.avgIN : '-'}`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>
                    {(water.totalsOUT !== 0) ? water.totalsOUT : 0}
                  </Typography>
                  <Typography>
                    {`${(water.avgOUT !== 0) ? water.avgOUT : '-'}`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <Divider />
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>

              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>
                    {(out.totals !== 0) ? out.totals : 0}
                  </Typography>
                  <Typography>
                    {`${(out.avg !== 0) ? out.avg : '-'}`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>IN</Typography>
                  <Typography fontWeight={'bold'}>
                    {(out.totalsIN !== 0) ? out.totalsIN : 0}
                  </Typography>
                  <Typography>
                    {`${(out.avgIN !== 0) ? out.avgIN : '-'}`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography>OUT</Typography>
                  <Typography fontWeight={'bold'}>
                    {(out.totalsOUT !== 0) ? out.totalsOUT : 0}
                  </Typography>
                  <Typography>
                    {`${(out.avgOUT !== 0) ? out.avgOUT : '-'}`}
                  </Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </AccordionDetails>
        </Accordion>

      </Box>
  )

}

export default HolebyHoleGeneral
