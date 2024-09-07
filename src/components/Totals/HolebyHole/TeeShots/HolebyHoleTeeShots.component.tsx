import { Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import _ from "lodash";
import GridPuttsStat from "../../../../styles/grid/GridPuttsStat.styles";
import { IRoundTotals } from "../../../../types/roundTotals.types";
import { teeShotsConversion } from "../../../../utils/constant.utils";
import { formatPerc } from "../../../../utils/number/number.utils";
import ShotsTableHeaderStack from "../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}

const HolebyHoleTeeShots = ({ totals }: IHolebyHoleTeeShots) => {

  const { teeShots } = totals;
  const teeShotsCat = Object.keys(teeShots);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Typography variant='headline2'>TEE SHOTS STATISTICS</Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              teeShotsCat.map((teeShot: string, index: number) => {
                return (
                  <TableCell align='center' key={index} variant='putt' sx={{ borderLeft: '1px solid #000' }}>
                    <ShotsTableHeaderStack firstRow={teeShotsConversion(teeShot)} secondRow={''} />
                  </TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>

        <TableBody key={_.uniqueId("putts_")}>
          <TableRow>
            {
              Object.entries(teeShots).map(([key, value], index: number) => {
                return (
                  <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #000' }}>
                    <Stack>
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Left %</Typography>
                            <Typography fontWeight={'bold'}>{formatPerc(value.fairwayLeftPCT)}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Center %</Typography>
                            <Typography fontWeight={'bold'}>{formatPerc(value.fairwayCenterPCT)}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Right %</Typography>
                            <Typography fontWeight={'bold'}>{formatPerc(value.fairwayRightPCT)}</Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Fairways hit</Typography>
                            <Typography fontWeight={'bold'}>{value.fairwayHits !== 0 ? value.fairwayHits : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Attempts</Typography>
                            <Typography fontWeight={'bold'}>{value.attempts !== 0 ? value.attempts : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Average distance</Typography>
                            <Typography fontWeight={'bold'}>{value.averageDistance !== 0 ? value.averageDistance : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Missed left</Typography>
                            <Typography fontWeight={'bold'}>{value.missLeft !== 0 ? value.missLeft : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Missed right</Typography>
                            <Typography fontWeight={'bold'}>{value.missRight !== 0 ? value.missRight : '-'}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>No shot to green</Typography>
                            <Typography fontWeight={'bold'}>{value.noGreen !== 0 ? value.noGreen : '-'}</Typography>
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
  )
}

export default HolebyHoleTeeShots
