import CompositeTypography from "@/styles/typography/CompositeTypography.styles";
import { IPlayerProps } from "@/types/props.types";
import { Stack } from "@mui/material";

const PlayerMobile = ({ player }: IPlayerProps) => {
  const { firstName, lastName, email, hcp, dob } = player;

  return (

    <Stack sx={{ gap: '10px', width: '100%' }}>
      <CompositeTypography string='Name' value={`${firstName} ${lastName}`} dir='row' />
      <CompositeTypography string='E-mail' value={`${email}`} dir='row' />
      <CompositeTypography string='Handicap' value={`${firstName} ${hcp}`} dir='row' />
      <CompositeTypography string='Date of birth' value={`${dob}`} dir='row' />
    </Stack>
  )
}

export default PlayerMobile
