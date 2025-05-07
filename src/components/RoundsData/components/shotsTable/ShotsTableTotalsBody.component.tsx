import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import NewGridCellStats from "@/styles/grid/NewGridCellStats.style";
import { TableCell, TableRow } from "@/styles/index";
import { IShotsTableProps } from "@/types/props.types";
import { formatPerc } from "@/utils/number/number.utils";
import { correctVsParString } from "@/utils/shots/shots.utils";
import { Divider, Grid, Stack, TableBody, Typography } from "@mui/material";

const ShotsTableTotalsBody = ({ firstColumn, roundTotals }: IShotsTableProps) => {
  const { score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out } = roundTotals;
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    <TableBody>
      <TableRow key={'last'}>
        {firstColumn && <TableCell align='center'>{''}</TableCell>}
        {/* SCORE */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{score.totals}</Typography>
                <Divider />
                <Typography>{`(${correctScore})`}</Typography>
                <Typography>{score.avg}</Typography>
              </Stack>

            </NewGridCellStats>
            <NewGridCellStats size={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{score.scoreIN}</Typography>
                <Divider />
                <Typography>{`(${correctScoreIN})`}</Typography>
                <Typography>{score.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{score.scoreOUT}</Typography>
                <Divider />
                <Typography>{`(${correctScoreOUT})`}</Typography>
                <Typography>{score.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* POINTS */}
        <TableCell align='center' variant={Number(points.avg) >= 2 ? 'green' : Number(points.avg) === 1 ? 'yellow' : 'red'}>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.totals}</Typography>
                <Divider sx={{ backgroundColor: '#000' }} />
                <Typography>{points.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsIN}</Typography>
                <Divider sx={{ backgroundColor: '#000' }} />
                <Typography>{points.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsOUT}</Typography>
                <Divider sx={{ backgroundColor: '#000' }} />
                <Typography>{points.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* FAIRWAYS */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.total}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography>{fairway.fairwayLeft}</Typography>
                <Typography>{`(${formatPerc(fairway.fairwayLeft / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography>{fairway.fairwayCenter}</Typography>
                <Typography>{`(${formatPerc(fairway.fairwayCenter / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography>{fairway.fairwayRight}</Typography>
                <Typography>{`(${formatPerc(fairway.fairwayRight / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={4} /></Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={5} /></Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={6} /></Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* GIR */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totals}</Typography>
                <Divider />
                <Typography>{gir.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsIN}</Typography>
                <Divider />
                <Typography>{gir.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsOUT}</Typography>
                <Divider />
                <Typography>{gir.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* PUTTS/GIR */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGir}</Typography>
                <Divider />
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography>{putts.puttsGirIn}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography>{putts.puttsGirOut}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* GIR BOGEY */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totals}</Typography>
                <Divider />
                <Typography>{girBogey.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsIN}</Typography>
                <Divider />
                <Typography>{girBogey.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsOUT}</Typography>
                <Divider />
                <Typography>{girBogey.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* SCRAMBLE */}
        <TableCell align='center' sx={{ borderLeft: '1px solid #ccc' }}>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.saved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.totals}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography>
                  {scramble.perc !== 0 && `${scramble.perc.toFixed(2)}%`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* UP&DOWN */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.saved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.totals}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography>{upDown.perc !== 0 && `${upDown.perc.toFixed(2)}%`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* PUTTS */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totals}</Typography>
                <Divider />
                <Typography>{putts.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsIN}</Typography>
                <Divider />
                <Typography>{putts.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsOUT}</Typography>
                <Divider />
                <Typography>{putts.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* SAND */}
        <TableCell align='center' sx={{ borderRight: '1px solid #ccc' }}>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                <Typography>{sand.avgSaved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                <Typography>{sand.avg}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 12 }}>
              <Stack>
                <Typography>{sand.savedPerc !== 0 ? `${sand.savedPerc}%` : `-`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        {/* PENALTIES */}
        <TableCell align='center'>
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(water.totals !== 0) ? water.totals : 0}
                </Typography>
                <Typography>
                  {`${(water.avg !== 0) ? water.avg : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(water.totalsIN !== 0) ? water.totalsIN : 0}
                </Typography>
                <Typography>
                  {`${(water.avgIN !== 0) ? water.avgIN : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(water.totalsOUT !== 0) ? water.totalsOUT : 0}
                </Typography>
                <Typography>
                  {`${(water.avgOUT !== 0) ? water.avgOUT : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(out.totals !== 0) ? out.totals : 0}
                </Typography>
                <Typography>
                  {`${(out.avg !== 0) ? out.avg : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(out.totalsIN !== 0) ? out.totalsIN : 0}
                </Typography>
                <Typography>
                  {`${(out.avgIN !== 0) ? out.avgIN : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats size={{ xs: 6 }}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(out.totalsOUT !== 0) ? out.totalsOUT : 0}
                </Typography>
                <Typography>
                  {`${(out.avgOUT !== 0) ? out.avgOUT : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default ShotsTableTotalsBody
