import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { IBasicRoundData } from '@/types/roundData.types';
import { IRoundDetails } from '@/types/roundDetails.types';
import { Grid } from '@mui/material';
import Spinner from '../common/spinner/Spinner.component';
import RoundsDataHeader from '../RoundsData/components/roundData/RoundsDataHeader.component';
import RoundsButtons from './RoundsButtons.component';

interface IRoundsProps {
  rounds: IBasicRoundData[];
}

const Rounds = ({ rounds }: IRoundsProps) => {
  const { isLoading } = useSelector((store: RootState) => store.rounds);

  if (!!isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Grid container spacing={1} columns={{ xs: 1, sm: 12 }}>
        {
          rounds.length > 0
            ? rounds.map((round, index) => {
              return (<Grid size={{ xs: 1, sm: 3, md: 4 }} spacing={1} key={index}>
                <RoundsDataHeader round={round as IRoundDetails} />
              </Grid>)
            })
            : null
        }
      </Grid>
      <RoundsButtons />
    </>

  )
}

export default Rounds
