import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Stack } from "@mui/material";
import _ from "lodash";
import GridPuttsStat from "../../../../../styles/grid/GridCellStats.styles";
import { IRoundTotalsPutts } from "../../../../../types/roundTotals.types";
import { catConversion } from "../../../../../utils/constant.utils";
import { formatPerc } from '../../../../../utils/number/number.utils';
import ShotsTableHeaderStack from "../../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHolePutts {
  totalsPutts: IRoundTotalsPutts
}

const TableMobile = ({ totalsPutts }: IHolebyHolePutts) => {

  const { puttsStatistics } = totalsPutts;
  const puttsValues = Object.entries(puttsStatistics).filter(e => e[0] !== '_puttsOverall');
  const puttsOverallValues = Object.entries(puttsStatistics).filter(e => e[0] === '_puttsOverall');

  return (
    <Box>
      {
        Object.entries(puttsOverallValues).map(([key, value], index: number) => {
          return (
            <Box key={_.uniqueId("putts_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>
              <Accordion>
                <AccordionSummary
                  sx={{
                    backgroundColor: '#f0f0f0', borderRadius: 0
                    , boxShadow: 'none', border: 'none', height: '40px'
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <ShotsTableHeaderStack firstRow={catConversion(value[0])} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <Grid container spacing={1}>
                      <GridPuttsStat item xs={3} string='Putts' value={value[1].totalPutts !== 0 ? value[1].totalPutts : '-'} />
                      <GridPuttsStat item xs={3} string='Putts/GIR' value={value[1].totalPuttsInGIR !== 0 ? value[1].totalPuttsInGIR : '-'} />
                      <GridPuttsStat item xs={3} string='Birdie conv.' value={value[1].birdieConversion !== 0 ? value[1].birdieConversion : '-'} />
                      <GridPuttsStat item xs={3} string='3 putts per round' value={value[1].threePutts !== 0 ? value[1].threePutts : '-'} />
                    </Grid>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          )
        })}
      {
        Object.entries(puttsValues).map(([key, value], index: number) => {
          return (
            <Box key={_.uniqueId("putts_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>
              <Accordion>
                <AccordionSummary
                  sx={{
                    backgroundColor: '#f0f0f0', borderRadius: 0
                    , boxShadow: 'none', border: 'none', height: '40px'
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <ShotsTableHeaderStack firstRow={catConversion(value[0])} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <Grid container spacing={1}>
                      <GridPuttsStat item xs={4} string='1 putt %' value={formatPerc(value[1].putt1Perc)} />
                      <GridPuttsStat item xs={4} string='2 putt %' value={(value[1].putt1Perc === 0 && value[1].putt3Perc === 0) ? '-' : formatPerc(1 - value[1].putt1Perc - value[1].putt3Perc)} />
                      <GridPuttsStat item xs={4} string='3 putt %' value={formatPerc(value[1].putt3Perc)} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={1}>
                      <GridPuttsStat item xs={4} string='Holed' value={value[1].puttsHoled !== 0 ? value[1].puttsHoled : '-'} />
                      <GridPuttsStat item xs={4} string='Attempts' value={value[1].puttsAttempts !== 0 ? value[1].puttsAttempts : '-'} />
                      <GridPuttsStat item xs={4} string='Average' value={value[1].puttsAverage !== 0 ? value[1].puttsAverage : '-'} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={1}>
                      <GridPuttsStat item xs={4} string='Average distance' value={value[1].puttsAverageDistance !== 0 ? value[1].puttsAverageDistance : '-'} />
                      <GridPuttsStat item xs={4} string='Second putt avg. length' value={Number(value[1].puttsSecondAverageLength) !== 0 ? Number(value[1].puttsSecondAverageLength) : '-'} />
                      <GridPuttsStat item xs={4} string='3 putts' value={value[1].putts3 !== 0 ? value[1].putts3 : '-'} />
                    </Grid >
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          )
        })}

    </Box>
  )
}

export default TableMobile
