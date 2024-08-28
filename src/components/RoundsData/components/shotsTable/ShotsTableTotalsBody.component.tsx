import { Grid, Stack, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoundTotals } from "../../../../hooks/roundTotalsCalculator.hook";
import { IShots } from "../../../../types/roundData.types";

interface IShotsTableTotalsProps {
  holes: IShots[]
}

const ShotsTableTotalsBody = ({ holes }: IShotsTableTotalsProps) => {

  const dispatch = useDispatch<any>();
  const roundTotals = useRoundTotals(holes);
  const { mainData: { coursePar, playerHCP }, score, points, putts, sand, gir, girBogey, fairway, upDown, scramble } = roundTotals;

  const [correctScore, setCorrectScore] = useState<string>('');
  const [correctScoreIN, setCorrectScoreIN] = useState<string>('');
  const [correctScoreOUT, setCorrectScoreOUT] = useState<string>('');

  console.log("round Totals: ", roundTotals)
  // FIXME: just for debug purpose, REMOVE IT!!
  useEffect(() => {
    if (holes && roundTotals) {

      // dispatch(setNewTotal({ roundTotals }));
    }
    // eslint-disable-next-line
  }, [holes, dispatch]);
  // FIXME: just for debug purpose, REMOVE IT!!

  useEffect(() => {
    if (score.vsPar === 0) {
      setCorrectScore(score.vsPar.toString());
    }
    else {
      if (score.vsPar < 0) {
        setCorrectScore(`${score.vsPar}`);
      }
      else { setCorrectScore(`+${score.vsPar}`); }
    }
    if (score.vsParIN === 0) {
      setCorrectScoreIN(score.vsParIN.toString());
    }
    else {
      if (score.vsParIN < 0) {
        setCorrectScoreIN(`${score.vsParIN}`);
      }
      else { setCorrectScoreIN(`+${score.vsParIN}`); }
    }

    if (score.vsParOUT === 0) {
      setCorrectScoreOUT(score.vsParOUT.toString());
    }
    else {
      if (score.vsParOUT < 0) {
        setCorrectScoreOUT(`${score.vsParOUT}`);
      }
      else { setCorrectScoreOUT(`+${score.vsParOUT}`); }
    }


  }, [score]);


  return (
    <TableBody>
      <TableRow key={'last'}>
        <TableCell align='center'></TableCell>
        <TableCell align='center'>{coursePar}</TableCell>
        <TableCell align='center'>{playerHCP}</TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.totals} (${correctScore})`}</Typography>
                <Typography>{score.avg}</Typography>
              </Stack>

            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.scoreIN} (${correctScoreIN})`}</Typography>
                <Typography>{score.avgIN}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{`${score.scoreOUT} (${correctScoreOUT})`}</Typography>
                <Typography>{score.avgOUT}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center' variant={Number(points.avg) >= 2 ? 'green' : Number(points.avg) === 1 ? 'yellow' : 'red'}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.totals}</Typography>
                <Typography>{points.avg}</Typography>
              </Stack>

            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsIN}</Typography>
                <Typography>{points.avgIN}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{points.pointsOUT}</Typography>
                <Typography>{points.avgOUT}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.fairwayCenter}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{fairway.total}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack>
                <Typography>{fairway.fairwayLeft}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography>{fairway.fairwayCenter}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography>{fairway.fairwayRight}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totals}</Typography>
                <Typography>{gir.avg}</Typography>
              </Stack>

            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsIN}</Typography>
                <Typography>{gir.avgIN}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{gir.totalsOUT}</Typography>
                <Typography>{gir.avgOUT}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totals}</Typography>
                <Typography>{girBogey.avg}</Typography>
              </Stack>

            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsIN}</Typography>
                <Typography>{girBogey.avgIN}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{girBogey.totalsOUT}</Typography>
                <Typography>{girBogey.avgOUT}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.saved}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.totals}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{scramble.perc !== 0 && `${scramble.perc.toFixed(2)}%`}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.saved}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.totals}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack>
                <Typography fontWeight={'bold'}>{upDown.perc !== 0 && `${upDown.perc.toFixed(2)}%`}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totals}</Typography>
                <Typography>{putts.avg}</Typography>
              </Stack>

            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsIN}</Typography>
                <Typography>{putts.avgIN}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Typography fontWeight={'bold'}>{putts.totalsOUT}</Typography>
                <Typography>{putts.avgOUT}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell align='center'>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.saved}</Typography>
                <Typography>{sand.avgSaved}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <Typography fontWeight={'bold'}>{sand.totals}</Typography>
                <Typography>{sand.avg}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack>
                <Typography>{sand.savedPerc !== 0 && `${sand.savedPerc}%`}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default ShotsTableTotalsBody
