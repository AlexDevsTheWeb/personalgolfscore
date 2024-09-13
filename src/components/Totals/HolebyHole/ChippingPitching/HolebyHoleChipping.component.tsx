import { Divider, Grid, Paper, Stack, Table, TableBody, TableContainer, TableHead, Typography } from "@mui/material";
import _ from "lodash";
import { TableCell, TableRow } from "../../../../styles";
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
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              chipPitchCat.map((club: string, index: number) => {
                return (
                  <TableCell align='center' key={index} variant='putt'>
                    <ShotsTableHeaderStack firstRow={club} secondRow={''} />
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

                console.log("value: ", value);
                return (
                  <TableCell align='center' key={index}>
                    <Stack>
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>U&D Made</Typography>
                            <Typography fontWeight={'bold'}>
                              {value.upDownMade}
                            </Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Attempts</Typography>
                            <Typography fontWeight={'bold'}>
                              {value.attempts}
                            </Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Avg. Shots</Typography>
                            <Typography fontWeight={'bold'}>
                              {value.averageShot}
                            </Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Avg. Distance</Typography>
                            <Typography fontWeight={'bold'}>
                              {value.averageHoleDistance}
                            </Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={4}>
                          <Stack>
                            <Typography>Shots holed</Typography>
                            <Typography fontWeight={'bold'}>{value.shotsHoled}</Typography>
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
  )
}

export default HolebyHoleChipping
