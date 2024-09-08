import { Divider, Grid, Stack, TableBody, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { TableCell, TableRow } from "../../../../styles";
import GridCellStats from "../../../../styles/grid/GridCellStats.styles";
import { formatPerc } from "../../../../utils/number/number.utils";
import { correctVsParString } from "../../../../utils/shots/shots.utils";
import { ShotPosition } from "../../../common/shotPositions/ShotPosition.component";

interface IShotsTableProps {
  firstColumn: boolean;
}


const ShotsTableTotalsBody = ({ firstColumn }: IShotsTableProps) => {

  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { mainData: { coursePar }, score, points, putts, sand, gir, girBogey, fairway, upDown, scramble } = roundTotals;
  const { correctScore, correctScoreIN, correctScoreOUT } = correctVsParString(score);

  return (
    <TableBody>
      <TableRow key={'last'}>
        {firstColumn && <TableCell align='center'>{''}</TableCell>}
        <TableCell align='center'>{coursePar}</TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.totals} (${correctScore})`}</Typography>
                <Typography>{score.avg}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.scoreIN} (${correctScoreIN})`}</Typography>
                <Typography>{score.avgIN}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.scoreOUT} (${correctScoreOUT})`}</Typography>
                <Typography>{score.avgOUT}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center' variant={Number(points.avg) >= 2 ? 'green' : Number(points.avg) === 1 ? 'yellow' : 'red'}>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.totals}</Typography>
                <Typography>{points.avg}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsIN}</Typography>
                <Typography>{points.avgIN}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsOUT}</Typography>
                <Typography>{points.avgOUT}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.total}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
          <Divider />
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography>{`${fairway.fairwayLeft} (${formatPerc(fairway.fairwayLeft / fairway.total)})`}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography>{`${fairway.fairwayCenter} (${formatPerc(fairway.fairwayCenter / fairway.total)})`}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography>{`${fairway.fairwayRight} (${formatPerc(fairway.fairwayRight / fairway.total)})`}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={4} /></Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={5} /></Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}><ShotPosition position={6} /></Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totals}</Typography>
                <Typography>{gir.avg}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsIN}</Typography>
                <Typography>{gir.avgIN}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsOUT}</Typography>
                <Typography>{gir.avgOUT}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGir}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGirIn}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.puttsGirOut}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totals}</Typography>
                <Typography>{girBogey.avg}</Typography>
              </Stack>

            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsIN}</Typography>
                <Typography>{girBogey.avgIN}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsOUT}</Typography>
                <Typography>{girBogey.avgOUT}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center' sx={{ borderLeft: '1px solid #ccc' }}>
          <Grid container spacing={1}>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.saved}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.totals}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <GridCellStats item xs={12}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {scramble.perc !== 0 && `${scramble.perc.toFixed(2)}%`}
                </Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.saved}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.totals}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <GridCellStats item xs={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.perc !== 0 && `${upDown.perc.toFixed(2)}%`}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>

        <TableCell align='center' sx={{ borderRight: '1px solid #ccc' }}>
          <Grid container spacing={1}>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                <Typography>{sand.avgSaved}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                <Typography>{sand.avg}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
          <Grid container spacing={1}>
            <GridCellStats item xs={12}>
              <Stack>
                <Typography>{sand.savedPerc !== 0 && `${sand.savedPerc}%`}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>

        <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totals}</Typography>
                <Typography>{putts.avg}</Typography>
              </Stack>

            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsIN}</Typography>
                <Typography>{putts.avgIN}</Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsOUT}</Typography>
                <Typography>{putts.avgOUT}</Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell>

        {/* <TableCell align='center'>
          <Grid container spacing={1}>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(putts.puttsGir !== 0 && gir.totals !== 0) ? putts.puttsGir / gir.totals : 0}
                </Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(putts.puttsGirIn !== 0 && gir.totalsIN !== 0) ? putts.puttsGirIn / gir.totalsIN : 0}
                </Typography>
              </Stack>
            </GridCellStats>
            <GridCellStats item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>
                  {(putts.puttsGirOut !== 0 && gir.totalsOUT !== 0) ? putts.puttsGirOut / gir.totalsOUT : 0}
                </Typography>
              </Stack>
            </GridCellStats>
          </Grid>
        </TableCell> */}

      </TableRow>
    </TableBody>
  )
}

export default ShotsTableTotalsBody
