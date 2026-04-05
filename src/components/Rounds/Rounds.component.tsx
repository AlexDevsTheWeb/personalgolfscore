import { IBasicRoundData } from '@/types/roundData.types';
import { IRoundDetails } from '@/types/roundDetails.types';
import { Grid } from '@mui/material';
import Spinner from '../common/spinner/Spinner.component';
import RoundsDataHeader from '../RoundsData/components/roundData/RoundsDataHeader.component';
import RoundsButtons from './RoundsButtons.component';
import { useAppStore } from '@/store/zustand';

interface IRoundsProps {
  rounds: IBasicRoundData[];
}

const Rounds = ({ rounds }: IRoundsProps) => {
  const isLoadingRounds = useAppStore((state) => state.isLoadingRounds);

  if (!!isLoadingRounds) {
    return <Spinner />
  }

  return (
    <>
      <Grid container spacing={1} columns={{ xs: 1, sm: 12 }}>
        {
          rounds.length > 0
            ? rounds.map((round, index) => {
              return (<Grid size={{ xs: 1, sm: 3, md: 4 }} key={index}>
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
