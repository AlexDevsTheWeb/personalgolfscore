
import { RootState } from '@/store/store';
import StackNewHole from '@/styles/stack/StackNewHole.styles';
import { useSelector } from 'react-redux';
import AddNewRoundForm from './AddNewRoundForm.component';
import AddNewRoundHoles from './AddNewRoundHoles.component';
import NewRoundMainData from './components/NewRoundMainData.component';

const NewRoundMain = () => {
  const setFirstHole = useSelector((state: RootState) => state.newRound.newRoundMain.setFirstHole);

  return (
    <StackNewHole gap={2} spacing={2}>
      <AddNewRoundForm />
      {setFirstHole && <NewRoundMainData />}
      {setFirstHole && <AddNewRoundHoles />}
    </StackNewHole>
  )
}

export default NewRoundMain
