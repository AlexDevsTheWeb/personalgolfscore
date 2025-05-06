import { Typography as TypographyMui, TypographyProps as TypographyPropsMui, styled } from "@mui/material";
import * as React from "react";

type TypographyProps = TypographyPropsMui

const StyledTypography = styled(TypographyMui)({
  fontSize: '0.875rem',
  fontWeight: 'bold'

})

const Typography: React.FC<TypographyProps> = props => {
  return <StyledTypography {...props}>
    {props.children}
  </StyledTypography>
}

export default Typography;