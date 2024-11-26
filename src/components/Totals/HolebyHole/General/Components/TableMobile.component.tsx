import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import NewGridCellStats from '@/styles/grid/NewGridCellStats.style';
import CompositeTypography from '@/styles/typography/CompositeTypography.styles';
import { IRoundTotalsProps } from '@/types/props.types';
import { formatPerc } from '@/utils/number/number.utils';
import { correctVsParString } from '@/utils/shots/shots.utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import _ from "lodash";

const TableMobile = ({ roundTotals }: IRoundTotalsProps) => {
  const { mainData: { coursePar }, score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out } = roundTotals;
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    <Box key={_.uniqueId("fwIrons_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Score' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <CompositeTypography value={coursePar} string={'Par'} />
          <Divider />
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>{'TOT'}</Typography>
                <Typography fontWeight={'bold'}>{`${score.totals} (${correctScore})`}</Typography>
                <Typography>{roundTotals.score.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>{'IN'}</Typography>
                <Typography fontWeight={'bold'}>{`${score.scoreIN} (${correctScoreIN})`}</Typography>
                <Typography>{score.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>{'OUT'}</Typography>
                <Typography fontWeight={'bold'}>{`${score.scoreOUT} (${correctScoreOUT})`}</Typography>
                <Typography>{score.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Points' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>TOT</Typography>
                <Typography fontWeight={'bold'}>{points.totals}</Typography>
                <Typography>{points.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Typography>IN</Typography>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}>{points.pointsIN}</Typography>
                <Typography>{points.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Typography>OUT</Typography>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}>{points.pointsOUT}</Typography>
                <Typography>{points.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Fairways' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Center</Typography>
                <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Total</Typography>
                <Typography fontWeight={'bold'}>{fairway.total}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Left</Typography>
                <Typography>{`${fairway.fairwayLeft} (${formatPerc(fairway.fairwayLeft / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Center</Typography>
                <Typography>{`${fairway.fairwayCenter} (${formatPerc(fairway.fairwayCenter / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Right</Typography>
                <Typography>{`${fairway.fairwayRight} (${formatPerc(fairway.fairwayRight / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}><ShotPosition position={4} /></Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}><ShotPosition position={5} /></Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}><ShotPosition position={6} /></Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='GIR' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>TOT</Typography>
                <Typography fontWeight={'bold'}>{gir.totals}</Typography>
                <Typography>{gir.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>IN</Typography>
                <Typography fontWeight={'bold'}>{gir.totalsIN}</Typography>
                <Typography>{gir.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>{gir.totalsOUT}</Typography>
                <Typography>{gir.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Putts/GIR' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>TOT</Typography>
                <Typography fontWeight={'bold'}>{putts.puttsGir}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>IN</Typography>
                <Typography fontWeight={'bold'}>{putts.puttsGirIn}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>{putts.puttsGirOut}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='GIR Bogey' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>TOT</Typography>
                <Typography fontWeight={'bold'}>{girBogey.totals}</Typography>
                <Typography>{girBogey.avg}</Typography>
              </Stack>

            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>IN</Typography>
                <Typography fontWeight={'bold'}>{girBogey.totalsIN}</Typography>
                <Typography>{girBogey.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>{girBogey.totalsOUT}</Typography>
                <Typography>{girBogey.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Scramble' secondRow={'Par saved outside green'} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Saved</Typography>
                <Typography fontWeight={'bold'}>{scramble.saved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Totals</Typography>
                <Typography fontWeight={'bold'}>{scramble.totals}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={12}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}>
                  {scramble.perc !== 0 && `${scramble.perc.toFixed(2)}%`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Up & Down' secondRow={'Par saved without GIR'} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Saved</Typography>
                <Typography fontWeight={'bold'}>{upDown.saved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Totals</Typography>
                <Typography fontWeight={'bold'}>{upDown.totals}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={12}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}>{upDown.perc !== 0 && `${upDown.perc.toFixed(2)}%`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Putts' secondRow={'TOT IN OUT'} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>TOT</Typography>
                <Typography fontWeight={'bold'}>{putts.totals}</Typography>
                <Typography>{putts.avg}</Typography>
              </Stack>

            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>IN</Typography>
                <Typography fontWeight={'bold'}>{putts.totalsIN}</Typography>
                <Typography>{putts.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>{putts.totalsOUT}</Typography>
                <Typography>{putts.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Sand' secondRow={'saved made'} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Saved</Typography>
                <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                <Typography>{sand.avgSaved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>Totals</Typography>
                <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                <Typography>{sand.avg}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={12}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>{sand.savedPerc !== 0 && `${sand.savedPerc}%`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          sx={{
            backgroundColor: '#f0f0f0', borderRadius: 0
            , boxShadow: 'none', border: 'none', height: '40px'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <ShotsTableHeaderStack firstRow='Penalties' secondRow={''} />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <NewGridCellStats item xs={4}>
              <Typography>WATER</Typography>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontWeight={'bold'}>

                  {(water.totals !== 0) ? water.totals : 0}
                </Typography>
                <Typography>
                  {`${(water.avg !== '-') ? water.avg : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>IN</Typography>
                <Typography fontWeight={'bold'}>
                  {(water.totalsIN !== 0) ? water.totalsIN : 0}
                </Typography>
                <Typography>
                  {`${(water.avgIN !== '-') ? water.avgIN : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>
                  {(water.totalsOUT !== 0) ? water.totalsOUT : 0}
                </Typography>
                <Typography>
                  {`${(water.avgOUT !== '-') ? water.avgOUT : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>

            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>
                  {(out.totals !== 0) ? out.totals : 0}
                </Typography>
                <Typography>
                  {`${(out.avg !== '-') ? out.avg : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>IN</Typography>
                <Typography fontWeight={'bold'}>
                  {(out.totalsIN !== 0) ? out.totalsIN : 0}
                </Typography>
                <Typography>
                  {`${(out.avgIN !== '-') ? out.avgIN : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack sx={{ textAlign: 'center' }}>
                <Typography>OUT</Typography>
                <Typography fontWeight={'bold'}>
                  {(out.totalsOUT !== 0) ? out.totalsOUT : 0}
                </Typography>
                <Typography>
                  {`${(out.avgOUT !== '-') ? out.avgOUT : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </AccordionDetails>
      </Accordion>

    </Box >
  )
}

export default TableMobile
