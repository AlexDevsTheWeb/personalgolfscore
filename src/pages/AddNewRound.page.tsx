import Spinner from '@/components/common/spinner/Spinner.component';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewRoundMain from '../components/NewRound/AddNewRound.component';
import { useAppStore } from '@/store/zustand';

const AddNewRound = () => {
  const navigate = useNavigate();
  const { player, isLoadingPlayer: isLoading } = useAppStore();

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
