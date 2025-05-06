import Spinner from '@/components/common/spinner/Spinner.component';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewRoundMain from '../components/NewRound/AddNewRound.component';

const AddNewRound = () => {
  const navigate = useNavigate();
  const { player, isLoading } = useSelector((state: RootState) => state.player);

  useEffect(() => {
    if (player?.uid && !player.isSetupComplete) {
      navigate('/dashboard');
    }
  }, [player, navigate]);

  return (
    isLoading
      ? <Spinner />
      : <NewRoundMain />
  )
}

export default AddNewRound
