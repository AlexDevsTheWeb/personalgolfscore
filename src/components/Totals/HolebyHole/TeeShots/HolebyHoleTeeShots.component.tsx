import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import { IRoundTotals } from "../../../../types/roundTotals.types";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}

const HolebyHoleTeeShots = ({ totals }: IHolebyHoleTeeShots) => {

  console.log("TOTALS: ", totals);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Typography variant='headline2'>TEE SHOTS STATISTICS</Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* {
              puttsCat.map((distance: string, index: number) => {
                return (
                  <TableCell align='center' key={index} variant='putt'>
                    <ShotsTableHeaderStack firstRow={puttsDistanceConversion(distance)} secondRow={''} />
                  </TableCell>
                )
              })
            } */}
          </TableRow>
        </TableHead>

        <TableBody key={_.uniqueId("putts_")}>
          <TableRow>
            {/* {
              Object.entries(puttsStatistics).map(([key, value], index: number) => {
                return (
                  <TableCell align='center' key={index}>
                    <Stack>
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>1 putt %</Typography>
                            <Typography fontWeight={'bold'}>{formatPerc(value.putt1Perc)}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>2 putt %</Typography>
                            <Typography fontWeight={'bold'}>{(value.putt1Perc === 0 && value.putt3Perc === 0) ? '-' : formatPerc(1 - value.putt1Perc - value.putt3Perc)}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>3 putt %</Typography>
                            <Typography fontWeight={'bold'}>{formatPerc(value.putt3Perc)}</Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Holed</Typography>
                            <Typography fontWeight={'bold'}>{value.puttsHoled !== 0 ? value.puttsHoled : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Attempts</Typography>
                            <Typography fontWeight={'bold'}>{value.puttsAttempts !== 0 ? value.puttsAttempts : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Average</Typography>
                            <Typography fontWeight={'bold'}>{value.puttsAverage !== 0 ? value.puttsAverage : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Average distance</Typography>
                            <Typography fontWeight={'bold'}>{value.puttsAverageDistance !== 0 ? value.puttsAverageDistance : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Second putt avg. length</Typography>
                            <Typography fontWeight={'bold'}>{value.puttsSecondAverageLength !== 0 ? value.puttsSecondAverageLength : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>3 putts</Typography>
                            <Typography fontWeight={'bold'}>{value.putts3 !== 0 ? value.putts3 : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                    </Stack>
                  </TableCell>
                )
              })} */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HolebyHoleTeeShots
