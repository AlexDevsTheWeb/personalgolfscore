import { Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
import { CHIPPING } from "../../../../../enum/shots.enum";
import { BoxOverflow } from "../../../../../styles";
import GridPuttsStat from "../../../../../styles/grid/GridCellStats.styles";
import { IRoundTotals } from "../../../../../types/roundTotals.types";
import ShotsTableHeaderStack from "../../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}

const TableDesktop = ({ totals }: IHolebyHoleTeeShots) => {

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
                          <GridPuttsStat item xs={4} string='U&D made' value={value.upDownMade} />
                          <GridPuttsStat item xs={4} string='Attempts made' value={value.attempts} />
                          <GridPuttsStat item xs={4} string='Shots holed' value={value.shotsHoled} />
                        </Grid>
                        <Divider />
                        <Grid container spacing={1}>
                          <GridPuttsStat item xs={4} string='Average shots' value={value.averageShots} />
                          <GridPuttsStat item xs={4} string='Avg. distance' value={value.averageHoleDistanceShot} />
                          <GridPuttsStat item xs={4} string='Green missed' value={value.greenMissed} />
                        </Grid>
                      </Stack>
                    </TableCell>
                  )
                })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >
    </BoxOverflow >
  )
}

export default TableDesktop
