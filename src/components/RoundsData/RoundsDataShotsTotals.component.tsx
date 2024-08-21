import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IShots } from '../../types/roundData.types';
import { INewTotals } from '../../types/roundTotals.types';
import StatisticsNumbers from '../Statistics/StatisticsNumbers.component';

interface IRoundDataShotsTotals {
  totals: INewTotals;
  shots: IShots[];
}

const RoundsDataShotsTotals = ({ totals, shots }: IRoundDataShotsTotals) => {

  return (
    <Accordion>
      <AccordionSummary>
        Round statistics
      </AccordionSummary>
      <AccordionDetails>
        <StatisticsNumbers
          totals={totals}
          shots={shots}
        />
      </AccordionDetails>
    </Accordion>

  )
}

export default RoundsDataShotsTotals