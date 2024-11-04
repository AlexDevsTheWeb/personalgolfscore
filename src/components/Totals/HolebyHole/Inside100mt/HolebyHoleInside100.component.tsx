import { Divider, Grid, Paper, Stack, Table, TableBody, TableContainer, TableHead, Typography } from "@mui/material";
import _ from "lodash";
import { TableCell, TableRow } from "../../../../styles";
import GridPuttsStat from "../../../../styles/grid/GridCellStats.styles";
import { IRoundTotals } from "../../../../types/roundTotals.types";
import { catConversion } from "../../../../utils/constant.utils";
import ShotsTableHeaderStack from "../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import Cross from "../../components/Cross.component";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}

const HolebyHoleInside100 = ({ totals }: IHolebyHoleTeeShots) => {

  const { inside100Mt } = totals;
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
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Greens hit</Typography>
                            <Typography fontWeight={'bold'}>{value.greenHits}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Attempts</Typography>
                            <Typography fontWeight={'bold'}>{value.attempts}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Avg. shots</Typography>
                            <Typography fontWeight={'bold'}>{value.averageShots}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Avg. dist. GIR</Typography>
                            <Typography fontWeight={'bold'}>{value.averageDistGIR}</Typography>
                          </Stack>
                        </GridPuttsStat>
                      </Grid>
                      <Divider />
                      <Grid container spacing={1}>

                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Left</Typography>
                            <Typography fontWeight={'bold'}>{value.missedLeft}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Right</Typography>
                            <Typography fontWeight={'bold'}>{value.missedRight}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Short</Typography>
                            <Typography fontWeight={'bold'}>{value.missedShort}</Typography>
                          </Stack>
                        </GridPuttsStat>
                        <GridPuttsStat item xs={3}>
                          <Stack>
                            <Typography>Long</Typography>
                            <Typography fontWeight={'bold'}>{value.missedOver}</Typography>
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

export default HolebyHoleInside100
