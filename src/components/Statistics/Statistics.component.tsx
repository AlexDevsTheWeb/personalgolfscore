import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Statistics = () => {
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);
  // const allTotals = calculateTotals(totals);
  // const totals9 = calculateTotals(totals, 9);
  // const totals18 = calculateTotals(totals, 18);

  return (<></>
    // <Box sx={{
    //   display: 'flex', flexDirection: 'column', rowGap: 1.175
    // }}>
    //   {/* <StatisticsNumbers totals={allTotals} holes={totals.length} /> */}
    //   <Accordion disabled={totals18.roundID === ''}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1-content"
    //       id="panel1-header"
    //     >
    //       <Typography>18 Holes</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       {/* <StatisticsNumbers totals={totals18} holes={totals.filter((t) => t.holeNumber === 18).length} /> */}
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion disabled={totals9.roundID === ''}>
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel2-content"
    //       id="panel2-header"
    //     >
    //       <Typography>9 Holes</Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       {/* <StatisticsNumbers totals={totals9} holes={totals.filter((t) => t.holeNumber === 9).length} /> */}
    //     </AccordionDetails>
    //   </Accordion>
    // </Box>
  )
}

export default Statistics