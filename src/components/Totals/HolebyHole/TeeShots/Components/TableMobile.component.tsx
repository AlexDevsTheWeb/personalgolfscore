import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Stack } from "@mui/material";
import _ from "lodash";
import GridPuttsStat from "../../../../../styles/grid/GridCellStats.styles";
import { IRoundTotals } from "../../../../../types/roundTotals.types";
import { catConversion } from "../../../../../utils/constant.utils";
import { formatPerc } from '../../../../../utils/number/number.utils';
import ShotsTableHeaderStack from "../../../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";

interface IHolebyHoleTeeShots {
  totals: IRoundTotals
}
const TableMobile = ({ totals }: IHolebyHoleTeeShots) => {

  const { teeShots } = totals;

  return (
    <Box>

      {
        Object.entries(teeShots).map(([key, value], index: number) => {
          return (
            <Box key={_.uniqueId("fwIrons_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>
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
                  <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
            </Box>
          )
        })}
    </Box>
  )
}

export default TableMobile
