import { Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import * as React from "react";
import styled from "styled-components";
import BoxInternal from "../box/BoxInternal.styles";

type TypographyProps = TypographyPropsMui

interface ILabelsTypographyProps extends TypographyProps {
  string: string,
  value: string,
}

const StyledTypographyLabel = styled(TypographyMui)({
  width: 300,
})
const StyledTypographyValue = styled(TypographyMui)({
  fontWeight: 'bold'
})

const LabelsTypography: React.FC<ILabelsTypographyProps> = (props: ILabelsTypographyProps) => {
  return <BoxInternal>
    <StyledTypographyLabel {...props}>
      {props.string}
    </StyledTypographyLabel>
    <StyledTypographyValue {...props}>
      {props.value}
    </StyledTypographyValue>
  </BoxInternal>
}

export default LabelsTypography;