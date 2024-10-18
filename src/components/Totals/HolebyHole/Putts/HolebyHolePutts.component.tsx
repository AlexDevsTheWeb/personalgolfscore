import { Divider, Paper, Table, TableBody, TableContainer, TableHead } from "@mui/material";
import _ from "lodash";
import { BoxOverflow, Grid, Stack, TableCell, TableRow, Typography } from "../../../../styles";
import GridPuttsStat from "../../../../styles/grid/GridCellStats.styles";
import { IRoundTotalsPutts } from "../../../../types/roundTotals.types";
import { catConversion } from "../../../../utils/constant.utils";
import { formatPerc } from "../../../../utils/number/number.utils";
import ShotsTableHeaderStack from "../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

const HolebyHolePutts = ({ totalsPutts }: IHolebyHolePutts) => {

  const { puttsStatistics } = totalsPutts;

  const puttsCat = Object.keys(puttsStatistics);
  const puttsValues = Object.entries(puttsStatistics);

  return (
    <BoxOverflow direction='horizontal' variant='table'>
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
        <Table sx={{ minWidth: '1500px', width: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                puttsCat.map((distance: string, index: number) => {
                  return (
                    <TableCell align='center' key={index} variant='putt'>
                      <ShotsTableHeaderStack firstRow={catConversion(distance)} secondRow={''} />
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>

          <TableBody key={_.uniqueId("putts_")}>
            <TableRow>
              {
                puttsValues.map(([key, value], index: number) => {
                  return (
                    <TableCell align='center' key={index}>
                      {/* <TotalsDisplay value={value} /> */}
                      <Stack>
                        <Grid container spacing={1}>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>1 putt %</Typography>
                              <Typography fontWeight={'bold'}>
                                {formatPerc(value.putt1Perc)}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>2 putt %</Typography>
                              <Typography fontWeight={'bold'}>
                                {(value.putt1Perc === 0 && value.putt3Perc === 0) ? '-' : formatPerc(1 - value.putt1Perc - value.putt3Perc)}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>3 putt %</Typography>
                              <Typography fontWeight={'bold'}>
                                {formatPerc(value.putt3Perc)}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>Holed</Typography>
                              <Typography fontWeight={'bold'}>
                                {value.puttsHoled !== 0 ? value.puttsHoled : '-'}
                              </Typography>
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
                              <Typography fontWeight={'bold'}>{Number(value.puttsSecondAverageLength) !== 0 ? Number(value.puttsSecondAverageLength) : '-'}</Typography>
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
                })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </BoxOverflow>

  );
}

export default HolebyHolePutts
