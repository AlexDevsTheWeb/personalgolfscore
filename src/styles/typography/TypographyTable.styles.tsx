import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import * as React from "react";
import styled from "styled-components";

interface TypographyProps extends TypographyPropsMui {
  firstrow: string,
  secondrow: string,
}

const TypographyHeaderFirstRow = styled(TypographyMui)<TypographyProps>((props) => ({
  textAlign: 'center',
  padding: props.secondrow !== '' ? '0px' : '9.5px',
  fontWeight: 'bold'
}
));
const TypographyHeaderSecondRow = styled(TypographyMui)<TypographyProps>((props) => ({
  fontSize: useDeviceDetection().isMobile ? '10px' : '12px'
}
));



export const TypographyTablesFirstRow: React.FC<TypographyProps> = props => {
  return (
    <TypographyHeaderFirstRow {...props}>
      {props.firstrow}
    </TypographyHeaderFirstRow>

  )
}

export const TypographyTablesSecondRow: React.FC<TypographyProps> = props => {
  return (
    <TypographyHeaderSecondRow {...props}>
      {props.secondrow}
    </TypographyHeaderSecondRow>
  )
}

