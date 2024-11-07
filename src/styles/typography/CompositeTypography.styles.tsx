import { Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BoxInternalColumn from "../box/BoxInternalColumn.styles";

type TypographyProps = TypographyPropsMui

interface ILabelsTypographyProps extends TypographyProps {
  string: string,
  value: string | number,
  center?: string | undefined
}

const StyledTypographyLabel = styled(TypographyMui)<ILabelsTypographyProps>((props) => ({
  color: props.center === 'green' ? 'white !important' : 'inherit',
  fontWeight: props.center === 'green' ? 'bold !important' : 'auto',
  padding: props.center === 'green' ? '5px' : '0px'
}));

const StyledTypographyValue = styled(TypographyMui)({
  fontWeight: 'bold',
})

const CompositeTypography: React.FC<ILabelsTypographyProps> = (props: ILabelsTypographyProps) => {
  return <BoxInternalColumn center={props.center}>
    <StyledTypographyLabel {...props}>
      {`${props.string !== '' ? `${props.string}:` : ''}`}
    </StyledTypographyLabel>
    <StyledTypographyValue {...props}>
      {props.value}
    </StyledTypographyValue>
  </BoxInternalColumn>
}

export default CompositeTypography;