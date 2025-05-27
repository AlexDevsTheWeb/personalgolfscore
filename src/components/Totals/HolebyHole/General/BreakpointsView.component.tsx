import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import NewGridCellStats from "@/styles/grid/NewGridCellStats.style";
import { IGeneralMobileViewProps, IPercentageStatDisplayProps, ISimpleStatDisplayProps } from "@/types/props.types";
import { formatPerc } from "@/utils/number/number.utils";
import { correctVsParString } from "@/utils/shots/shots.utils";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import StatBlock from "../components/StackBlock.component";


const SimpleStatDisplay: React.FC<ISimpleStatDisplayProps> = React.memo(({
  title, total, avg, inTotal, inAvg, outTotal, outAvg, totalSuffix = '', inSuffix = '', outSuffix = ''
}) => (
  <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        {title && <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{title}</Typography>}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>TOTAL</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{`${total}${totalSuffix}`}</Typography>
        {avg !== undefined && <Typography variant="caption" color="text.secondary">{avg}</Typography>}
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>IN</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{`${inTotal}${inSuffix}`}</Typography>
        {inAvg !== undefined && <Typography variant="caption" color="text.secondary">{inAvg}</Typography>}
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>OUT</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{`${outTotal}${outSuffix}`}</Typography>
        {outAvg !== undefined && <Typography variant="caption" color="text.secondary">{outAvg}</Typography>}
      </Stack>
    </NewGridCellStats>
  </GridAccordion>
));

const PercentageStatDisplay: React.FC<IPercentageStatDisplayProps> = React.memo(({ saved, total, percentage }) => (
  <>
    <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NewGridCellStats size={{ xs: 6, sm: 6 }}>
        <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
          <Typography color="text.secondary">Saved</Typography> {/* Use secondary for label */}
          <Typography fontWeight={'bold'} color="text.primary">{saved}</Typography>
        </Stack>
      </NewGridCellStats>
      <NewGridCellStats size={{ xs: 6, sm: 6 }}>
        <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
          <Typography color="text.secondary">Totals</Typography> {/* Use secondary for label */}
          <Typography fontWeight={'bold'} color="text.primary">{total}</Typography>
        </Stack>
      </NewGridCellStats>
    </GridAccordion>
    <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NewGridCellStats size={{ xs: 12 }}>
        <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
          <Typography fontWeight={'bold'}>
            {percentage !== 0 ? `${percentage.toFixed(2)}%` : '-'}
          </Typography>
        </Stack>
      </NewGridCellStats>
    </GridAccordion>
  </>
));




