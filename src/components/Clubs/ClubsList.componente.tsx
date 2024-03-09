import React from 'react'
import { IClub } from '../../types/clubs.types'
import { Card, Typography } from '../../styles';

interface Props {
  index: number
  props: IClub;
}

const ClubsList = (props: Props) => {
  const { name, degree, type } = props.props;
  return (
    <Card>
      <Typography textAlign='right' sx={{ border: "1px solid #ccc", padding: "20px", width: "200px" }}>
        {props.index}
      </Typography>
      <Typography textAlign={'left'} sx={{ width: "300px", border: "1px solid #ccc", padding: "20px" }}>
        {name}
      </Typography>
      <Typography sx={{ width: "300px", padding: "20px" }}>{degree}</Typography>
      <Typography sx={{ width: "300px", padding: "20px" }}>{type.cat === "iron" || type.cat === "wedge" ? `${type.number} ${type.cat}` : type.cat}</Typography>
    </Card>
  )
}

export default ClubsList
