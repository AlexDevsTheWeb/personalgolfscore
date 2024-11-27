import { ShotPosition } from "@/components/common/shotPositions/ShotPosition.component";
import NewGridCellStats from "@/styles/grid/NewGridCellStats.style";
import { TableCell, TableRow } from "@/styles/index";
import { IShotsTableProps } from "@/types/props.types";
import { formatPerc } from "@/utils/number/number.utils";
import { correctVsParString } from "@/utils/shots/shots.utils";
import { Divider, Grid, Stack, TableBody, Typography } from "@mui/material";

const ShotsTableTotalsBody = ({ firstColumn, roundTotals }: IShotsTableProps) => {

  const { mainData: { coursePar }, score, points, putts, sand, gir, girBogey, fairway, upDown, scramble, water, out } = roundTotals;
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    <TableBody>
      <TableRow key={'last'}>
        {firstColumn && <TableCell align='center'>{''}</TableCell>}
        <TableCell align='center'>{coursePar}</TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.totals} (${correctScore})`}</Typography>
                <Typography>{score.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.scoreIN} (${correctScoreIN})`}</Typography>
                <Typography>{score.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.scoreOUT} (${correctScoreOUT})`}</Typography>
                <Typography>{score.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center' variant={Number(points.avg) >= 2 ? 'green' : Number(points.avg) === 1 ? 'yellow' : 'red'}>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.totals}</Typography>
                <Typography>{points.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsIN}</Typography>
                <Typography>{points.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsOUT}</Typography>
                <Typography>{points.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.total}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography>{`${fairway.fairwayLeft} (${formatPerc(fairway.fairwayLeft / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography>{`${fairway.fairwayCenter} (${formatPerc(fairway.fairwayCenter / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography>{`${fairway.fairwayRight} (${formatPerc(fairway.fairwayRight / fairway.total)})`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={4} /></Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={5} /></Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={6} /></Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totals}</Typography>
                <Typography>{gir.avg}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsIN}</Typography>
                <Typography>{gir.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsOUT}</Typography>
                <Typography>{gir.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGir}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGirIn}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGirOut}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totals}</Typography>
                <Typography>{girBogey.avg}</Typography>
              </Stack>

            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsIN}</Typography>
                <Typography>{girBogey.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsOUT}</Typography>
                <Typography>{girBogey.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center' sx={{ borderLeft: '1px solid #ccc' }}>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.saved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.totals}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={12}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {scramble.perc !== 0 && `${scramble.perc.toFixed(2)}%`}
                </Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.saved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.totals}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.perc !== 0 && `${upDown.perc.toFixed(2)}%`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>

        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totals}</Typography>
                <Typography>{putts.avg}</Typography>
              </Stack>

            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsIN}</Typography>
                <Typography>{putts.avgIN}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsOUT}</Typography>
                <Typography>{putts.avgOUT}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>

        <TableCell align='center' sx={{ borderRight: '1px solid #ccc' }}>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                <Typography>{sand.avgSaved}</Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                <Typography>{sand.avg}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={12}>
              <Stack>
                <Typography>{sand.savedPerc !== 0 && `${sand.savedPerc}%`}</Typography>
              </Stack>
            </NewGridCellStats>
          </Grid>
        </TableCell>



        <TableCell align='center'>
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(water.totals !== 0) ? water.totals : 0}
                </Typography>
                <Typography>
                  {`${(water.avg !== '-') ? water.avg : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(water.totalsIN !== 0) ? water.totalsIN : 0}
                </Typography>
                <Typography>
                  {`${(water.avgIN !== '-') ? water.avgIN : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
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
          <Grid container spacing={1}>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(out.totals !== 0) ? out.totals : 0}
                </Typography>
                <Typography>
                  {`${(out.avg !== '-') ? out.avg : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(out.totalsIN !== 0) ? out.totalsIN : 0}
                </Typography>
                <Typography>
                  {`${(out.avgIN !== '-') ? out.avgIN : '-'}`}
                </Typography>
              </Stack>
            </NewGridCellStats>
            <NewGridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(out.totalsOUT !== 0) ? out.totalsOUT : 0}
                </Typography>
                <Typography>
                  {`${(out.avgOUT !== '-') ? out.avgOUT : '-'}`}
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
