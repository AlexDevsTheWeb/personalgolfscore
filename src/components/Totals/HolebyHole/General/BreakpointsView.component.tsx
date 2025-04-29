import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import ShotsTableHeader from "@/components/RoundsData/components/shotsTable/ShotsTableHeader.component";
import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import ShotsTableTotalsBody from "@/components/RoundsData/components/shotsTable/ShotsTableTotalsBody.component";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import NewGridCellStats from "@/styles/grid/NewGridCellStats.style";
import { IGeneralDesktopViewProps, IGeneralMobileViewProps, IPercentageStatDisplayProps, ISimpleStatDisplayProps, IStatAccordionProps } from "@/types/props.types";
import { formatPerc } from "@/utils/number/number.utils";
import { correctVsParString } from "@/utils/shots/shots.utils";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Paper, Stack, Table, TableContainer, Typography } from "@mui/material";
import React from "react";


const SimpleStatDisplay: React.FC<ISimpleStatDisplayProps> = React.memo(({
  title, total, avg, inTotal, inAvg, outTotal, outAvg, totalSuffix = '', inSuffix = '', outSuffix = ''
}) => (
  <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <NewGridCellStats size={{ xs: 4 }}>
      <Stack sx={{ textAlign: 'center', border: title === 'Score' ? '2px solid #ff9900' : 'none' }}>
        <Typography>TOT</Typography>
        <Typography fontWeight={'bold'}>{`${total}${totalSuffix}`}</Typography>
        {avg !== undefined && <Typography>{avg}</Typography>}
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 4 }}>
      <Stack sx={{ textAlign: 'center' }}>
        <Typography>IN</Typography>
        <Typography fontWeight={'bold'}>{`${inTotal}${inSuffix}`}</Typography>
        {inAvg !== undefined && <Typography>{inAvg}</Typography>}
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 4 }}>
      <Stack sx={{ textAlign: 'center' }}>
        <Typography>OUT</Typography>
        <Typography fontWeight={'bold'}>{`${outTotal}${outSuffix}`}</Typography>
        {outAvg !== undefined && <Typography>{outAvg}</Typography>}
      </Stack>
    </NewGridCellStats>
  </GridAccordion>
));

