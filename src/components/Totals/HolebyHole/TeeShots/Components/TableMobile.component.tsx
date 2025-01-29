import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import AccordionSummary from "@/styles/accordion/AccordionSummary.styles";
import GridAccordion from "@/styles/grid/GridAccordion.styles";
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from '@/types/props.types';
import { catConversion } from "@/utils/constant.utils";
import { formatPerc } from '@/utils/number/number.utils';
import { Accordion, AccordionDetails, Box, Divider, Stack } from "@mui/material";
import _ from "lodash";

const TableMobile = ({ roundTotals: { teeShots } }: IRoundTotalsProps) => {

  return (
    <Box>

      {
        Object.entries(teeShots).map(([key, value], index: number) => {
          return (
            <Box key={_.uniqueId("fwIrons_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>
              <Accordion>
                <AccordionSummary>
                  <ShotsTableHeaderStack firstRow={catConversion(key)} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <GridAccordion>
                      <GridPuttsStat item xs={4} string='Left %' value={formatPerc(value.fairwayLeftPCT)} />
                      <GridPuttsStat item xs={4} string='Center %' value={formatPerc(value.fairwayCenterPCT)} />
                      <GridPuttsStat item xs={4} string='Right %' value={formatPerc(value.fairwayRightPCT)} />
                    </GridAccordion>
                    <Divider />
                    <GridAccordion container spacing={1}>
                      <GridPuttsStat item xs={4} string='Fairways hit' value={value.fairwayHits !== 0 ? value.fairwayHits : '-'} />
                      <GridPuttsStat item xs={4} string='Attempts' value={value.attempts !== 0 ? value.attempts : '-'} />
                      <GridPuttsStat item xs={4} string='Avg. distance' value={value.averageDistance !== 0 ? value.averageDistance : '-'} />
                    </GridAccordion>
                    <Divider />
                    <GridAccordion container spacing={1}>
                      <GridPuttsStat item xs={4} string='Missed left' value={value.missLeft !== 0 ? value.missLeft : '-'} />
                      <GridPuttsStat item xs={4} string='Missed right' value={value.missRight !== 0 ? value.missRight : '-'} />
                      <GridPuttsStat item xs={4} string='No green shot' value={value.noGreen !== 0 ? value.noGreen : '-'} />
                    </GridAccordion>
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
