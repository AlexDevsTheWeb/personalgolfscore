import { Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import * as React from "react";
import styled from "styled-components";
import BoxNewHole from "../box/BoxNewHole.styles";

type TypographyProps = TypographyPropsMui

interface ILabelsTypographyProps extends TypographyProps {
  string: string,
  value: string,
}

const StyledTypographyLabel = styled(TypographyMui)({})
const StyledTypographyValue = styled(TypographyMui)({
  fontWeight: 'bold'
})

const LabelsTypography: React.FC<ILabelsTypographyProps> = (props: ILabelsTypographyProps) => {
  return <BoxNewHole sx={{ width: 250, padding: '0px !important' }}>
    <StyledTypographyLabel {...props}>
      {props.string}
    </StyledTypographyLabel>
    <StyledTypographyValue>
      {props.value}
    </StyledTypographyValue>
  </BoxNewHole>
}

export default LabelsTypography;