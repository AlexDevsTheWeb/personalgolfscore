import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Typography } from "../../styles";
import BoxGeneralShadow from "../../styles/box/BoxGeneralShadow.styles";
import { IRoundScoreTotalsAvg, IRoundTotalsAvgINOUT, IRoundTotalsPutts } from "../../types/roundTotals.types";
import ShotsTableHeaderStack from "../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IStatisticsPuttsProps {
  putts: IRoundTotalsPutts,
  gir: IRoundTotalsAvgINOUT,
  score: IRoundScoreTotalsAvg,
}

export const StatisticsPutts = ({ putts, gir, score }: IStatisticsPuttsProps) => {

  return (
    <BoxGeneralShadow sx={{ width: '100%' }}>
      <Typography variant='headline2'>Putts statistics</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow={'putts'} secondRow={''} />
              </TableCell>
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow={'putts/gir'} secondRow={''} />
              </TableCell>
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow={'birdie conversion'} secondRow={''} />
              </TableCell>
              <TableCell align='center'>
                <ShotsTableHeaderStack firstRow={'three putts per round'} secondRow={''} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>{putts.totals}</TableCell>
              <TableCell align='center'>
                {(putts.puttsGir !== 0 && gir.totals !== 0) ? putts.puttsGir / gir.totals : 0}
              </TableCell>
              <TableCell align='center'>
                {
                  (gir.totals !== 0 &&
                    score.scoreEagleBetter !== 0 &&
                    score.scoreBirdie !== 0)
                    ? (score.scoreEagleBetter + score.scoreBirdie) / gir.totals
                    : 0
                }
              </TableCell>
              <TableCell align='center'>{putts.puttsThree}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </BoxGeneralShadow>
  )
};
