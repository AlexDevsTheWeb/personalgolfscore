import { Grid, Paper, Table, TableBody, TableContainer, TableHead, Typography } from "@mui/material"
import _ from "lodash"
import { TableCell, TableRow } from "../../../../styles"
import { IRoundTotalsPutts } from "../../../../types/roundTotals.types"
import { puttsDistanceConversion } from "../../../../utils/constant.utils"
import ShotsTableHeaderStack from "../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component"

interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

const HolebyHolePutts = ({ totalsPutts }: IHolebyHolePutts) => {

  const { puttsStatistics } = totalsPutts;

  const puttsCat = Object.keys(puttsStatistics);

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              puttsCat.map((distance: any, index: any) => {
                return (
                  <TableCell align='center' key={index}>
                    <ShotsTableHeaderStack firstRow={puttsDistanceConversion(distance)} secondRow={'holed | attemted'} /></TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>

        <TableBody key={_.uniqueId("putts_")}>
          <TableRow>
            {
              Object.entries(puttsStatistics).map(([key, value], index: number) => {
                return (
                  <TableCell align='center' key={index}>
                    <Grid container spacing={1}>
                      <Grid item xs={2}>
                        <Typography fontWeight={'bold'}>{!_.isNaN(value.puttsHoled) || _.isFinite(value.puttsHoled) ? value.puttsHoled : '-'}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography fontWeight={'bold'}>{!_.isNaN(value.puttsAttempts) || _.isFinite(value.puttsAttempts) ? value.puttsAttempts : '-'}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography fontWeight={'bold'}>{!_.isNaN(value.puttsAverage) || _.isFinite(value.puttsAverage) ? value.puttsAverage : '-'}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography fontWeight={'bold'}>{!_.isNaN(value.puttsSecondoAverageLength) || _.isFinite(value.puttsSecondoAverageLength) ? value.puttsSecondoAverageLength : '-'}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography fontWeight={'bold'}>{!_.isNaN(value.puttsAverageDistance) || _.isFinite(value.puttsAverageDistance) ? value.puttsAverageDistance : '-'}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography fontWeight={'bold'}>{!_.isNaN(value.putts3) || _.isFinite(value.putts3) ? value.putts3 : '-'}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                )
              })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HolebyHolePutts
