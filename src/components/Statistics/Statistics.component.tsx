import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { calculateTotals } from '../../utils/shots/shots.utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StatisticsNumbers from './StatisticsNumbers.component';

const Statistics = () => {
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  const allTotals = calculateTotals(totals,);
  const totals9 = calculateTotals(totals, 9);
  const totals18 = calculateTotals(totals, 18);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', rowGap: 1.175
    }}>
      <StatisticsNumbers totals={allTotals} holes={totals.length} />
      <Accordion disabled={totals18.roundID === ''}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>18 Holes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StatisticsNumbers totals={totals18} holes={totals.length} />
        </AccordionDetails>
      </Accordion>
      <Accordion disabled={totals9.roundID === ''}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>9 Holes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StatisticsNumbers totals={totals9} holes={totals.length} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default Statistics