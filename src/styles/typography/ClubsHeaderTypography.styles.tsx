import * as React from "react";
import { Paper, Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface TypographyProps extends TypographyPropsMui { }

const StyledTypography = styled(TypographyMui)({})

const ClubsHeaderTypography: React.FC<TypographyProps> = props => {
  const { clubs: { playerID }, totalClubs, selectedClubs } = useSelector((store: RootState) => store.golfBag);

  return (
    <Paper variant='clubsHeader'>
      <StyledTypography {...props} variant='headline2'>
        {playerID}
      </StyledTypography>
      <StyledTypography {...props} variant='subheadline1'>
        {`${selectedClubs} clubs selected / ${totalClubs} total clubs`}
      </StyledTypography>
    </Paper>
  )
}

export default ClubsHeaderTypography;