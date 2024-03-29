import { Typography } from '@mui/material'
import { IClubType } from '../../types/clubs.types'

const ClubsList = (club: any) => {

  const { props } = club;
  console.log(props[1]);
  return (

    <Typography>{props.typeName}</Typography>
  )
}

export default ClubsList
