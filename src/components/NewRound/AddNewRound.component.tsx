
import { Stack } from '../../styles';
import AddNewRoundHoles from './AddNewRoundHoles.component';
import AddNewRoundMain from './AddNewRoundMain.component';
import AddNewRoundTotals from './AddNewRoundTotals.component';

const NewRoundMain = () => {

  return (
    <Stack sx={{ rowGap: 1 }}>
      <AddNewRoundMain />
      <AddNewRoundHoles />
      <AddNewRoundTotals />
    </Stack>

  )
}

export default NewRoundMain
