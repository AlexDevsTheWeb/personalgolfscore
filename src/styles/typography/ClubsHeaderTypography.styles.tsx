import * as React from "react";
import { Paper, Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import styled from "styled-components";

interface TypographyProps extends TypographyPropsMui {
  playerID: string,
  totalClubs: number,
}

const StyledTypography = styled(TypographyMui)({})

const ClubsHeaderTypography: React.FC<TypographyProps> = props => {
  return (
    <Paper variant='clubsHeader'>
      <StyledTypography {...props} variant='headline2'>
        {props.playerID}
      </StyledTypography>
      <StyledTypography {...props} variant='headline2'>
        {`${props.totalClubs} clubs`}
      </StyledTypography>
    </Paper>
  )
}

export default ClubsHeaderTypography;