const PercentageStatDisplay: React.FC<IPercentageStatDisplayProps> = React.memo(({ saved, total, percentage }) => (
  <>
    <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NewGridCellStats size={{ xs: 6 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography>Saved</Typography>
          <Typography fontWeight={'bold'}>{saved}</Typography>
        </Stack>
      </NewGridCellStats>
      <NewGridCellStats size={{ xs: 6 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography>Totals</Typography>
          <Typography fontWeight={'bold'}>{total}</Typography>
        </Stack>
      </NewGridCellStats>
    </GridAccordion>
    <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NewGridCellStats size={{ xs: 12 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography fontWeight={'bold'}>
            {percentage !== 0 ? `${percentage.toFixed(2)}%` : '-'}
          </Typography>
        </Stack>
      </NewGridCellStats>
    </GridAccordion>
  </>
));

const StatAccordion: React.FC<IStatAccordionProps> = React.memo(({ title, subtitle, children }) => (
  <Accordion key={`accordion-${title.replace(/\s+/g, '-')}`}> {/* Use title for key */}
    <AccordionSummary>
      <ShotsTableHeaderStack firstRow={title} secondRow={subtitle || ''} />
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
));

export const DesktopView: React.FC<IGeneralDesktopViewProps> = ({ roundTotals, dashboard }) => (
  <TableContainer component={Paper}>
    <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="general statistics table">
      <ShotsTableHeader firstLabel='Tot.' singleHole={false} firstColumn={false} dashboard={dashboard} viewPar={false} />
      <ShotsTableTotalsBody firstColumn={false} roundTotals={roundTotals} dashboard={dashboard} />
    </Table>
  </TableContainer>
);

export const MobileView: React.FC<IGeneralMobileViewProps> = ({
  score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out
}) => {
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'column' }}>
      <StatAccordion title="Score">
        <SimpleStatDisplay
          title="Score"
          total={`${score.totals} (${correctScore})`}
          avg={score.avg}
          inTotal={`${score.scoreIN} (${correctScoreIN})`}
          inAvg={score.avgIN}
          outTotal={`${score.scoreOUT} (${correctScoreOUT})`}
          outAvg={score.avgOUT}
        />
      </StatAccordion>

      <StatAccordion title="Points">
        <SimpleStatDisplay
          title="Points"
          total={points.totals}
          avg={points.avg}
          inTotal={points.pointsIN}
          inAvg={points.avgIN}
          outTotal={points.pointsOUT}
          outAvg={points.avgOUT}
        />
      </StatAccordion>

      <StatAccordion title="Fairways">
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
        <Divider sx={{ my: 1 }} />
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
        <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around', mt: 0.5 }}>
          <NewGridCellStats size={{ xs: 4 }}><Stack sx={{ textAlign: 'center' }}><ShotPosition position={4} /></Stack></NewGridCellStats>
          <NewGridCellStats size={{ xs: 4 }}><Stack sx={{ textAlign: 'center' }}><ShotPosition position={5} /></Stack></NewGridCellStats>
          <NewGridCellStats size={{ xs: 4 }}><Stack sx={{ textAlign: 'center' }}><ShotPosition position={6} /></Stack></NewGridCellStats>
        </GridAccordion>
      </StatAccordion>

      <StatAccordion title="GIR">
        <SimpleStatDisplay
          title="GIR"
          total={gir.totals}
          avg={gir.avg}
          inTotal={gir.totalsIN}
          inAvg={gir.avgIN}
          outTotal={gir.totalsOUT}
          outAvg={gir.avgOUT}
        />
      </StatAccordion>

      <StatAccordion title="Putts/GIR">
        <SimpleStatDisplay
          title="Putts/GIR"
          total={putts.puttsGir.toFixed(2)}
          inTotal={putts.puttsGirIn.toFixed(2)}
          outTotal={putts.puttsGirOut.toFixed(2)}
        />
      </StatAccordion>

      <StatAccordion title="GIR Bogey">
        <SimpleStatDisplay
          title="GIR Bogey"
          total={girBogey.totals}
          avg={girBogey.avg}
          inTotal={girBogey.totalsIN}
          inAvg={girBogey.avgIN}
          outTotal={girBogey.totalsOUT}
          outAvg={girBogey.avgOUT}
        />
      </StatAccordion>

      <StatAccordion title="Scramble" subtitle="Par saved outside green">
        <PercentageStatDisplay saved={scramble.saved} total={scramble.totals} percentage={scramble.perc} />
      </StatAccordion>

      <StatAccordion title="Up & Down" subtitle="Par saved without GIR">
        <PercentageStatDisplay saved={upDown.saved} total={upDown.totals} percentage={upDown.perc} />
      </StatAccordion>

      <StatAccordion title="Putts" subtitle="TOT IN OUT">
        <SimpleStatDisplay
          title="Putts"
          total={putts.totals}
          avg={putts.avg.toFixed(2)}
          inTotal={putts.totalsIN}
          inAvg={putts.avgIN.toFixed(2)}
          outTotal={putts.totalsOUT}
          outAvg={putts.avgOUT.toFixed(2)}
        />
      </StatAccordion>

      <StatAccordion title="Sand" subtitle="saved made">
        <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <NewGridCellStats size={{ xs: 6 }}>
            <Stack sx={{ textAlign: 'center' }}>
              <Typography>Saved</Typography>
              <Typography fontWeight={'bold'}>{sand.saved}</Typography>
              <Typography>{sand.avgSaved.toFixed(2)}</Typography>
            </Stack>
          </NewGridCellStats>
          <NewGridCellStats size={{ xs: 6 }}>
            <Stack sx={{ textAlign: 'center' }}>
              <Typography>Totals</Typography>
              <Typography fontWeight={'bold'}>{sand.totals}</Typography>
              <Typography>{sand.avg.toFixed(2)}</Typography>
            </Stack>
          </NewGridCellStats>
        </GridAccordion>
        <GridAccordion container spacing={1}>
          <NewGridCellStats size={{ xs: 12 }}>
            <Stack sx={{ textAlign: 'center' }}>
              <Typography fontWeight={'bold'}>{sand.savedPerc !== 0 ? `${sand.savedPerc.toFixed(2)}%` : '-'}</Typography>
            </Stack>
          </NewGridCellStats>
        </GridAccordion>
      </StatAccordion>

      <StatAccordion title="Penalties">
        <SimpleStatDisplay
          title="Water"
          total={water.totals || 0}
          avg={water.avg || '-'}
          inTotal={water.totalsIN || 0}
          inAvg={water.avgIN || '-'}
          outTotal={water.totalsOUT || 0}
          outAvg={water.avgOUT || '-'}
        />
        <Divider sx={{ my: 1 }} />
        <SimpleStatDisplay
          title="Out"
          total={out.totals || 0}
          avg={out.avg || '-'}
          inTotal={out.totalsIN || 0}
          inAvg={out.avgIN || '-'}
          outTotal={out.totalsOUT || 0}
          outAvg={out.avgOUT || '-'}
        />
      </StatAccordion>
    </Box>
  );
};