import { Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
import GridPuttsStat from "../../../../../styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from "../../../../../types/props.types";
import { catConversion } from "../../../../../utils/constant.utils";
import { formatPerc } from "../../../../../utils/number/number.utils";
import ShotsTableHeaderStack from "../../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

const TableDesktop = ({ roundTotals: { teeShots } }: IRoundTotalsProps) => {
  const categories = Object.keys(teeShots);

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              categories.map((teeShot: string, index: number) => {
                return (
                  <TableCell align='center' key={index} variant='putt' sx={{ borderLeft: '1px solid #000' }}>
                    <ShotsTableHeaderStack firstRow={catConversion(teeShot)} secondRow={''} />
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
                        <GridPuttsStat item xs={4} string='Left %' value={formatPerc(value.fairwayLeftPCT)} />
                        <GridPuttsStat item xs={4} string='Center %' value={formatPerc(value.fairwayCenterPCT)} />
                        <GridPuttsStat item xs={4} string='Right %' value={formatPerc(value.fairwayRightPCT)} />
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4} string='Fairways hit' value={value.fairwayHits !== 0 ? value.fairwayHits : '-'} />
                        <GridPuttsStat item xs={4} string='Attempts' value={value.attempts !== 0 ? value.attempts : '-'} />
                        <GridPuttsStat item xs={4} string='Average distance' value={value.averageDistance !== 0 ? value.averageDistance : '-'} />
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4} string='Missed left' value={value.missLeft !== 0 ? value.missLeft : '-'} />
                        <GridPuttsStat item xs={4} string='Missed right' value={value.missRight !== 0 ? value.missRight : '-'} />
                        <GridPuttsStat item xs={4} string='No shot to green' value={value.noGreen !== 0 ? value.noGreen : '-'} />
                      </Grid>
                    </Stack>
                  </TableCell>
                )
              })}
          </TableRow>
        </TableBody >
      </Table >
    </TableContainer >
  )
}

export default TableDesktop
