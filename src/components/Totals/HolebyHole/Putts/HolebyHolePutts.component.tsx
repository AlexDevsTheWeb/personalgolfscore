import { Box } from "@mui/material";
import { IRoundTotalsPutts } from "../../../../types/roundTotals.types";
import { puttsDistanceConversion } from "../../../../utils/constant.utils";
import ShotsTableHeaderStack from "../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import TotalsDisplay from "../../components/TotalsDisplay.component";

interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

const HolebyHolePutts = ({ totalsPutts }: IHolebyHolePutts) => {

  const { puttsStatistics } = totalsPutts;

  const puttsCat = Object.keys(puttsStatistics);
  const puttsValues = Object.entries(puttsStatistics);

  console.log("cat: ", puttsCat);
  console.log("puttsValues: ", puttsValues);

  return (
    <>
      <Box display='flex'>
        {
          puttsValues.map((value: any, index: number) => {
            return (
              <Box sx={{ border: '1px solid #ccc' }}>
                <ShotsTableHeaderStack
                  firstRow={puttsDistanceConversion(value[0])}
                  secondRow={''}
                />
                <TotalsDisplay value={value[1]} />
              </Box>

            )
          })
        }
      </Box>

      {/* <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                puttsCat.map((distance: string, index: number) => {
                  return (
                    <TableCell align='center' key={index} variant='putt'>
                      <ShotsTableHeaderStack firstRow={puttsDistanceConversion(distance)} secondRow={''} />
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
                      <TotalsDisplay value={value} />
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
      </TableContainer> */}
    </>

  );
}

export default HolebyHolePutts
