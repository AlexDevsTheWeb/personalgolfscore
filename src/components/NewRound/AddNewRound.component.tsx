
import StackNewHole from '@/styles/stack/StackNewHole.styles';
import AddNewRoundForm from './AddNewRoundForm.component';
import AddNewRoundHoles from './AddNewRoundHoles.component';

const NewRoundMain = () => {
  return (
    <StackNewHole>
      <AddNewRoundForm />
      <AddNewRoundHoles />
    </StackNewHole>
  )
}

export default NewRoundMain
