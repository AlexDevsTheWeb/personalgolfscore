import { Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import * as React from "react";
import styled from "styled-components";

type TypographyProps = TypographyPropsMui

const StyledTypography = styled(TypographyMui)({
  backgroundColor: '#ff9900',
  fontSize: '0.875rem',
  fontWeight: 'bold'

})

const Typography: React.FC<TypographyProps> = props => {
  return <StyledTypography {...props}>
    {props.children}
  </StyledTypography>
}

export default Typography;