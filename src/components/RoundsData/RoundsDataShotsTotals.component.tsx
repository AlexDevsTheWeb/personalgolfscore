import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IShots } from '../../types/roundData.types';
import { INewTotals } from '../../types/roundTotals.types';

interface IRoundDataShotsTotals {
  totals: INewTotals;
  shots: IShots[];
  coursePar: number;
}

export const RoundsDataShotsTotals = ({ totals, shots, coursePar }: IRoundDataShotsTotals) => {

  return (
    <Accordion>
      <AccordionSummary>
        Round statistics
      </AccordionSummary>
      <AccordionDetails>
        {/* <StatisticsNumbers
          totals={totals}
          shots={shots}
          coursePar={coursePar}
        /> */}
      </AccordionDetails>
    </Accordion>

  )
}