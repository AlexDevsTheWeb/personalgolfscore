import Spinner from "@/components/spinner/Spinner.component";
import CompositeTypography from "@/styles/typography/CompositeTypography.styles";
import { IPlayerProps } from "@/types/props.types";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";

const PlayerMobile = ({ player }: IPlayerProps) => {

  if (_.isEmpty(player)) {
    return <Spinner />
  }

  return (
    <Stack sx={{ gap: '10px', width: '100%' }}>
      <CompositeTypography string='Name' value={`${player.firstName} ${player.lastName}`} dir='row' />
      <CompositeTypography string='E-mail' value={`${player.email}`} dir='row' />
      <CompositeTypography string='Handicap' value={`${player.HCP}`} dir='row' />
      <CompositeTypography string='Date of birth' value={player.DOB.seconds ? dayjs.unix(player.DOB.seconds).format('DD/MM/YYYY') : '-'} dir='row' />
    </Stack>
  )
}

export default PlayerMobile
