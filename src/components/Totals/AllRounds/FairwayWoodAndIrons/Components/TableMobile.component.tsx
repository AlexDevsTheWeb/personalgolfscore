import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { catConversion } from "@/utils/constant.utils";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Stack } from "@mui/material";
import _ from "lodash";

import { IRoundTotalsProps } from '@/types/props.types';
import Cross from "../../components/Cross.component";

const TableMobile = ({ roundTotals: { fwAndIrons } }: IRoundTotalsProps) => {

  return (
    <Box>
      {
        Object.entries(fwAndIrons).map(([key, value], index: number) => {
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
                </AccordionDetails>
              </Accordion>
            </Box>
          )
        })}

    </Box>
  )
}

export default TableMobile
