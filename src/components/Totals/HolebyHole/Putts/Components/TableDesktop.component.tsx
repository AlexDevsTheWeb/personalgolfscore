import { Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import _ from "lodash";
import GridPuttsStat from "../../../../../styles/grid/GridCellStats.styles";
import { IRoundTotalsPutts } from "../../../../../types/roundTotals.types";
import { catConversion } from "../../../../../utils/constant.utils";
import { formatPerc } from "../../../../../utils/number/number.utils";
import ShotsTableHeaderStack from "../../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

const TableDesktop = ({ totalsPutts }: IHolebyHolePutts) => {

  const { puttsStatistics } = totalsPutts;

  const puttsCat = Object.keys(puttsStatistics).filter(e => e !== '_puttsOverall');
  const puttsValues = Object.entries(puttsStatistics).filter(e => e[0] !== '_puttsOverall');
  const puttsOverallCat = Object.keys(puttsStatistics).filter(e => e === '_puttsOverall');
  const puttsOverallValues = Object.entries(puttsStatistics).filter(e => e[0] === '_puttsOverall');

  return (
    <TableContainer component={Paper} sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              puttsOverallCat.map((distance: string, index: number) => {
                return (
                  <TableCell align='center' key={index} variant='putt'>
                    <ShotsTableHeaderStack firstRow={catConversion(distance)} secondRow={''} />
                  </TableCell>
                )
              })
            }
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
              puttsOverallValues.map(([key, value], index: number) => {
                return (
                  <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #000' }}>
                    <Stack>
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={12} string='Putts' value={value.totalPutts !== 0 ? value.totalPutts : '-'} />
                        <GridPuttsStat item xs={12} string='Putts/GIR' value={value.totalPuttsInGIR !== 0 ? value.totalPuttsInGIR : '-'} />
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={12} string='Birdie conv.' value={value.birdieConversion !== 0 ? value.birdieConversion : '-'} />
                        <GridPuttsStat item xs={12} string='3 putts per round' value={value.threePutts !== 0 ? value.threePutts : '-'} />
                      </Grid>
                    </Stack>
                  </TableCell>
                )
              })}
            {
              puttsValues.map(([key, value], index: number) => {
                return (
                  <TableCell align='center' key={index} sx={{ borderLeft: '1px solid #000' }}>
                    <Stack>
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4} string='1 putt %' value={formatPerc(value.putt1Perc)} />
                        <GridPuttsStat item xs={4} string='2 putt %' value={(value.putt1Perc === 0 && value.putt3Perc === 0) ? '-' : formatPerc(1 - value.putt1Perc - value.putt3Perc)} />
                        <GridPuttsStat item xs={4} string='3 putt %' value={formatPerc(value.putt3Perc)} />
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4} string='Holed' value={value.puttsHoled !== 0 ? value.puttsHoled : '-'} />
                        <GridPuttsStat item xs={4} string='Attempts' value={value.puttsAttempts !== 0 ? value.puttsAttempts : '-'} />
                        <GridPuttsStat item xs={4} string='Average' value={value.puttsAverage !== 0 ? value.puttsAverage : '-'} />
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>
                        <GridPuttsStat item xs={4} string='Average distance' value={value.puttsAverageDistance !== 0 ? value.puttsAverageDistance : '-'} />
                        <GridPuttsStat item xs={4} string='Second putt avg. length' value={Number(value.puttsSecondAverageLength) !== 0 ? Number(value.puttsSecondAverageLength) : '-'} />
                        <GridPuttsStat item xs={4} string='3 putts' value={value.putts3 !== 0 ? value.putts3 : '-'} />
                      </Grid >
                    </Stack >
                  </TableCell >
                )
              })}
          </TableRow >
        </TableBody >
      </Table >
    </TableContainer >
  )
}

export default TableDesktop