export const UnifiedGeneralStatsView: React.FC<IGeneralMobileViewProps> = ({
  score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out
}) => {
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    <Box sx={{ width: '100%', justifyContent: 'center' }}>
      <Grid container spacing={1} sx={{ py: 1 }}>
        <StatBlock title="Score" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <SimpleStatDisplay
            total={`${score.totals} (${correctScore})`}
            avg={score.avg}
            inTotal={`${score.scoreIN} (${correctScoreIN})`}
            inAvg={score.avgIN}
            outTotal={`${score.scoreOUT} (${correctScoreOUT})`}
            outAvg={score.avgOUT}
          />
        </StatBlock>

        <StatBlock title="Points" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <SimpleStatDisplay
            total={points.totals}
            avg={points.avg}
            inTotal={points.pointsIN}
            inAvg={points.avgIN}
            outTotal={points.pointsOUT}
            outAvg={points.avgOUT}
          />
        </StatBlock>

        <StatBlock title="Fairways" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <Stack spacing={1}>
            <Grid container spacing={1} sx={{ justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Center</Typography>
                  <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Total</Typography>
                  <Typography fontWeight={'bold'}>{fairway.total}</Typography>
                </Stack>
              </NewGridCellStats>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={1} sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <NewGridCellStats size={{ xs: 4 }} sx={{ gap: 1 }}>
                <Stack sx={{ gap: 1, alignItems: 'center' }}>
                  <ShotPosition position={4} />
                  <Typography>{`${fairway.fairwayLeft}`}</Typography>
                  <Typography variant="caption" color="text.secondary">{`(${formatPerc(fairway.fairwayLeft / fairway.total)})`}</Typography>

                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }} sx={{ gap: 1 }}>
                <Stack sx={{ gap: 1, alignItems: 'center' }}>
                  <ShotPosition position={5} />
                  <Typography>{`${fairway.fairwayCenter}`}</Typography>
                  <Typography variant="caption" color="text.secondary">{`(${formatPerc(fairway.fairwayCenter / fairway.total)})`}</Typography>

                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 4 }} sx={{ gap: 1 }}>
                <Stack sx={{ gap: 1, alignItems: 'center' }}>
                  <ShotPosition position={6} />
                  <Typography>{`${fairway.fairwayRight}`}</Typography>
                  <Typography variant="caption" color="text.secondary">{`(${formatPerc(fairway.fairwayRight / fairway.total)})`}</Typography>

                </Stack>
              </NewGridCellStats>
            </Grid>
          </Stack>
        </StatBlock>

        <StatBlock title="GIR" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <SimpleStatDisplay
            total={gir.totals}
            avg={gir.avg}
            inTotal={gir.totalsIN}
            inAvg={gir.avgIN}
            outTotal={gir.totalsOUT}
            outAvg={gir.avgOUT}
          />
        </StatBlock>

        <StatBlock title="Putts/GIR" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <SimpleStatDisplay
            total={putts.puttsGir.toFixed(2)}
            inTotal={putts.puttsGirIn.toFixed(2)}
            outTotal={putts.puttsGirOut.toFixed(2)}
          />
        </StatBlock>

        <StatBlock title="GIR Bogey" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <SimpleStatDisplay
            total={girBogey.totals}
            avg={girBogey.avg}
            inTotal={girBogey.totalsIN}
            inAvg={girBogey.avgIN}
            outTotal={girBogey.totalsOUT}
            outAvg={girBogey.avgOUT}
          />
        </StatBlock>

        <StatBlock title="Scramble" subtitle="Par saved outside green" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <PercentageStatDisplay saved={scramble.saved} total={scramble.totals} percentage={scramble.perc} />
        </StatBlock>

        <StatBlock title="Up & Down" subtitle="Par saved without GIR" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <PercentageStatDisplay saved={upDown.saved} total={upDown.totals} percentage={upDown.perc} />
        </StatBlock>

        <StatBlock title="Putts" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <SimpleStatDisplay
            total={putts.totals}
            avg={putts.avg.toFixed(2)}
            inTotal={putts.totalsIN}
            inAvg={putts.avgIN.toFixed(2)}
            outTotal={putts.totalsOUT}
            outAvg={putts.avgOUT.toFixed(2)}
          />
        </StatBlock>

        <StatBlock title="Sand Saves" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <Stack spacing={1}>
            <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <NewGridCellStats size={{ xs: 6, sm: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Saved</Typography>
                  <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                  <Typography variant="caption" color="text.secondary">{sand.avgSaved.toFixed(2)}</Typography>
                </Stack>
              </NewGridCellStats>
              <NewGridCellStats size={{ xs: 6, sm: 6 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Attempts</Typography>
                  <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                  <Typography variant="caption" color="text.secondary">{sand.avg.toFixed(2)}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
            <GridAccordion container spacing={1} sx={{ justifyContent: 'center' }}>
              <NewGridCellStats size={{ xs: 12 }}>
                <Stack sx={{ textAlign: 'center' }}>
                  <Typography fontWeight={'bold'} >{sand.savedPerc !== 0 ? `${sand.savedPerc.toFixed(1)}%` : '-'}</Typography>
                </Stack>
              </NewGridCellStats>
            </GridAccordion>
          </Stack>
        </StatBlock>

        <StatBlock title="Penalties" gridProps={{ size: { xs: 12, sm: 6, md: 4, lg: 2 } }}>
          <Stack spacing={2}>
            <Box>
              <Typography sx={{ textAlign: 'center', mb: 0.5, fontWeight: 'bold' }}>Water</Typography>
              <SimpleStatDisplay
                total={water.totals || 0}
                avg={water.avg || '-'}
                inTotal={water.totalsIN || 0}
                inAvg={water.avgIN || '-'}
                outTotal={water.totalsOUT || 0}
                outAvg={water.avgOUT || '-'}
              />
            </Box>
            <Divider />
            <Box>
              <Typography sx={{ textAlign: 'center', mb: 0.5, fontWeight: 'bold' }}>Out of Bounds</Typography>
              <SimpleStatDisplay
                total={out.totals || 0}
                avg={out.avg || '-'}
                inTotal={out.totalsIN || 0}
                inAvg={out.avgIN || '-'}
                outTotal={out.totalsOUT || 0}
                outAvg={out.avgOUT || '-'}
              />
            </Box>
          </Stack>
        </StatBlock>
      </Grid>
    </Box>
  );
};