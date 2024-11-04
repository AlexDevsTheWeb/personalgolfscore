import { Divider, Grid, Paper, Stack, Table, TableBody, TableContainer, TableHead, Typography } from "@mui/material";
import _ from "lodash";
import { CHIPPING } from "../../../../enum/shots.enum";
import { BoxOverflow, TableCell, TableRow } from "../../../../styles";
import GridPuttsStat from "../../../../styles/grid/GridCellStats.styles";
import { IRoundTotals } from "../../../../types/roundTotals.types";
import ShotsTableHeaderStack from "../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHoleChipping {
  totals: IRoundTotals
}

const HolebyHoleChipping = ({ totals }: IHolebyHoleChipping) => {

  const { chipPitch } = totals;
  const chipPitchCat = Object.keys(chipPitch);

  return (
    <BoxOverflow direction='horizontal' variant='table'>
      <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
        <Table sx={{ minWidth: '1500px', width: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                chipPitchCat.map((club: string, index: number) => {
                  const clubType = CHIPPING[club.toUpperCase() as keyof typeof CHIPPING] || club;
                  return (
                    <TableCell align='center' key={index} variant='putt'>
                      <ShotsTableHeaderStack firstRow={clubType as string} secondRow={''} />
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>

          <TableBody key={_.uniqueId("putts_")}>
            <TableRow>
              {
                Object.entries(chipPitch).map(([key, value], index: number) => {
                  return (
                    <TableCell align='center' key={index}>
                      <Stack>
                        <Grid container spacing={1}>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>U&D made</Typography>
                              <Typography fontWeight={'bold'}>
                                {value.upDownMade}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>Attempts made</Typography>
                              <Typography fontWeight={'bold'}>
                                {value.attempts}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>Shots holed</Typography>
                              <Typography fontWeight={'bold'}>{value.shotsHoled}</Typography>
                            </Stack>
                          </GridPuttsStat>
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>Avg. shots</Typography>
                              <Typography fontWeight={'bold'}>
                                {value.averageShots}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>Avg. distance</Typography>
                              <Typography fontWeight={'bold'}>
                                {value.averageHoleDistanceShot}
                              </Typography>
                            </Stack>
                          </GridPuttsStat>
                          <GridPuttsStat item xs={4}>
                            <Stack>
                              <Typography>Green missed</Typography>
                              <Typography fontWeight={'bold'}>{value.greenMissed}</Typography>
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
  )
}

export default HolebyHoleChipping
