import { useSelector } from 'react-redux';

import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { RootState } from '@/store/store';
import { IBasicRoundData } from '@/types/roundData.types';
import { IRoundDetails } from '@/types/roundDetails.types';
import { Box } from '@mui/material';
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
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box display={'flex'} flexDirection={useDeviceDetection().isMobile ? 'column' : 'row'} gap={1}>
        {
          rounds.length > 0
            ? rounds.map((round, index) => {
              return <RoundsDataHeader round={round as IRoundDetails} key={index} />
            })
            : null
        }
      </Box>

      <RoundsButtons />
    </Box >

  )
}

export default Rounds
