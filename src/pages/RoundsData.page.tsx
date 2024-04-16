import { useSelector } from 'react-redux';
import RoundsDataMain from '../components/RoundsData/RoundsDataMain.component';
import { RootState } from '../store/store';
import { Typography } from '../styles';

const RoundsData = () => {
  const { isLoading } = useSelector((store: RootState) => store.roundsNumber.roundsData);

  if (!!isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <RoundsDataMain />
  )
}

export default RoundsData
