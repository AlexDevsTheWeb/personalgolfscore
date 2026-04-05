import Spinner from '@/components/common/spinner/Spinner.component';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewRoundMain from '../components/NewRound/AddNewRound.component';
import { usePlayerStore } from '@/store/zustand';

const AddNewRound = () => {
  const navigate = useNavigate();
  const { player, isLoading } = usePlayerStore();

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
