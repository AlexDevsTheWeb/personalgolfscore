import Spinner from "@/components/common/spinner/Spinner.component";
import { RootState } from "@/store/store";
import Grid from "@/styles/grid/Grid2.styles";
import StackPlayer from "@/styles/stack/StackPlayer.styles";
import dayjs from "dayjs";
import _ from "lodash";
import { useSelector } from "react-redux";

const Player = () => {

  const { player } = useSelector((store: RootState) => store.player);

  if (_.isEmpty(player)) {
    return <Spinner />
  }

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <StackPlayer name={'Name'} value={`${player.firstName} ${player.lastName}`} />
        {/* <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='Name' secondRow={''} />
          <Typography>{`${player.firstName} ${player.lastName}`}</Typography>
        </Stack> */}
      </Grid>
      <Grid size={3}>
        <StackPlayer name={'E-mail'} value={player.email} />
        {/* <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='email' secondRow={''} />
          <Typography>{player.email}</Typography>
        </Stack> */}
      </Grid>
      <Grid size={3}>
        <StackPlayer name={'HCP'} value={player.HCP} />

      </Grid>
      <Grid size={3}>
        <StackPlayer name={'Date of birth'} value={player.DOB.seconds ? dayjs.unix(player.DOB.seconds).format('DD/MM/YYYY') : '-'} />
        {/* <Stack gap={2} width={'100%'} textAlign={'center'}>
          <ShotsTableHeaderStack firstRow='Date of birth' secondRow={''} />
          <Typography>{player.DOB.seconds ? dayjs.unix(player.DOB.seconds).format('DD/MM/YYYY') : '-'}</Typography>
        </Stack> */}
      </Grid>
    </Grid>
  )
}

export default Player
