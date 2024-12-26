import ShotsTableHeaderStack from "@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import { CHIPPING } from '@/enum/shots.enum';
import GridPuttsStat from "@/styles/grid/GridCellStats.styles";
import { IRoundTotalsProps } from '@/types/props.types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Stack } from "@mui/material";
import _ from "lodash";

const TableMobile = ({ roundTotals: { chipPitch } }: IRoundTotalsProps) => {

  return (
    <Box>
      {
        Object.entries(chipPitch).map(([key, value], index: number) => {
          const clubType = CHIPPING[key.toUpperCase() as keyof typeof CHIPPING] || key;
          return (
            <Box key={_.uniqueId("chipPitch_")} sx={{ gap: '10px', border: '1px solid #ddd' }}>
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
                  <ShotsTableHeaderStack firstRow={clubType as string} secondRow={''} />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack>
                    <Grid container spacing={1}>
                      <GridPuttsStat item xs={4} string='U&D made' value={value.upDownMade} />
                      <GridPuttsStat item xs={4} string='Attempts made' value={value.attempts} />
                      <GridPuttsStat item xs={4} string='Shots holed' value={value.shotsHoled} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={1}>
                      <GridPuttsStat item xs={4} string='Avgerage shots' value={value.averageShots} />
                      <GridPuttsStat item xs={4} string='Avg. distance' value={value.averageHoleDistanceShot} />
                      <GridPuttsStat item xs={4} string='Green missed' value={value.greenMissed} />
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
