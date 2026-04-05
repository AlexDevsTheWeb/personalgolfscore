import Spinner from "@/components/common/spinner/Spinner.component";
import Grid from "@/styles/grid/Grid.styles";
import StackPlayer from "@/styles/stack/StackPlayer.styles";
import dayjs from "dayjs";
import _ from "lodash";
import { usePlayerStore } from "@/store/zustand";

const Player = () => {
  const { player, isLoading } = usePlayerStore();

  if (isLoading || _.isEmpty(player) || !player.uid) {
    return <Spinner />
  }

  const formattedDOB = player.DOB && typeof player.DOB === 'number' && player.DOB > 0
    ? dayjs(player.DOB).format('DD/MM/YYYY')
    : '-';

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <StackPlayer name={'Name'} value={`${player.firstName ?? ''} ${player.lastName ?? ''}`.trim()} />
      </Grid>
      <Grid size={3}>
        <StackPlayer name={'E-mail'} value={player.email ?? '-'} />
      </Grid>
      <Grid size={3}>
        <StackPlayer name={'HCP'} value={player.HCP ?? '-'} />
      </Grid>
      <Grid size={3}>
        <StackPlayer name={'Date of birth'} value={formattedDOB} />
      </Grid>
    </Grid>
  )
}

export default Player
