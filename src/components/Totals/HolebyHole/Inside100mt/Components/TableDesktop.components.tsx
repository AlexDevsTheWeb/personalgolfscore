import { Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
import GridPuttsStat from "../../../../../styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from "../../../../../types/props.types";
import { catConversion } from "../../../../../utils/constant.utils";
import ShotsTableHeaderStack from "../../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import Cross from "../../components/Cross.component";


const TableDesktop = ({ roundTotals: { inside100Mt } }: IRoundTotalsProps) => {

  const categories = Object.keys(inside100Mt);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              categories.map((cat: string, index: number) => {
                return (
                  <TableCell align='center' key={index} variant='putt' sx={{ borderLeft: '1px solid #000' }}>
                    <ShotsTableHeaderStack firstRow={catConversion(cat)} secondRow={''} />
                  </TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>

        <TableBody key={_.uniqueId("putts_")}>
          <TableRow>
            {
              Object.entries(inside100Mt).map(([key, value], index: number) => {
                return (
                  <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #000' }}>
                    <Stack>
                      <Cross left={value.missedLeft} right={value.missedRight} center={value.greenHits} short={value.missedShort} over={value.missedOver} totals={value.attempts} />
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={3} string='Greens hit' value={value.greenHits} />
                        <GridPuttsStat item xs={3} string='Attempts' value={value.attempts} />
                        <GridPuttsStat item xs={3} string='Avg. shots' value={value.averageShots} />
                        <GridPuttsStat item xs={3} string='Avg. dist. GIR' value={value.averageDistGIR} />
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={3} string='Left' value={value.missedLeft} />
                        <GridPuttsStat item xs={3} string='Right' value={value.missedRight} />
                        <GridPuttsStat item xs={3} string='Short' value={value.missedShort} />
                        <GridPuttsStat item xs={3} string='Long' value={value.missedOver} />
                      </Grid>
                    </Stack>
                  </TableCell>
                )
              })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default TableDesktop
